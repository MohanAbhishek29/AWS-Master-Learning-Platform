import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { paths } from '../data/learning-paths';
import { ChevronRight, CheckCircle, Circle, ArrowLeft } from 'lucide-react';

export const LearningPaths = () => {
    const [selectedPath, setSelectedPath] = useState(null);

    return (
        <div className="page-paths" style={{
            paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh',
            background: 'radial-gradient(circle at 50% 0%, rgba(0, 163, 255, 0.05) 0%, transparent 50%)',
            position: 'relative', overflow: 'hidden'
        }}>
            {/* Background Grid */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px', pointerEvents: 'none', opacity: 0.3
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <AnimatePresence mode="wait">
                    {!selectedPath ? (
                        <motion.div
                            key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    style={{ color: 'var(--neon-blue)', fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px' }}
                                >
                                    Curriculum roadmaps
                                </motion.span>
                                <h1 className="text-gradient" style={{ fontSize: '4rem', fontWeight: 950, marginBottom: '20px', lineHeight: 1 }}>Choose Your Career Path</h1>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                                    Structured, step-by-step blueprints designed by cloud architects to take you from Zero to AWS Professional.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                                {paths.map((path, idx) => (
                                    <PathCard key={path.id} path={path} index={idx} onClick={() => setSelectedPath(path)} />
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="details" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                        >
                            <button
                                onClick={() => setSelectedPath(null)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px',
                                    padding: '12px 24px', borderRadius: '16px', background: 'var(--bg-card)',
                                    color: 'var(--text-primary)', border: '1px solid var(--glass-border)', cursor: 'pointer',
                                    fontWeight: 700, fontSize: '0.9rem'
                                }}
                            >
                                <ArrowLeft size={18} /> Back to Catalog
                            </button>

                            <div className="glass-panel" style={{ padding: '60px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ marginBottom: '60px', position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute', top: '-10px', left: '-10px', width: '60px', height: '60px',
                                        background: selectedPath.color, filter: 'blur(40px)', opacity: 0.3
                                    }} />
                                    <span style={{
                                        display: 'inline-block', padding: '8px 16px', borderRadius: '12px',
                                        background: `${selectedPath.color}20`, color: selectedPath.color,
                                        fontSize: '0.75rem', fontWeight: 900, marginBottom: '20px',
                                        textTransform: 'uppercase', letterSpacing: '2px'
                                    }}>
                                        {selectedPath.role}
                                    </span>
                                    <h1 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '15px' }}>{selectedPath.title}</h1>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', lineHeight: 1.6 }}>{selectedPath.description}</p>
                                </div>

                                <div style={{ position: 'relative', paddingLeft: '40px' }}>
                                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: '9px', width: '2px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }} />

                                    {selectedPath.steps.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            style={{ display: 'flex', gap: '40px', marginBottom: '50px', position: 'relative' }}
                                        >
                                            <div style={{
                                                width: '20px', height: '20px', borderRadius: '50%',
                                                background: selectedPath.color, boxShadow: `0 0 20px ${selectedPath.color}`,
                                                zIndex: 2, marginTop: '15px'
                                            }} />

                                            <div className="hover-lift" style={{
                                                flex: 1, padding: '30px', borderRadius: '24px',
                                                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                                                display: 'flex', gap: '25px', alignItems: 'flex-start'
                                            }}>
                                                <div style={{
                                                    width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                                }}>
                                                    {step.icon && <step.icon size={30} color={selectedPath.color} />}
                                                </div>
                                                <div>
                                                    <div style={{ color: selectedPath.color, fontSize: '0.7rem', fontWeight: 900, marginBottom: '5px', textTransform: 'uppercase' }}>STEP 0{index + 1}</div>
                                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{step.title}</h3>
                                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>{step.desc}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const PathCard = ({ path, onClick, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -10 }}
        onClick={onClick}
        className="glass-panel"
        style={{
            padding: '45px', borderRadius: '32px', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '25px',
            position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)'
        }}
    >
        <div style={{
            width: '100%', height: '5px', background: path.color,
            position: 'absolute', top: 0, left: 0, opacity: 0.8,
            boxShadow: `0 0 20px ${path.color}`
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{path.duration}</span>
            <span style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: path.color, fontWeight: 800 }}>{path.role}</span>
        </div>

        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>{path.title}</h3>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, fontSize: '0.95rem' }}>{path.description}</p>

        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: '10px', color: path.color, fontWeight: 900,
            fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px'
        }}>
            Explore Journey <ChevronRight size={20} />
        </div>
    </motion.div>
);
