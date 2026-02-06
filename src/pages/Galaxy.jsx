import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ForceGraph3D from 'react-force-graph-3d';
import { galaxyData } from '../data/galaxy-data';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import * as THREE from 'three';

export const Galaxy = () => {
    const { isDarkMode } = useTheme();
    const fgRef = useRef();
    const [hoverNode, setHoverNode] = useState(null);
    const [isRotating, setIsRotating] = useState(true);

    // 1. Physics Configuration (Run Once)
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (fgRef.current) {
                // Physics: Balanced for Larger Nodes
                fgRef.current.d3Force('charge').strength(-800);
                fgRef.current.d3Force('link').distance(link => link.target.desc ? 50 : 100); // Distance 100 as requested

                // Ensure controls don't fight us
                const controls = fgRef.current.controls();
                if (controls) {
                    controls.autoRotate = false; // Disable native auto-rotate
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.1;
                }
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [galaxyData]);

    // 2. Manual Rotation Loop (Classic Drift)
    useEffect(() => {
        let frameId;
        const rotate = () => {
            if (isRotating && fgRef.current) {
                const camPos = fgRef.current.cameraPosition();
                if (camPos) {
                    const dist = Math.sqrt(camPos.x * camPos.x + camPos.z * camPos.z);
                    const angle = Math.atan2(camPos.x, camPos.z);
                    const newAngle = angle + 0.0015;
                    fgRef.current.cameraPosition({ x: dist * Math.sin(newAngle), z: dist * Math.cos(newAngle), y: camPos.y }, null, 0);
                }
            }
            frameId = requestAnimationFrame(rotate);
        };
        rotate();
        return () => cancelAnimationFrame(frameId);
    }, [isRotating]);

    const handleClick = (node) => {
        // Aim at node from outside it
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
            node,
            3000
        );
    };

    return (
        <div style={{
            height: '100vh',
            // Galaxy Background Image with overlay
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
            transition: 'background 0.5s ease'
        }}>

            <div style={{ position: 'absolute', top: 30, left: 30, zIndex: 10, pointerEvents: 'none' }}>
                <Link to="/" style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.8)', textDecoration: 'none', marginBottom: '15px', transition: 'color 0.2s', fontWeight: 600 }}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>
                <h1 className="text-gradient">Service Galaxy</h1>
                <p style={{ color: '#888', marginBottom: '15px' }}>Drag, Zoom, and Click to explore relationships.</p>

                <button
                    onClick={() => setIsRotating(!isRotating)}
                    style={{
                        pointerEvents: 'auto',
                        padding: '8px 16px',
                        background: isRotating ? 'var(--neon-blue)' : 'var(--glass-highlight)',
                        border: isRotating ? '1px solid var(--neon-blue)' : '1px solid var(--glass-border)',
                        color: isRotating ? 'white' : 'var(--text-secondary)',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    {isRotating ? '🔄 Auto-Rotation: ON' : '⏸️ Auto-Rotation: OFF'}
                </button>
            </div>

            <ForceGraph3D
                ref={fgRef}
                graphData={galaxyData}

                // VISUAL RESTORATION: Back to "Glowing Spheres" (Canvas Mode)
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const isHub = node.val > 20;
                    const isHovered = node === hoverNode;
                    const label = node.id;
                    const fontSize = isHub ? 16 / globalScale : 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;

                    // Draw Star Glow
                    const radius = Math.sqrt(node.val) * (isHovered ? 1.5 : 1);
                    const drawRadius = radius * 1.5; // Glow Radius

                    // Create Radial Gradient (Core -> Glow -> Transparent)
                    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, drawRadius);
                    gradient.addColorStop(0, node.color);
                    gradient.addColorStop(0.4, node.color); // Core
                    gradient.addColorStop(1, 'rgba(0,0,0,0)'); // Fade

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, drawRadius, 0, 2 * Math.PI, false);
                    ctx.fill();

                    // Permanent Labels for Hubs or Hovered
                    if (isHub || isHovered) {
                        const textWidth = ctx.measureText(label).width;
                        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                        // Label Background
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2 - drawRadius - 2, bckgDimensions[0], bckgDimensions[1]);

                        // Text
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = isHovered ? '#fff' : 'rgba(255, 255, 255, 0.9)';
                        ctx.fillText(label, node.x, node.y - drawRadius - 2 - fontSize / 2);
                    }
                }}
                nodeCanvasObjectMode={() => 'replace'} // Clear default sphere

                // Custom "Sprite" Labels (Floating Text) for Hubs
                nodeLabel="id" // Simple tooltip fallback

                // Link style - "Laser Beams"
                linkColor={link => link.source.color || '#ffffff'}
                linkWidth={0.6}
                linkOpacity={0.4} // Brighter links
                linkDirectionalParticles={4}
                linkDirectionalParticleSpeed={0.005} // Slow & Steady data flow
                linkDirectionalParticleWidth={5}
                linkDirectionalParticleColor={() => '#00ff99'} // Neon Green Packets

                // Aesthetics
                showNavInfo={false}
                backgroundColor="rgba(0,0,0,0)"

                // Interaction
                onNodeHover={(node) => {
                    if (node && node !== hoverNode) {
                        try { import('../utils/SoundManager').then(m => m.SoundManager.playHover()); } catch (e) { }
                    }
                    setHoverNode(node);
                }}
                onNodeClick={(node) => {
                    try { import('../utils/SoundManager').then(m => m.SoundManager.playSelect()); } catch (e) { }
                    handleClick(node);
                }}
                enableNodeDrag={true}
            />

            {hoverNode && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: 'absolute',
                        bottom: 50, left: '50%', transform: 'translateX(-50%)',
                        background: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)', padding: '20px 40px',
                        border: `1px solid ${hoverNode.color}`,
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        textAlign: 'center',
                        zIndex: 100,
                        boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.1)'
                    }}
                >
                    <h2 style={{ margin: 0, color: hoverNode.color }}>{hoverNode.id}</h2>
                    {hoverNode.desc && <p style={{ margin: '5px 0 0 0', color: isDarkMode ? '#ccc' : '#444' }}>{hoverNode.desc}</p>}
                </motion.div>
            )}

            <style>{`
                canvas { outline: none; }
            `}</style>
        </div>
    );
};
