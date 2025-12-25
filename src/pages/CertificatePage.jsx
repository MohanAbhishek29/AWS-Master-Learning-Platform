import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CertificatePage = () => {
    const canvasRef = useRef(null);
    const [name, setName] = useState('Mohan Abhishek'); // Default
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        drawCertificate();
    }, [name]);

    const drawCertificate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Dimensions
        const width = 1200;
        const height = 800;
        canvas.width = width;
        canvas.height = height;

        // Background
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#1a1a2e');
        grad.addColorStop(1, '#16213e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Border
        ctx.strokeStyle = '#FF9900';
        ctx.lineWidth = 20;
        ctx.strokeRect(40, 40, width - 80, height - 80);

        ctx.strokeStyle = '#00A1C9'; // Inner line
        ctx.lineWidth = 5;
        ctx.strokeRect(60, 60, width - 120, height - 120);

        // Text Styles
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';

        // Header
        ctx.font = 'bold 60px Arial';
        ctx.fillText('CERTIFICATE OF MASTERY', width / 2, 180);

        // Subheader
        ctx.font = '30px Arial';
        ctx.fillStyle = '#cccccc';
        ctx.fillText('is hereby awarded to', width / 2, 280);

        // Name (Dynamic)
        ctx.font = 'bold italic 80px "Times New Roman"';
        ctx.fillStyle = '#FF9900';
        ctx.shadowColor = 'rgba(255, 153, 0, 0.5)';
        ctx.shadowBlur = 20;
        ctx.fillText(name, width / 2, 420);
        ctx.shadowBlur = 0; // Reset

        // Achievement
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('For successfully completing the AWS Masterclass Arena', width / 2, 530);
        ctx.fillText('and demonstrating exceptional architecture skills.', width / 2, 580);

        // Footer/Date
        const date = new Date().toLocaleDateString();
        ctx.font = '20px Arial';
        ctx.fillStyle = '#888';
        ctx.fillText(`Date: ${date}`, width / 2, 680);

        // "Signature"
        ctx.font = 'italic 25px Arial';
        ctx.fillText('AWS Masterclass Platform', width / 2, 720);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `AWS_Certificate_${name.replace(/ /g, '_')}.png`;
        link.href = canvas.toDataURL();
        link.click();
        setDownloading(true);
        setTimeout(() => setDownloading(false), 2000);
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '50px' }}>
            <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>

                <Link to="/arena" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '30px', textDecoration: 'none' }}>
                    <ArrowLeft size={18} /> Back to Arena
                </Link>

                <h1 className="text-gradient" style={{ marginBottom: '20px' }}>Your Official Certificate</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
                    Enter your name below to generate your proof of mastery.
                </p>

                <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '30px', display: 'inline-block' }}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name"
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)',
                            fontSize: '1.5rem',
                            padding: '10px 20px',
                            textAlign: 'center',
                            borderRadius: '8px',
                            width: '300px',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Canvas Container */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ marginBottom: '40px', overflow: 'hidden', borderRadius: '20px', boxShadow: '0 10px 50px rgba(0,0,0,0.5)' }}
                >
                    <canvas
                        ref={canvasRef}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </motion.div>

                <button
                    onClick={handleDownload}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', fontSize: '1.2rem' }}
                >
                    <Download size={24} />
                    {downloading ? 'Downloaded!' : 'Download Certificate (PNG)'}
                </button>

            </div>
        </div>
    );
};
