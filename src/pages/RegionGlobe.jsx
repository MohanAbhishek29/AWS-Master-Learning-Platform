import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Globe from 'react-globe.gl';
import { regionData, fiberLinks } from '../data/region-data';
import { motion } from 'framer-motion';
import { replace } from 'react-router-dom';
import { SoundManager } from '../utils/SoundManager';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RegionGlobe = () => {
    const { isDarkMode } = useTheme();
    const globeEl = useRef();
    const [hoverNode, setHoverNode] = useState(null);
    const [isRotating, setIsRotating] = useState(true);

    // Smart Rotation Drift (Manual Frame Loop)
    useEffect(() => {
        let frameId;
        const rotate = () => {
            if (isRotating && globeEl.current) {
                // Get current camera position
                const currentPos = globeEl.current.pointOfView();

                // Calculate subtle drift
                // Convert simple Lat/Lng to move "Right" (East)
                // New Lng = Old Lng - Speed
                const newLng = currentPos.lng - 0.2;

                globeEl.current.pointOfView({
                    lat: currentPos.lat,
                    lng: newLng,
                    altitude: currentPos.altitude
                });
            }
            frameId = requestAnimationFrame(rotate);
        };

        rotate();
        return () => cancelAnimationFrame(frameId);
    }, [isRotating]);

    // Space Ambience Logic
    useEffect(() => {
        // Start Soundscapes
        try {
            SoundManager.playSpaceAmbience(); // Deep Vacuum
        } catch (e) { console.warn("Audio Context blocked:", e); }

        // Cleanup
        return () => {
            SoundManager.stopSpaceAmbience();
        };
    }, []);

    // Progressive Link Loading
    const [visibleLinks, setVisibleLinks] = useState([]);

    useEffect(() => {
        // Generate all possible links first
        const allLinks = [];
        regionData.forEach((src) => {
            const targetCount = 2 + Math.floor(Math.random() * 2); // Slightly fewer connections (2-3)
            const targets = regionData
                .filter(r => r.id !== src.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, targetCount);

            targets.forEach(dst => {
                allLinks.push({
                    startLat: src.lat, startLng: src.lng,
                    endLat: dst.lat, endLng: dst.lng,
                    color: 'rgba(0, 255, 153, 0.5)'
                });
            });
        });

        // Add them in batches (waves)
        let currentBatch = 0;
        const batchSize = Math.ceil(allLinks.length / 5); // 5 waves

        const interval = setInterval(() => {
            currentBatch++;
            const nextLinks = allLinks.slice(0, currentBatch * batchSize);
            setVisibleLinks(nextLinks);

            // (Burst sound removed in favor of continuous stream)

            if (currentBatch >= 5) clearInterval(interval);
        }, 1000); // New wave every 1 second

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            height: '100vh',
            background: isDarkMode
                ? 'radial-gradient(circle at center, #0a0a1f 0%, #000000 100%)' // Deep Space
                : 'radial-gradient(circle at center, #f1f5f9 0%, #cbd5e1 100%)', // Premium Light (Slate)
            overflow: 'hidden',
            transition: 'background 0.5s ease'
        }}>

            <div style={{ position: 'absolute', top: 40, left: 40, zIndex: 10, pointerEvents: 'none' }}>
                <Link to="/" style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: isDarkMode ? 'white' : 'rgba(0,0,0,0.8)', textDecoration: 'none', marginBottom: '20px', fontWeight: 600 }}>
                    <ArrowLeft size={20} /> Back Home
                </Link>
                <h1 className="text-gradient" style={{ fontSize: '3rem' }}>AWS Global Infrastructure</h1>
                <p style={{ color: isDarkMode ? '#aaa' : '#555', fontSize: '1.2rem', marginBottom: '20px' }}>Real-time visualization of Region Availability.</p>

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
                    {isRotating ? '🌍 Auto-Spin: ON' : '⏸️ Auto-Spin: OFF'}
                </button>
            </div>

            <Globe
                ref={globeEl}
                globeImageUrl={isDarkMode
                    ? "//unpkg.com/three-globe/example/img/earth-dark.jpg"
                    : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"}
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl={isDarkMode ? "//unpkg.com/three-globe/example/img/night-sky.png" : null}
                backgroundColor="rgba(0,0,0,0)" // Transparent to see div gradient in light mode

                // Atmosphere Glow
                atmosphereColor={isDarkMode ? "#3a228a" : "#2196f3"} // Purple/Blue cosmic glow vs Light Blue
                atmosphereAltitude={0.25} // Visible aura

                // Points (Regions)
                pointsData={regionData}
                pointLat="lat"
                pointLng="lng"
                pointColor={(d) => hoverNode === d ? '#00FF99' : d.color}
                pointAltitude={(d) => hoverNode === d ? 0.4 : 0.15} // Popping out more
                pointRadius={(d) => hoverNode === d ? 1.2 : 0.6} // Larger points
                pointsMerge={false}
                pointLabel="name"

                // Rings (Pulse effect) - Cyberpunk Cyan
                ringsData={regionData}
                ringColor={() => t => `rgba(0, 255, 153, ${1 - t})`} // Neon Green/Cyan pulse
                ringMaxRadius={6}
                ringPropagationSpeed={5} // Faster pulse
                ringRepeatPeriod={600} // More frequent

                // Arcs (Cables) - Hyper data speeds
                arcsData={visibleLinks}
                arcColor="color" // Using the green defined in links
                arcDashLength={0.5} // Longer trails
                arcDashGap={2} // Closer together
                arcDashAnimateTime={400} // Faster animation (was 1000)
                arcAltitude={0.25} // Higher arc

                // Interaction
                onPointHover={(node) => {
                    if (node && node !== hoverNode) {
                        try { SoundManager.playHover(); } catch (e) { }
                    }
                    setHoverNode(node);
                }}
                onPointClick={(point) => {
                    try { SoundManager.playSelect(); } catch (e) { }
                    globeEl.current.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1 }, 2000);
                }}
            />

            {hoverNode && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: 'absolute', bottom: 40, right: 40,
                        background: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)', padding: '20px',
                        border: `2px solid ${hoverNode.color}`, borderRadius: '12px',
                        backdropFilter: 'blur(10px)', width: '300px',
                        boxShadow: isDarkMode ? 'none' : '0 10px 40px rgba(0,0,0,0.1)'
                    }}
                >
                    <h2 style={{ color: hoverNode.color, margin: 0 }}>{hoverNode.name}</h2>
                    <p style={{ color: isDarkMode ? '#fff' : '#222', fontSize: '1.2rem', fontFamily: 'monospace' }}>{hoverNode.id}</p>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                        <span className="badge" style={{ background: '#00FF9922', color: '#00FF99' }}>Operational</span>
                        <span className="badge" style={{ background: '#ffffff22' }}>3 AZs</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
