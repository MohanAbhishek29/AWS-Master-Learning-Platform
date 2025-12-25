import React from 'react';
import { ServiceCard } from './ServiceCard';
import { categories } from '../data/aws-services';
import { AnimatePresence, motion } from 'framer-motion';

export const ServiceGrid = ({ services, activeCategory, setActiveCategory, onSelectService, searchTerm }) => {

    // Filter Logic
    const safeServices = Array.isArray(services) ? services : [];
    const filteredServices = safeServices.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="container" style={{ paddingBottom: '100px' }}>

            {/* Category Filter Pills */}
            <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingTop: '20px', // Added to prevent hover clipping
                paddingBottom: '24px',
                marginBottom: '40px',
                justifyContent: 'center'
            }}>
                {categories.map(cat => (
                    <motion.button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        whileHover={{
                            backgroundColor: activeCategory === cat.id ? 'var(--neon-blue)' : 'var(--bg-card-hover)',
                            scale: 1.05,
                            y: -5
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '24px',
                            background: activeCategory === cat.id ? 'var(--neon-blue)' : 'var(--glass-highlight)',
                            border: '1px solid',
                            borderColor: activeCategory === cat.id ? 'var(--neon-blue)' : 'var(--glass-border)',
                            color: activeCategory === cat.id ? 'white' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            fontWeight: 500,
                            boxShadow: 'none'
                        }}
                    >
                        {cat.name}
                    </motion.button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '24px'
                }}
            >
                <AnimatePresence>
                    {filteredServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onClick={onSelectService}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredServices.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                    <h3>No services found matching your criteria.</h3>
                </div>
            )}
        </section>
    );
};
