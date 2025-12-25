import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertTriangle, BookOpen, Key, DollarSign, Users, Cloud, Activity } from 'lucide-react';

export const ServiceModal = ({ service, onClose }) => {

    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!service) return null;

    const Icon = service.icon;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(3, 3, 5, 0.85)',
                    backdropFilter: 'blur(8px)'
                }}
            />

            {/* Modal Content */}
            <motion.div
                layoutId={`card-${service.id}`}
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    maxHeight: '90vh',
                    background: '#0a0a0f',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 25px 100px -20px rgba(0,0,0,0.8)'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '40px',
                    background: `linear-gradient(to right, ${service.color}22, transparent)`,
                    position: 'relative',
                    borderBottom: '1px solid var(--glass-border)'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '24px',
                            right: '24px',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={20} />
                    </button>

                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '16px',
                            borderRadius: '16px',
                            border: `1px solid ${service.color}44`
                        }}>
                            <Icon size={48} color={service.color} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{
                                    color: service.color,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem',
                                    letterSpacing: '1px'
                                }}>
                                    {service.category}
                                </span>
                                <span style={{ color: 'var(--text-secondary)' }}>•</span>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>AWS Service</span>
                            </div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', lineHeight: 1 }}>{service.name}</h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{service.tagline}</p>
                        </div>
                    </div>
                </div>

                {/* Scrollable Body */}
                <div style={{
                    padding: '40px',
                    overflowY: 'auto',
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '40px'
                }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <section>
                            <h3 className="section-title"><Key size={20} color="var(--neon-yellow)" /> The Simple Analogy</h3>
                            <div style={{
                                background: 'rgba(255, 214, 0, 0.05)',
                                borderLeft: '4px solid var(--neon-yellow)',
                                padding: '24px',
                                borderRadius: '0 12px 12px 0',
                                fontSize: '1.1rem',
                                lineHeight: 1.6
                            }}>
                                {service.analogy}
                            </div>
                        </section>

                        <section>
                            <h3 className="section-title"><BookOpen size={20} color="var(--neon-cyan)" /> In-Depth Explanation</h3>
                            <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
                                {service.detailedDescription || service.description}
                            </p>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {/* Visual Architecture Mini-Map */}
                        <div className="sidebar-box" style={{ borderColor: service.color + '44', background: `linear-gradient(180deg, ${service.color}11, transparent)` }}>
                            <h4 className="sidebar-title" style={{ color: service.color }}><Activity size={18} /> Visual Architecture</h4>
                            <div style={{
                                height: '120px',
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '8px',
                                position: 'relative',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                {/* Simple Animated Flow */}
                                <div style={{ position: 'absolute', left: '10px', opacity: 0.5 }}><Users size={20} color="white" /></div>
                                <motion.div
                                    animate={{ x: [0, 100], opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    style={{ height: '2px', width: '20px', background: service.color, position: 'absolute', left: '40px' }}
                                />
                                <div style={{
                                    padding: '10px',
                                    border: `2px solid ${service.color}`,
                                    borderRadius: '8px',
                                    background: 'rgba(0,0,0,0.5)',
                                    zIndex: 2
                                }}>
                                    <Icon size={32} color={service.color} />
                                </div>
                                <motion.div
                                    animate={{ x: [0, 100], opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1, ease: 'linear' }}
                                    style={{ height: '2px', width: '20px', background: service.color, position: 'absolute', right: '40px', transform: 'scaleX(-1)' }}
                                />
                                <div style={{ position: 'absolute', right: '10px', opacity: 0.5 }}><Cloud size={20} color="white" /></div>
                            </div>
                            <p style={{ fontSize: '0.8rem', marginTop: '10px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                How {service.name} fits in the flow.
                            </p>
                        </div>

                        <div className="sidebar-box">
                            <h4 className="sidebar-title"><CheckCircle2 size={18} color="var(--neon-green)" /> Use Cases</h4>
                            <ul className="feature-list">
                                {service.useCases.map(uc => (
                                    <li key={uc}>{uc}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="sidebar-box">
                            <h4 className="sidebar-title"><DollarSign size={18} color="white" /> Pricing Model</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                {service.pricing}
                            </p>
                        </div>
                    </div>

                </div>
            </motion.div>

            <style>{`
        .section-title {
          font-size: 1.2rem;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
        }
        .sidebar-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          padding: 24px;
          borderRadius: 16px;
        }
        .sidebar-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 1rem;
        }
        .feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .feature-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .feature-list li::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--neon-cyan);
        }
      `}</style>
        </div>
    );
};
