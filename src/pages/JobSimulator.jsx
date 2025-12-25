import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allScenarios as scenarios } from '../data/scenarios';
import { Cpu, DollarSign, Shield, Layers, Database, Brain, ArrowRight, X, Terminal, Check, Smile } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

export const JobSimulator = () => {
    const [activeScenario, setActiveScenario] = useState(null);
    const [stepIndex, setStepIndex] = useState(0);
    const [history, setHistory] = useState([]); // Chat history
    const [status, setStatus] = useState('idle'); // idle, playing, success, fail

    const startScenario = (scenario) => {
        setActiveScenario(scenario);
        setStepIndex(0);
        setStatus('playing');
        setHistory([{ type: 'system', text: `Initializing ${scenario.role} Protocol...` }, { type: 'npc', text: scenario.steps[0].text }]);
    };

    // --- ADVANCED SYNTHESIZED SOUND EFFECTS ---
    // Removed playSuccessSound as SoundManager will handle it.

    const triggerCelebration = () => {
        const duration = 3500;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 35, spread: 360, ticks: 70, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 60 * (timeLeft / duration);

            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.05, 0.25), y: Math.random() - 0.1 }
            });
            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.75, 0.95), y: Math.random() - 0.1 }
            });

            // Blast from corners
            confetti({
                particleCount: 25,
                angle: 60,
                spread: 60,
                origin: { x: 0, y: 1 }
            });
            confetti({
                particleCount: 25,
                angle: 120,
                spread: 60,
                origin: { x: 1, y: 1 }
            });
        }, 200);
    };

    const handleOption = (option) => {
        const currentStep = activeScenario.steps[stepIndex];
        const nextStepIndex = currentStep.options.indexOf(option); // Assuming options are ordered and this is the index of the chosen option
        const resultText = option.response; // The response text from the option

        // Update history immediately with user's choice
        setHistory(prev => [...prev, { type: 'user', text: `> ${option.label}` }]);

        setTimeout(() => {
            if (option.outcome === 'success') {
                // Success!
                setStatus('success');
                SoundManager.playSuccess();
                triggerCelebration(); // Keep celebration for success
                setHistory(prev => [...prev,
                { type: 'success', text: 'MISSION ACCOMPLISHED. SYSTEM STABILIZED.' }
                ]);
            } else if (option.outcome === 'fail') {
                // Wrong choice - Fail
                setStatus('fail');
                SoundManager.playFailure();
                setHistory(prev => [...prev,
                { type: 'fail', text: `CRITICAL FAILURE: ${resultText}` }
                ]);
            } else {
                // Correct/Neutral choice - Continue to next step
                const nextStep = activeScenario.steps[stepIndex + 1];
                if (nextStep) {
                    setStepIndex(prevIndex => prevIndex + 1);
                    setHistory(prev => [...prev,
                    { type: 'system', text: resultText },
                    { type: 'npc', text: nextStep.text } // Assuming next step has a 'text' property for NPC
                    ]);
                } else {
                    // This case should ideally not be reached if success/fail are handled,
                    // but if a scenario ends without explicit success/fail, it could be a neutral end.
                    setStatus('success'); // Or a specific 'completed' status
                    SoundManager.playSuccess();
                    triggerCelebration();
                    setHistory(prev => [...prev,
                    { type: 'system', text: resultText },
                    { type: 'success', text: 'Scenario completed successfully!' }
                    ]);
                }
            }
        }, 600);
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>

                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '16px' }}>Cloud Job Simulator</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Step into the shoes of an AWS Engineer. Solve real crisis scenarios.</p>
                </div>

                {!activeScenario ? (
                    /* Scenario Selection Grid */
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        {scenarios.map((scene) => {
                            let IconComponent = Cpu;
                            let glowColor = '#FF9900';

                            if (scene.role === 'DevOps Engineer') { IconComponent = Cpu; glowColor = '#FF9900'; }
                            if (scene.role === 'Cloud FinOps') { IconComponent = DollarSign; glowColor = '#00FF99'; }
                            if (scene.role === 'SecOps') { IconComponent = Shield; glowColor = '#3399FF'; }
                            if (scene.role === 'Solutions Architect') { IconComponent = Layers; glowColor = '#8C4FFF'; }
                            if (scene.role === 'Data Engineer') { IconComponent = Database; glowColor = '#3B48CC'; }
                            if (scene.role === 'ML Engineer') { IconComponent = Brain; glowColor = '#FF0055'; }

                            return (
                                <motion.div
                                    key={scene.id}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    onMouseMove={handleMouseMove}
                                    className="glass-panel group"
                                    style={{
                                        padding: '24px',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        border: '1px solid var(--glass-border)',
                                        display: 'flex', flexDirection: 'column', gap: '16px',
                                        minHeight: '280px'
                                    }}
                                    onClick={() => startScenario(scene)}
                                >
                                    <div
                                        className="card-glow"
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0, right: 0, height: '100%',
                                            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), ${glowColor}26, transparent 40%)`,
                                            opacity: 0,
                                            transition: 'opacity 0.5s ease',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                    <style>{`
                                        .group:hover .card-glow { opacity: 1 !important; }
                                        .group:hover { border-color: rgba(255,255,255,0.2) !important; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5) !important; }
                                    `}</style>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{
                                            width: '56px', height: '56px',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '12px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            <IconComponent size={32} color={glowColor} />
                                        </div>
                                        <span style={{
                                            fontSize: '0.7rem',
                                            color: 'var(--text-secondary)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            border: '1px solid var(--glass-border)',
                                            padding: '4px 10px',
                                            borderRadius: '12px',
                                            alignSelf: 'start',
                                            backdropFilter: 'blur(4px)'
                                        }}>
                                            {scene.difficulty}
                                        </span>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--text-primary)', fontWeight: 600 }}>
                                            {scene.title}
                                        </h3>
                                        <p style={{ fontSize: '0.9rem', color: glowColor, marginBottom: '8px', fontWeight: 500, opacity: 0.9 }}>
                                            {scene.role} Protocol
                                        </p>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: 'var(--text-secondary)',
                                            lineHeight: 1.5,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {scene.description}
                                        </p>
                                    </div>

                                    <div style={{
                                        marginTop: 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingTop: '16px',
                                        borderTop: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click to start mission</span>
                                        <div style={{
                                            width: '32px', height: '32px',
                                            borderRadius: '50%',
                                            background: 'rgba(255,255,255,0.05)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'transform 0.2s'
                                        }} className="group-hover:scale-110">
                                            <ArrowRight size={16} color="white" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    /* Active Simulation Terminal */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel"
                        style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 20px 80px rgba(0,0,0,0.5)', background: '#0F111A' }}
                    >
                        {/* Fake Browser/Terminal Header */}
                        <div style={{ background: '#1a1b26', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #333' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                            <span style={{ marginLeft: '20px', fontFamily: 'monospace', color: '#888' }}>ssh aws-admin@{activeScenario.role.toLowerCase().replace(' ', '-')}</span>
                        </div>

                        {/* Chat / Log Handler */}
                        <div style={{ padding: '30px', minHeight: '400px', background: '#0F111A', fontFamily: 'JetBrains Mono, monospace' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '100px' }}>
                                {history.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{
                                            display: 'flex', gap: '15px',
                                            color: msg.type === 'user' ? '#00FF99' : msg.type === 'fail' ? '#FF3333' : msg.type === 'success' ? '#00FF99' : '#fff'
                                        }}
                                    >
                                        <div style={{ minWidth: '24px' }}>
                                            {msg.type === 'system' && <Terminal size={20} color="#888" />}
                                            {msg.type === 'npc' && <div style={{ width: '20px', height: '20px', background: '#FF9900', borderRadius: '4px' }} />}
                                            {msg.type === 'user' && <ArrowRight size={20} />}
                                            {msg.type === 'success' && <Check size={20} />}
                                            {msg.type === 'fail' && <X size={20} />}
                                        </div>
                                        <div style={{ lineHeight: '1.6' }}>{msg.text}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        {status === 'playing' && (
                            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <p style={{ marginBottom: '15px', color: '#888', fontSize: '0.9rem' }}>CHOOSE YOUR ACTION:</p>
                                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                    {activeScenario.steps[stepIndex].options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleOption(opt)}
                                            className="btn-glass"
                                            style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #333', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer', transition: 'all 0.2s' }}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SUCCESS: Big Congratulations Overlay */}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    padding: '50px 30px', textAlign: 'center',
                                    background: 'linear-gradient(180deg, rgba(0,255,153,0.05) 0%, rgba(0,255,153,0.15) 100%)',
                                    borderTop: '1px solid #00FF99'
                                }}
                            >
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        fontSize: '4.5rem', fontWeight: 900, margin: '0 0 10px',
                                        background: 'linear-gradient(to right, #00FF99, #00A3FF, #00FF99)',
                                        backgroundSize: '200% auto',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                        animation: 'shine 3s linear infinite',
                                        filter: 'drop-shadow(0 0 30px rgba(0,255,153,0.4))'
                                    }}
                                >
                                    Congratulations
                                </motion.h1>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    style={{
                                        fontSize: '1.8rem', color: '#fff', fontWeight: 600,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px'
                                    }}
                                >
                                    Mission Accomplished <Smile size={32} color="#00FF99" />
                                </motion.div>
                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={() => setActiveScenario(null)}
                                    className="btn-primary"
                                    style={{
                                        marginTop: '40px', padding: '15px 40px', fontSize: '1.1rem',
                                        background: '#00FF99', color: '#000', border: 'none', borderRadius: '30px', fontWeight: 800, cursor: 'pointer',
                                        boxShadow: '0 0 20px rgba(0,255,153,0.3)', transition: 'all 0.2s'
                                    }}
                                >
                                    Return to HQ
                                </motion.button>
                                <style>{`
                                    @keyframes shine {
                                        to { background-position: 200% center; }
                                    }
                                `}</style>
                            </motion.div>
                        )}

                        {/* FAIL */}
                        {status === 'fail' && (
                            <div style={{ padding: '30px', textAlign: 'center', background: 'rgba(255,50,50,0.1)', borderTop: '1px solid #FF3333' }}>
                                <h2 style={{ marginBottom: '10px', color: '#FF3333', fontSize: '2rem' }}>
                                    MISSION FAILED
                                </h2>
                                <button onClick={() => setActiveScenario(null)} className="btn-primary" style={{ marginTop: '10px', background: '#FF3333', border: 'none' }}>
                                    Retry Mission
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};
