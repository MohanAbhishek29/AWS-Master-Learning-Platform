import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';

const HighlightText = ({ text, highlight }) => {
    if (!highlight || !text) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={i} style={{
                        background: 'linear-gradient(120deg, rgba(0, 163, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 100%)',
                        color: '#FFF',
                        borderRadius: '4px',
                        padding: '0 4px',
                        fontWeight: 700
                    }}>{part}</span>
                ) : part
            )}
        </>
    );
};

export const ServiceCard = ({ service, onClick, searchTerm }) => {
    const Icon = service.icon;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -12 }}
            onMouseMove={handleMouseMove}
            onClick={() => onClick(service)}
            style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '--brand-color': service.color || 'var(--neon-blue)'
            }}
            className="service-card-premium group"
        >
            <div style={{
                position: 'relative',
                background: 'var(--bg-card)',
                backdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)',
                borderRadius: '32px',
                padding: '32px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
                {/* Dynamic Mouse Glow Layer */}
                <div
                    className="neural-glow"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.color}15, transparent 80%)`,
                        opacity: 0,
                        transition: 'opacity 0.5s',
                        pointerEvents: 'none',
                        zIndex: 0
                    }}
                />

                {/* Brand Static Glow */}
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '-30px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: service.color || '#FF9900',
                    filter: 'blur(50px)',
                    opacity: 0.1,
                    pointerEvents: 'none',
                    zIndex: 0
                }} />

                {/* Header: Icon & Category */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--glass-highlight)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--glass-border)',
                        boxShadow: `0 8px 30px -4px ${service.color}30`
                    }}>
                        {Icon && <Icon size={34} color={service.color} />}
                    </div>
                    <div style={{
                        padding: '6px 14px',
                        background: 'var(--glass-highlight)',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)',
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        color: 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px'
                    }}>
                        {service.category}
                    </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                        <HighlightText text={service.name} highlight={searchTerm} />
                    </h3>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem',
                        color: service.color,
                        fontWeight: 800,
                        marginBottom: '12px'
                    }}>
                        <Sparkles size={14} />
                        <HighlightText text={service.tagline} highlight={searchTerm} />
                    </div>
                    <p style={{
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        <HighlightText text={service.description} highlight={searchTerm} />
                    </p>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--glass-border)',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {service.useCases?.slice(0, 2).map((useCase, i) => (
                            <span key={i} style={{
                                fontSize: '0.65rem',
                                background: 'var(--glass-highlight)',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                color: 'var(--text-dim)',
                                border: '1px solid var(--glass-border)'
                            }}>
                                {useCase}
                            </span>
                        ))}
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'var(--glass-highlight)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--glass-border)',
                        transition: 'all 0.3s'
                    }} className="card-arrow">
                        <ArrowUpRight size={20} className="arrow-icon" />
                    </div>
                </div>
            </div>

            <style>{`
                .service-card-premium:hover .neural-glow {
                    opacity: 1 !important;
                }
                .service-card-premium:hover .card-arrow {
                    background: var(--brand-color);
                    color: black;
                    transform: rotate(45deg);
                    box-shadow: 0 0 20px var(--brand-color);
                }
                .arrow-icon {
                    color: var(--text-secondary);
                }
                .service-card-premium:hover .arrow-icon {
                    color: black !important;
                    stroke: black;
                }
            `}</style>
        </motion.div>
    );
};
