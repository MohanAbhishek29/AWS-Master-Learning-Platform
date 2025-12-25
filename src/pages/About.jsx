import React from 'react';
import { Cloud } from 'lucide-react';

export const About = () => {
    return (
        <div className="page-about" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div className="glass-panel" style={{ padding: '60px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

                    {/* Background glow */}
                    <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'var(--neon-blue)', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%' }} />

                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #FF9900, #FFC300)', marginBottom: '30px', boxShadow: '0 10px 30px rgba(255,153,0,0.3)' }}>
                            <Cloud size={40} color="white" />
                        </div>

                        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '30px' }}>About the Mission</h1>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '50px' }}>
                            The <strong style={{ color: 'var(--text-primary)' }}>AWS Masterclass</strong> was built to solve a simple problem: Cloud documentation is boring.
                            We believe learning complex infrastructure should feel like exploring a video game.
                        </p>

                        <div style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)' }}>Created by</h3>
                            <h2 className="text-neon" style={{ fontSize: '3rem', fontWeight: '800', margin: '10px 0' }}>Mohan Abhishek</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--neon-blue)' }}>Lead Space Architect</p>
                        </div>

                        <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            "To all the users exploring this universe: Thank you. Keep aiming for the clouds." 🚀
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
