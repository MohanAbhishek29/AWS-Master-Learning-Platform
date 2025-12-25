import React from 'react';
import { Hero } from '../components/Hero';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useMotionValue, useSpring } from 'framer-motion';

export const Home = () => {
    // Zero-Lag Motion Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Snappier Spring Settings (Higher stiffness = faster follow)
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const snapX = useSpring(mouseX, springConfig);
    const snapY = useSpring(mouseY, springConfig);

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 400);
            mouseY.set(e.clientY - 400);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="page-home" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Optimized High-Performance Spotlight */}
            <motion.div
                style={{
                    x: snapX,
                    y: snapY,
                    position: 'fixed',
                    width: '800px',
                    height: '800px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(41, 98, 255, 0.08) 0%, rgba(112, 0, 255, 0.03) 30%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    filter: 'blur(40px)',
                    top: 0,
                    left: 0
                }}
            />

            <Hero />

            {/* Carousel Section */}
            <section id="popular-services" className="container" style={{ padding: '40px 0', overflow: 'visible', position: 'relative', zIndex: 2 }}>
                <div style={{ padding: '0 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                    <div>
                        <h2 className="text-gradient" style={{ fontSize: '2rem' }}>Popular Services</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Most explored topics this week.</p>
                    </div>
                    <Link to="/services" style={{ color: 'var(--neon-blue)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Draggable Carousel */}
                <motion.div
                    className="carousel-container"
                    style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'auto',
                        padding: '20px 20px 40px 20px',
                        cursor: 'grab',
                        scrollbarWidth: 'none', /* Firefox */
                        msOverflowStyle: 'none'  /* IE */
                    }}
                >
                    {/* Featured Services (Top 5) */}
                    {featuredServices.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </motion.div>
            </section>

            {/* Feature Highlights Section */}
            <section className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="glass-panel"
                    style={{ padding: '40px', textAlign: 'center', marginBottom: '40px' }}
                >
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Why Learn AWS Here?</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}>
                        Forget boring documentation. We turn complex cloud concepts into interactive, visual experiences.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                        <FeatureCard icon={Zap} title="Zero Lag Learning" desc="Optimized 60FPS animations for a buttery smooth experience." color="#FF9900" />
                        <FeatureCard icon={Globe} title="Real-World Analogies" desc="We explain complex tech using simple, everyday examples." color="#00A1C9" />
                        <FeatureCard icon={Shield} title="Visual Deep Dives" desc="See how services connect with interactive diagrams." color="#8C4FFF" />
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

// Import services data
import { services } from '../data/aws-services';
// Filter top services for carousel
const featuredServices = services.slice(0, 6);

const ServiceCard = ({ service, index }) => {
    const Icon = service.icon;
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass-panel"
            style={{
                minWidth: '280px',
                padding: '24px',
                borderRadius: '20px',
                position: 'relative',
                borderTop: `4px solid ${service.color}`,
                flexShrink: 0
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    <Icon size={28} color={service.color} />
                </div>
                <span style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '5px' }}>{service.category}</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{service.name}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                {service.tagline}
            </p>

            <Link to="/services" style={{
                width: '100%', padding: '10px', borderRadius: '8px',
                background: 'var(--bg-card)', color: 'var(--text-primary)',
                textAlign: 'center', textDecoration: 'none', display: 'block',
                fontSize: '0.9rem', fontWeight: 600
            }}>
                Start {service.name}
            </Link>
        </motion.div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
    <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: '50px', height: '50px', background: `${color}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: color }}>
            <Icon size={24} />
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{desc}</p>
    </div>
);
