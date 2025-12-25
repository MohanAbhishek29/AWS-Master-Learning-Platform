import React from 'react';

export const Footer = () => (
    <footer style={{
        borderTop: '1px solid var(--glass-border)',
        padding: '40px 20px',
        marginTop: '60px',
        background: 'var(--glass-panel)',
        backdropFilter: 'blur(10px)'
    }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>AWS Masterclass</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Built for the future of cloud learning.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Designed by <span style={{ color: 'var(--neon-cyan)' }}>Mohan Abhishek</span></p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '5px' }}>© 2024 All Rights Reserved</p>
            </div>
        </div>
    </footer>
);
