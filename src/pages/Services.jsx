import React from 'react';
import { ServiceGrid } from '../components/ServiceGrid';
import { services } from '../data/aws-services';
import { motion } from 'framer-motion';

export const Services = ({ activeCategory, setActiveCategory, searchTerm, onSelectService }) => {
    console.log('Services Page Loaded. Data:', services);

    // Safety check ensuring services is an array
    const safeServices = Array.isArray(services) ? services : [];

    return (
        <div className="page-services" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: '40px', textAlign: 'center' }}
                >
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '16px' }}>AWS Service Catalog</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Explore the entire Amazon Web Services ecosystem visually.</p>
                </motion.div>

                <ServiceGrid
                    services={safeServices}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    searchTerm={searchTerm}
                    onSelectService={onSelectService}
                />
            </div>
        </div>
    );
};
