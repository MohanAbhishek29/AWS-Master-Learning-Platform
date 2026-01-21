import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle, XCircle, ArrowLeft, Play, ShieldAlert, ChevronRight } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

import { cliMissions } from '../data/cli-missions';

export const CLIArena = ({ onExit }) => {
    // Initialize and Shuffle Missions
    const [missions, setMissions] = useState(() => {
        const shuffleArray = (array) => {
            if (!array || !Array.isArray(array)) {
                console.warn("CLI Missions data not found or invalid");
                return [];
            }
            const newArr = [...array];
            for (let i = newArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            }
            return newArr;
        };
        return shuffleArray(cliMissions);
    });

    const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const [gameState, setGameState] = useState('intro'); // intro, playing, success, fail
    const currentMission = missions[currentMissionIdx];
    const [timeLeft, setTimeLeft] = useState(currentMission?.time || 45); // Set initial time from first mission
    const [startPulse, setStartPulse] = useState(false);

    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    // Safety check redundant now with sync init, but good to keep structure
    if (!currentMission && gameState !== 'intro') return null;

    useEffect(() => {
        if (gameState === 'playing') {
            const totalTime = currentMission.time || 20;
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    const next = prev - 1;
                    if (next <= totalTime / 2) {
                        try { SoundManager.playTick(); } catch (e) { }
                    }
                    if (next <= 0) {
                        setGameState('fail');
                        try { SoundManager.playFailure(); } catch (e) { } // Play crash sound
                        return 0;
                    }
                    return next;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState, currentMissionIdx]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        if (inputRef.current && gameState === 'playing') {
            inputRef.current.focus();
        }
    }, [history, gameState]);

    const handleStart = () => {
        setGameState('playing');
        setStartPulse(true);
        // Play sound if possible
        try { SoundManager.playHover(); } catch (e) { }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newHistory = [...history, { type: 'input', text: input }];

        if (input.trim() === currentMission.cmd) {
            newHistory.push({ type: 'output', text: '>> COMMAND EXECUTED SUCCESSFULLY.', status: 'success' });
            // Correct answer
            try { SoundManager.playSuccess(); } catch (e) { }

            if (currentMissionIdx < missions.length - 1) {
                setTimeout(() => {
                    const nextIdx = currentMissionIdx + 1;
                    if (nextIdx < missions.length) {
                        setCurrentMissionIdx(nextIdx);
                        setTimeLeft(missions[nextIdx].time || 20); // Dynamic Time or default
                    }
                    setHistory([]);
                    setInput('');
                }, 1500);
            } else {
                setGameState('success'); // All missions done
            }
        } else {
            newHistory.push({ type: 'output', text: `>> ERROR: Invalid syntax. Command failed.`, status: 'error' });
            newHistory.push({ type: 'hint', text: `>> HINT: ${currentMission.hint}` });
            try { SoundManager.playFailure(); } catch (e) { }
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a0a',
            color: '#00ff41',
            fontFamily: "'Courier New', Courier, monospace",
            zIndex: 5000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* TERMINAL HEADER */}
            <div style={{
                padding: '10px 20px',
                background: '#1a1a1a',
                borderBottom: '1px solid #333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                filter: gameState === 'fail' ? 'blur(2px) grayscale(0.8)' : 'none', // Blur header too
                transition: 'all 0.5s'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Terminal size={20} />
                    <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>AWS_CLI_TERMINAL_V9.0</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ color: timeLeft < 10 ? 'red' : '#00ff41' }}>
                        T-MINUS: {timeLeft}s
                    </div>
                    <button onClick={onExit} style={{ background: 'transparent', border: '1px solid #333', color: '#666', cursor: 'pointer', padding: '5px 10px', fontSize: '0.8rem' }}>
                        EXIT_SESSION
                    </button>
                </div>
            </div>

            {/* SCANLINES OVERLAY */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%',
                zIndex: 10
            }} />

            {/* MAIN CONTENT Area */}
            <div style={{
                flex: 1,
                padding: '40px',
                overflowY: 'auto',
                position: 'relative',
                filter: gameState === 'fail' ? 'blur(8px) contrast(1.2)' : 'none', // Heavy blur on content
                transform: gameState === 'fail' ? 'scale(0.98)' : 'scale(1)',
                transition: 'all 2s ease-out', // Slow crash effect
                opacity: gameState === 'fail' ? 0.5 : 1
            }}>

                {gameState === 'intro' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                    >
                        <ShieldAlert size={80} color="#00ff41" style={{ marginBottom: '20px' }} />
                        <h1 style={{ fontSize: '3rem', marginBottom: '20px', textShadow: '0 0 10px #00ff41' }}>SYSTEM BREACH DETECTED</h1>
                        <p style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '40px', color: '#ccc' }}>
                            You are the last line of defense. The system is destabilizing.
                            Manually override the protocols using the <span style={{ color: 'white' }}>AWS CLI</span>.
                            <br /><br />
                            Accuracy is key. Speed is survival.
                        </p>
                        <button
                            onClick={handleStart}
                            style={{
                                background: '#00ff41', color: 'black', border: 'none', padding: '15px 40px',
                                fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'inherit',
                                cursor: 'pointer', boxShadow: '0 0 20px rgba(0,255,65,0.5)'
                            }}
                        >
                            INITIATE_OVERRIDE_PROTOCOL
                        </button>
                    </motion.div>
                )}

                {(gameState === 'playing' || gameState === 'fail') && (
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {/* MISSION BOX */}
                        <div style={{ border: '1px solid #00ff41', padding: '20px', marginBottom: '30px', background: 'rgba(0,255,65,0.05)' }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '5px' }}>MISSION {currentMissionIdx + 1} / {missions.length}</div>
                            <h2 style={{ fontSize: '1.8rem', margin: '0 0 10px 0', textShadow: '0 0 5px #00ff41' }}>{currentMission.title}</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>{currentMission.desc}</p>
                        </div>

                        {/* HISTORY LOG */}
                        <div style={{ marginBottom: '20px' }}>
                            {history.map((entry, i) => (
                                <div key={i} style={{
                                    marginBottom: '10px',
                                    color: entry.status === 'error' ? '#ff3333' : entry.status === 'success' ? '#00ff41' : '#ccc'
                                }}>
                                    {entry.type === 'input' ? '> ' : ''}{entry.text}
                                </div>
                            ))}
                        </div>

                        {/* INPUT LINE */}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>root@aws-terminal:~#</span>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    autoFocus // Keep autofocus even in fail state to see it blurred
                                    disabled={gameState === 'fail'}
                                    spellCheck="false"
                                    style={{
                                        width: '100%', background: 'transparent', border: 'none', outline: 'none',
                                        color: '#00ff41', fontSize: '1.2rem', fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                        </form>
                        <div ref={bottomRef} />
                    </div>
                )}

                {gameState === 'success' && (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h1 style={{ fontSize: '4rem', color: '#00ff41', marginBottom: '20px' }}>SYSTEM SECURED</h1>
                        <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>All threats neutralized. Good work, Administrator.</p>
                        <button onClick={onExit} style={{ border: '2px solid #00ff41', background: 'transparent', color: '#00ff41', padding: '15px 30px', fontSize: '1.2rem', cursor: 'pointer' }}>RETURN_TO_BASE</button>
                    </div>
                )}
            </div>

            {/* RED ALARM OVERLAY */}
            <AnimatePresence>
                {gameState === 'fail' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        style={{
                            position: 'absolute', inset: 0,
                            background: 'red',
                            zIndex: 150,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* STATIC NOISE OVERLAY */}
            <AnimatePresence>
                {gameState === 'fail' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                            zIndex: 160,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* CRASH POPUP OVERLAY */}
            <AnimatePresence>
                {gameState === 'fail' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            background: 'linear-gradient(180deg, #004455 0%, #001122 100%)', // Blue-ish tech background
                            border: '2px solid #00FFFF',
                            boxShadow: '0 0 50px rgba(0, 255, 255, 0.2)',
                            zIndex: 200,
                            width: '500px',
                            maxWidth: '90%',
                            fontFamily: 'Arial, sans-serif' // Tech UI font
                        }}
                    >
                        {/* HEADER */}
                        <div style={{ background: 'rgba(0, 255, 255, 0.2)', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #00FFFF' }}>
                            <div style={{ width: '10px', height: '10px', background: '#00FFFF' }} />
                            <span style={{ color: '#00FFFF', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 'bold' }}>SYSTEM ALERT</span>
                        </div>

                        {/* CONTENT */}
                        <div style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ position: 'relative', marginBottom: '20px' }}>
                                <ShieldAlert size={100} color="#FF0000" style={{ filter: 'drop-shadow(0 0 20px red)' }} className="animate-pulse" />
                            </div>

                            <h1 style={{
                                color: 'white', fontSize: '3rem', margin: '0 0 10px 0',
                                fontFamily: "'Impact', sans-serif", letterSpacing: '2px',
                                textShadow: '2px 2px 0px #FF0000'
                            }}>
                                SYSTEM ERROR
                            </h1>

                            <p style={{ color: '#00FFFF', fontSize: '1.2rem', marginBottom: '30px' }}>
                                CRITICAL FAILURE DETECTED
                            </p>

                            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                                <button
                                    onClick={() => { setHistory([]); setCurrentMissionIdx(0); setGameState('playing'); setTimeLeft(30); }}
                                    style={{
                                        flex: 1,
                                        background: '#330000', border: '1px solid #FF0000', color: '#FF0000',
                                        padding: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    [ REBOOT ]
                                </button>
                                <button
                                    onClick={onExit}
                                    style={{
                                        flex: 1,
                                        background: '#0a0a0a', border: '1px solid #444', color: '#888',
                                        padding: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    ABORT
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
