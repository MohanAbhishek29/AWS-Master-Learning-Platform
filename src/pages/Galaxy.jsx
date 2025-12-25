import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ForceGraph3D from 'react-force-graph-3d';
import { galaxyData } from '../data/galaxy-data';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Galaxy = () => {
    const { isDarkMode } = useTheme();
    const fgRef = useRef();
    const [hoverNode, setHoverNode] = useState(null);
    const [isRotating, setIsRotating] = useState(true);

    // Smart Manual Rotation (Drift)
    useEffect(() => {
        let frameId;
        const rotate = () => {
            if (isRotating && fgRef.current) {
                // Apply Physics
                fgRef.current.d3Force('charge').strength(-120);

                // Calculate Rotation
                const camPos = fgRef.current.cameraPosition();
                const dist = Math.sqrt(camPos.x * camPos.x + camPos.z * camPos.z);
                const angle = Math.atan2(camPos.x, camPos.z);
                const newAngle = angle + 0.002; // Tune speed here (0.002 is roughly "Normal")

                fgRef.current.cameraPosition(
                    {
                        x: dist * Math.sin(newAngle),
                        z: dist * Math.cos(newAngle),
                        y: camPos.y // Maintain height
                    },
                    null, // lookAt (null = center)
                    0     // duration (immediate)
                );
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
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );
    };

    return (
        <div style={{
            height: '100vh',
            background: isDarkMode
                ? 'radial-gradient(circle at center, #1a1a2e 0%, #050505 100%)' // Deep Space Gradient
                : 'radial-gradient(circle at center, #f8fafc 0%, #cbd5e1 100%)', // Premium Silver/Light Gradient
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
                nodeLabel="id"
                nodeColor="color"
                // Visuals
                nodeRelSize={8}
                nodeOpacity={1}
                nodeResolution={32}

                // Link style
                linkColor={link => link.source.color || '#ffffff'}
                linkWidth={1.5}
                linkOpacity={0.3}
                linkDirectionalParticles={6}
                linkDirectionalParticleSpeed={0.015} // Much faster flow
                linkDirectionalParticleWidth={4} // Chonky data packets

                // Aesthetics
                showNavInfo={false}
                backgroundColor="rgba(0,0,0,0)" // Transparent to show gradient
                onNodeHover={setHoverNode}
                onNodeClick={handleClick}
                enableNodeDrag={true} // Allow dragging for fun
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
