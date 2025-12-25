import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '220px' // Increased spacing to de-clutter
        }}>
            {/* Background Ambience */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: '400px',
                height: '400px',
                background: 'var(--neon-purple)',
                filter: 'blur(180px)',
                opacity: 0.15,
                borderRadius: '50%',
                zIndex: -1
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '15%',
                width: '500px',
                height: '500px',
                background: 'var(--neon-cyan)',
                filter: 'blur(200px)',
                opacity: 0.12,
                borderRadius: '50%',
                zIndex: -1
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ display: 'flex', gap: '24px', flexDirection: 'row', marginBottom: '48px' }}
            >
                <Link to="/services" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    Start Learning <ArrowRight size={20} />
                </Link>
                <Link to="/learning-paths" className="glass-panel" style={{
                    padding: '14px 28px',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textDecoration: 'none'
                }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-card-hover)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--bg-card)'}
                >
                    View Roadmap
                </Link>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                style={{
                    fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    marginBottom: '40px',
                    maxWidth: '1000px',
                    letterSpacing: '-2px'
                }}
            >
                Master AWS Services <br />
                <span className="text-neon" style={{ position: 'relative' }}>
                    Visually & Practically
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '650px',
                    marginBottom: '60px',
                    lineHeight: 1.8
                }}
            >
                Stop reading boring documentation. Explore the AWS ecosystem with
                our premium, interactive visual library. Understand the <i>why</i>, not just the <i>how</i>.
            </motion.p>

            {/* Floating Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                style={{ position: 'absolute', bottom: '60px', cursor: 'pointer', zIndex: 10 }}
                onClick={() => document.getElementById('popular-services')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <motion.div
                    animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={32} color="var(--text-secondary)" />
                </motion.div>
            </motion.div>

            {/* Grid overlay for texture */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 70%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%, black 70%, transparent)',
                zIndex: -2,
                pointerEvents: 'none'
            }} />
        </section>
    );
};
