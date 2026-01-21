import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizData } from '../data/quiz-data';
import { Trophy, Zap, AlertCircle, CheckCircle, ArrowRight, ArrowLeft, Users, Loader, Sword, Heart, Info, Award, Download, Share2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { SoundManager } from '../utils/SoundManager';
import { ArenaBot } from '../utils/arena-bot';

import { CLIArena } from '../components/CLIArena';

// --- Components ---
const QuitModal = ({ onConfirm, onCancel }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel"
            style={{ padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '400px', textAlign: 'center' }}
        >
            <h2 style={{ marginBottom: '20px' }}>Want to leave?</h2>
            <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '30px' }}>
                Are you sure you want to quit current game?
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button
                    onClick={onConfirm}
                    className="btn-danger-glow"
                    style={{ padding: '12px 30px', borderRadius: '50px', background: 'linear-gradient(45deg, #FF3333, #FF6666)', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 51, 51, 0.4)' }}
                >
                    Yes, I yield
                </button>
                <button
                    onClick={onCancel}
                    className="btn-glass"
                    style={{ padding: '12px 30px', borderRadius: '50px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 'bold', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
                >
                    No, stay
                </button>
            </div>
        </motion.div>
    </div>
);

// --- CONSTANTS ---
const TAGLINES = {
    'practice': [
        "S3: Simple Storage Service? More like Simple Study Service!",
        "IAM: Identity and Access Mastery.",
        "Route 53: Routing you to success.",
        "EC2: Elastic Compute Excellence.",
        "VPC: Virtual Perfect Cloud.",
        "CloudFront: Delivering knowledge, fast.",
        "Lambda: Run code without thinking about servers.",
        "DynamoDB: Single-digit millisecond latency.",
        "RDS: Relational Database Super-skills.",
        "Aurora: High performance and availability.",
        "CloudWatch: Watching your success metrics.",
        "CloudTrail: Auditing your path to victory.",
        "S3 Glacier: Cool under pressure.",
        "Shield: Protected against failure.",
        "WAF: Web Application Fantastic."
    ],
    'timed-1': [
        "Cold Start? No thanks!",
        "Provisioned Concurrency: ON.",
        "Auto Scaling: Triggered.",
        "Load Balancing: Active.",
        "Health Check: Passing.",
        "Latency: Zero.",
        "Throughput: Max.",
        "IOPS: High.",
        "Burst Balance: 100%.",
        "Compute Optimizer: Optimized.",
        "Global Accelerator: Speed boost engaged.",
        "Edge Location: You are here.",
        "Direct Connect: Fast lane only."
    ],
    'timed-3': [
        "Five Nines of Reliability.",
        "Multi-AZ Deployment: Active.",
        "Region: Global.",
        "Availability Zone: You.",
        "Disaster Recovery: Plan A.",
        "Backup: Automated.",
        "Replica: Read-Only.",
        "Consistency: Strong.",
        "Durability: 11 9s.",
        "Archive: Glacier Deep Archive.",
        "Pilot Light: Ignited.",
        "Warm Standby: Ready.",
        "Active-Active: Full power."
    ]
};

// --- SUB COMPONENTS ---

const Card = ({ title, icon, desc, color, onClick, handleMouseMove, isNew }) => (
    <motion.div
        className="glass-panel group-card"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -5 }}
        style={{ padding: '30px', borderRadius: '24px', cursor: 'pointer', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden', minHeight: '300px', display: 'flex', flexDirection: 'column', textAlign: 'left' }}
    >
        <div className="card-glow" style={{ position: 'absolute', inset: 0, background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), ${color}33, transparent 40%)`, opacity: 0, transition: 'opacity 0.5s ease', pointerEvents: 'none' }} />
        <style>{`.group-card:hover .card-glow { opacity: 1!important; }`}</style>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{title}</h3>
        <p style={{ color: '#aaa', lineHeight: 1.6, flex: 1 }}>{desc}</p>
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px', color: color, fontWeight: 'bold' }}>
            Initialize <ArrowRight size={18} />
        </div>
    </motion.div>
);

const QuestionCard = ({ question, selectedOption, handleAnswer, centered }) => (
    <div className="glass-panel" style={{ padding: '30px', borderRadius: '20px', textAlign: centered ? 'center' : 'left' }}>
        <h2 style={{ fontSize: centered ? '2rem' : '1.6rem', marginBottom: '30px', lineHeight: 1.4 }}>{question?.question}</h2>
        <div style={{ display: 'grid', gap: '15px', maxWidth: centered ? '600px' : '100%', margin: centered ? '0 auto' : '0' }}>
            {question?.options.map(opt => {
                const isSel = selectedOption === opt;
                const isRight = opt === question?.answer;
                let bg = 'rgba(255,255,255,0.05)';
                let border = '1px solid rgba(255,255,255,0.1)';

                if (selectedOption) {
                    if (isRight) { bg = 'rgba(0, 255, 153, 0.2)'; border = '1px solid #00FF99'; }
                    else if (isSel) { bg = 'rgba(255, 50, 50, 0.2)'; border = '1px solid #FF3333'; }
                }
                return (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        disabled={!!selectedOption}
                        style={{
                            padding: '20px',
                            textAlign: 'left',
                            background: bg,
                            border: border,
                            borderRadius: '16px',
                            color: 'white',
                            cursor: selectedOption ? 'default' : 'pointer',
                            fontSize: '1.1rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {opt}
                    </button>
                )
            })}
        </div>

        {selectedOption && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    marginTop: '30px',
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.05)',
                    borderLeft: '4px solid #00A1C9',
                    textAlign: 'left'
                }}
            >
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#00A1C9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info size={20} /> Explanation
                </div>
                <p style={{ lineHeight: 1.6, color: '#e0e0e0', fontSize: '1.1rem' }}>{question?.explanation}</p>
            </motion.div>
        )}
    </div>
);

const SadEmoji = ({ show }) => (
    <AnimatePresence>
        {show && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ position: 'fixed', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}
            >
                <div style={{ fontSize: '15rem', filter: 'drop-shadow(0 0 50px rgba(0,0,0,0.5))' }}>😭</div>
            </motion.div>
        )}
    </AnimatePresence>
);

const HappyEmoji = ({ show }) => (
    <AnimatePresence>
        {show && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ position: 'fixed', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}
            >
                <div style={{ fontSize: '15rem', filter: 'drop-shadow(0 0 50px rgba(0,0,0,0.5))' }}>🥰</div>
            </motion.div>
        )}
    </AnimatePresence>
);

// --- MAIN COMPONENT ---
export const Arena = () => {
    // Game State
    const [gameMode, setGameMode] = useState(null); // 'practice', 'timed-1', 'timed-3'
    const [matchState, setMatchState] = useState('idle'); // 'idle', 'racing', 'finished'

    // Quiz State
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [lives, setLives] = useState(3);
    const [timeLeft, setTimeLeft] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    // Certificate State
    const [userName, setUserName] = useState('');
    const [isGeneratingCert, setIsGeneratingCert] = useState(false);
    const certificateRef = useRef(null);

    // Bot (Legacy Ref kept to avoid breaking if used, but stopped)
    const botRef = useRef(null);

    // UI State
    const [showQuitModal, setShowQuitModal] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [modalTagline, setModalTagline] = useState('');
    const [showSadEmoji, setShowSadEmoji] = useState(false);
    const [showHappyEmoji, setShowHappyEmoji] = useState(false);

    const [showCLI, setShowCLI] = useState(false);

    // --- INITIALIZATION ---
    useEffect(() => {
        console.log("Arena Component Mounted");
        console.log("QuizData Status:", quizData ? "Loaded" : "Missing", "Length:", quizData?.length);
        if (!quizData) {
            console.error("CRITICAL: QuizData import failed!");
        }
    }, []);

    // --- DEV CHEATS (HIDDEN HOTKEYS) ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (matchState !== 'finished') return;

            // Secret keys to toggle ranks instantly
            switch (e.key) {
                case '1':
                    setScore(15000);
                    setStreak(42); // Legit looking streak for God Tier
                    break;
                case '2':
                    setScore(7500);
                    setStreak(15);
                    break;
                case '3':
                    setScore(2500);
                    setStreak(5);
                    break;
                case '0':
                    setScore(500);
                    setStreak(1);
                    break;
                default: break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [matchState]);

    // Removed specific useEffect for shuffling here, moving it to startGame for fresh shuffle every time.

    // --- TIMER LOGIC (Single Player) ---
    useEffect(() => {
        if (!gameMode || gameMode === 'practice' || matchState === 'finished') return;

        if (timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && matchState === 'racing') {
            setMatchState('finished');
        }
    }, [timeLeft, gameMode, matchState]);

    // --- LIVES LOGIC (Game Over) ---
    useEffect(() => {
        if (gameMode === 'practice' || matchState !== 'racing') return;

        if (lives <= 0) {
            setMatchState('finished');
            SoundManager.playFailure();
        }
    }, [lives, gameMode, matchState]);


    // --- HANDLERS ---
    const startGame = (mode) => {
        try {
            if (!quizData || !Array.isArray(quizData)) {
                console.error("CRITICAL ERROR: quizData is missing or invalid.", quizData);
                alert("Error loading quiz data. Please refresh the page.");
                return;
            }

            setGameMode(mode);
            setShowQuitModal(false);
            setScore(0);
            setStreak(0);
            setCurrentQuestion(0);

            // SHUFFLE QUESTIONS (Fisher-Yates Algorithm for true randomness)
            const shuffleArray = (array) => {
                const newArr = [...array];
                for (let i = newArr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                }
                return newArr;
            };

            const shuffledResources = shuffleArray(quizData).map(q => ({
                ...q,
                options: shuffleArray(q.options)
            }));

            setQuestions(shuffledResources);

            setMatchState('racing');
            if (mode === 'timed-1') setTimeLeft(60);
            if (mode === 'timed-3') setTimeLeft(180);
        } catch (error) {
            console.error("Error starting game:", error);
        }
    };

    const handleAnswer = (option) => {
        if (selectedOption || matchState !== 'racing') return;

        setSelectedOption(option);
        const correct = option === questions[currentQuestion].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 100 * (streak + 1));
            setStreak(streak + 1);
            SoundManager.playSuccess();
        } else {
            setStreak(0); // Reset streak on error
            if (gameMode !== 'practice') {
                setLives(prev => prev - 1);
            }
            SoundManager.playFailure();
        }

        // Delay Next Question
        const delay = gameMode === 'practice' ? 2500 : 1000;
        setTimeout(() => {
            if (gameMode === 'practice') {
                // Endless Mode Logic: Reshuffle if end reached
                if (currentQuestion >= questions.length - 1) {
                    const shuffleArray = (array) => {
                        const newArr = [...array];
                        for (let i = newArr.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                        }
                        return newArr;
                    };

                    const reshuffled = shuffleArray(questions).map(q => ({
                        ...q,
                        options: shuffleArray(q.options)
                    }));
                    setQuestions(reshuffled);
                    setQuestions(reshuffled);
                    setCurrentQuestion(0);
                } else {
                    setCurrentQuestion(currentQuestion + 1);
                }
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                // Ranked Logic
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedOption(null);
                    setIsCorrect(null);
                } else {
                    setMatchState('finished');
                }
            }
        }, 1000);
    };

    const handleQuit = () => {
        handleQuitConfirm();
    };

    const handleQuitConfirm = () => {
        setShowQuitModal(false);
        setShowSadEmoji(true);
        if (botRef.current) botRef.current.stop();

        setTimeout(() => {
            setShowSadEmoji(false);
            setGameMode(null);
            setMatchState('idle');
            setScore(0);
            setCurrentQuestion(0);
            setStreak(0);
            setLives(3);
            setTimeLeft(0);
            setModalMode(null);
            setSelectedOption(null);
            setIsCorrect(null);
        }, 1500);
    };

    const handleQuitCancel = () => {
        setShowQuitModal(false);
        setShowHappyEmoji(true);
        setTimeout(() => setShowHappyEmoji(false), 2000);
    };

    // --- RENDER HELPERS ---
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    // TAGLINES moved to file scope (see bottom of file or before component)

    // Persistent deck for the session
    const taglineDeck = useRef({
        'practice': [],
        'timed-1': [],
        'timed-3': []
    });

    const openStartModal = (mode) => {
        setModalMode(mode);

        // Refill deck if empty
        if (!taglineDeck.current[mode] || taglineDeck.current[mode].length === 0) {
            // Create a shuffled copy of the master list
            taglineDeck.current[mode] = [...TAGLINES[mode]].sort(() => Math.random() - 0.5);
        }

        // Pop one unique line
        const uniqueLine = taglineDeck.current[mode].pop();
        setModalTagline(uniqueLine);
    };


    const confirmStart = () => {
        startGame(modalMode);
        setModalMode(null);
        setModalTagline('');
    };

    // --- RENDER: LOBBY ---
    if (showCLI) {
        return <CLIArena onExit={() => setShowCLI(false)} />;
    }

    if (!gameMode) {
        return (
            <div className="page-arena" style={{ paddingTop: '120px', minHeight: '100vh', textAlign: 'center' }}>
                <div className="container">
                    <Link to="/" style={{ position: 'absolute', top: 100, left: 40, color: '#888', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10, textDecoration: 'none' }}>
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '16px' }}>AWS Combat Arena</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '60px' }}>Choose your battlefield.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>

                        {/* 1. Practice */}
                        <Card
                            title="Practice Zone"
                            icon={<Zap size={32} color="#00A1C9" />}
                            desc="Unlimited time. No pressure. Perfect your skills."
                            color="#00A1C9"
                            onClick={() => openStartModal('practice')}
                            handleMouseMove={handleMouseMove}
                        />

                        {/* 2. Blitz */}
                        <Card
                            title="Blitz Rush"
                            icon={<Users size={32} color="#FF9900" />}
                            desc="60 Seconds. Speed run. Can you top the charts?"
                            color="#FF9900"
                            onClick={() => openStartModal('timed-1')}
                            handleMouseMove={handleMouseMove}
                        />

                        {/* 3. Marathon */}
                        <Card
                            title="Marathon"
                            icon={<AlertCircle size={32} color="#00FF99" />}
                            desc="3 Minutes. Pure endurance. Test your limits."
                            color="#00FF99"
                            onClick={() => openStartModal('timed-3')}
                            handleMouseMove={handleMouseMove}
                        />

                        {/* 4. CLI Hacker Mode */}
                        <Card
                            title="CLI Hacker"
                            icon={<Shield size={32} color="#00FF41" />}
                            desc="Terminal Access. Manual Override. Save the System."
                            color="#00FF41"
                            onClick={() => setShowCLI(true)}
                            handleMouseMove={handleMouseMove}
                        />
                    </div>

                    {/* Pre-Game Modal with Taglines */}
                    <AnimatePresence>
                        {modalMode && (
                            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="glass-panel"
                                    style={{ padding: '50px', maxWidth: '500px', width: '90%', borderRadius: '30px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', backgroundImage: 'radial-gradient(circle at top right, rgba(255,255,255,0.05), transparent)' }}
                                >
                                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚀</div>
                                    <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>Ready to Launch?</h2>

                                    {modalTagline && (
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <p style={{ fontSize: '1.1rem', color: '#00FF99', fontStyle: 'italic', fontFamily: 'monospace' }}>
                                                "{modalTagline}"
                                            </p>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <button
                                            onClick={() => setModalMode(null)}
                                            className="btn-glass"
                                            style={{ flex: 1 }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => confirmStart()}
                                            className="btn-primary"
                                            style={{ flex: 1, fontSize: '1.2rem' }}
                                        >
                                            Let's Go
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    // --- RENDER: FINISHED SCREENS ---
    if (matchState === 'finished') {
        const isWin = lives > 0 && timeLeft !== 0; // Simplified win check for single player
        // Better win check: Score > 0 and not ran out of lives
        const success = score > 0 && lives > 0;

        const handleDownloadCertificate = async () => {
            if (!userName.trim() || !certificateRef.current) return;
            setIsGeneratingCert(true);
            try {
                // Wait a moment for fonts/images
                await new Promise(resolve => setTimeout(resolve, 500));

                const dataUrl = await toPng(certificateRef.current, {
                    quality: 1.0,
                    pixelRatio: 2, // High resolution
                    width: 1920,
                    height: 1080
                });
                const link = document.createElement('a');
                link.download = `AWS_Arena_${userName.replace(/\s+/g, '_')}_${score}.png`;
                link.href = dataUrl;
                link.click();
                SoundManager.playSuccess();
            } catch (err) {
                console.error('Certificate generation failed', err);
            }
            setIsGeneratingCert(false);
        };

        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)', padding: '40px' }}>
                <div className="glass-panel" style={{ padding: '40px', borderRadius: '30px', textAlign: 'center', border: success ? '2px solid #00FF99' : '2px solid #FF3333', maxWidth: '800px', width: '100%' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '20px' }}>{success ? '🏆' : '💀'}</div>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '10px' }}>{success ? 'VICTORY' : 'DEFEAT'}</h1>
                    <p style={{ fontSize: '1.5rem', margin: '20px 0', color: success ? '#00FF99' : '#FF3333' }}>
                        {success ? 'You architected the win!' : 'Packet Loss Detected.'}
                    </p>
                    <p style={{ fontSize: '1.2rem', color: '#ccc' }}>Score: <span style={{ color: 'white', fontWeight: 'bold' }}>{score}</span> | Streak: <span style={{ color: 'white', fontWeight: 'bold' }}>{streak}</span></p>

                    {success && (
                        <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <Award color="#FFD700" /> Claim Your Certificate
                            </h3>

                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1.1rem', width: '300px', textAlign: 'center' }}
                                />
                                <button
                                    onClick={handleDownloadCertificate}
                                    disabled={!userName.trim() || isGeneratingCert}
                                    className="btn-primary"
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: !userName.trim() ? 0.5 : 1 }}
                                >
                                    {isGeneratingCert ? <Loader className="animate-spin" size={20} /> : <Download size={20} />}
                                    Download
                                </button>
                            </div>

                            {/* HIDDEN CERTIFICATE TEMPLATE - V2 GOD TIER (HYPER-POLISHED) */}
                            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                                <div ref={certificateRef} style={{ width: '1920px', height: '1080px', background: '#050510', position: 'relative', overflow: 'hidden', fontFamily: "'Outfit', sans-serif", color: 'white' }}>

                                    {/* DYNAMIC VARIABLES */}
                                    {(() => {
                                        const rankColor = score > 10000 ? '#FF0055' : score > 5000 ? '#FFD700' : '#00F0FF';
                                        return (
                                            <>
                                                {/* 1. BACKGROUND LAYERS */}
                                                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${rankColor}1A, transparent 70%)` }} />
                                                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${rankColor}0D 1px, transparent 1px), linear-gradient(90deg, ${rankColor}0D 1px, transparent 1px)`, backgroundSize: '50px 50px', maskImage: 'radial-gradient(circle at 50% 50%, black, transparent)' }} />

                                                {/* Circuit Accents (SVG Background) */}
                                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
                                                    <path d="M0,100 L100,200 L300,200 L350,150" fill="none" stroke={rankColor} strokeWidth="2" />
                                                    <path d="M1920,980 L1820,880 L1620,880 L1570,930" fill="none" stroke={rankColor} strokeWidth="2" />
                                                    <circle cx="100" cy="200" r="4" fill={rankColor} />
                                                    <circle cx="1820" cy="880" r="4" fill={rankColor} />
                                                </svg>

                                                {/* 2. TECH FRAME */}
                                                <div style={{ position: 'absolute', inset: '40px', border: `2px solid ${rankColor}4D`, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 80% 100%, 75% 95%, 25% 95%, 20% 100%, 0 100%)' }} />
                                                <div style={{ position: 'absolute', inset: '50px', border: `1px solid ${rankColor}1A`, clipPath: 'polygon(0 0, 20% 0, 25% 5%, 75% 5%, 80% 0, 100% 0, 100% 100%, 0 100%)' }} />

                                                {/* Corner Accents */}
                                                <div style={{ position: 'absolute', top: '40px', left: '40px', width: '200px', height: '2px', background: rankColor, boxShadow: `0 0 15px ${rankColor}` }} />
                                                <div style={{ position: 'absolute', top: '40px', left: '40px', width: '2px', height: '200px', background: rankColor, boxShadow: `0 0 15px ${rankColor}` }} />
                                                <div style={{ position: 'absolute', bottom: '40px', right: '40px', width: '200px', height: '2px', background: rankColor, boxShadow: `0 0 15px ${rankColor}` }} />
                                                <div style={{ position: 'absolute', bottom: '40px', right: '40px', width: '2px', height: '200px', background: rankColor, boxShadow: `0 0 15px ${rankColor}` }} />

                                                {/* 3. HOLOGRAPHIC SHEEN OVERLAY (Foil Effect) */}
                                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)', mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 5 }} />

                                                {/* 4. CONTENT CONTAINER */}
                                                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>

                                                    {/* HEADER */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                                                        <div style={{ height: '2px', width: '100px', background: `linear-gradient(90deg, transparent, ${rankColor})` }} />
                                                        <div style={{ fontSize: '1.5rem', letterSpacing: '8px', color: rankColor, textTransform: 'uppercase', textShadow: `0 0 20px ${rankColor}80` }}>
                                                            AWS MASTER CLASS
                                                        </div>
                                                        <div style={{ height: '2px', width: '100px', background: `linear-gradient(90deg, ${rankColor}, transparent)` }} />
                                                    </div>

                                                    {/* TITLE */}
                                                    <h1 style={{ fontSize: '7rem', fontWeight: '800', lineHeight: 1, margin: 0, background: 'linear-gradient(180deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase', letterSpacing: '4px', filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.2))' }}>
                                                        Certificate
                                                    </h1>
                                                    <h2 style={{ fontSize: '3rem', fontWeight: '300', margin: '0 0 60px 0', color: rankColor, letterSpacing: '12px', textTransform: 'uppercase' }}>
                                                        of Mastery
                                                    </h2>

                                                    {/* USER NAME */}
                                                    <div style={{ fontSize: '5.5rem', fontWeight: 'bold', color: '#fff', textShadow: `0 0 40px ${rankColor}66`, marginBottom: '10px' }}>
                                                        {userName || 'Future Architect'}
                                                    </div>
                                                    <div style={{ height: '4px', width: '400px', background: `linear-gradient(90deg, transparent, ${rankColor}, transparent)`, marginBottom: '60px' }} />

                                                    {/* STATS HUD - GRID LAYOUT */}
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', background: 'rgba(0,0,0,0.6)', padding: '30px 60px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', boxShadow: `0 0 50px ${rankColor}1A`, position: 'relative', overflow: 'hidden' }}>

                                                        {/* HUD Glow */}
                                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: `linear-gradient(90deg, transparent, ${rankColor}, transparent)` }} />

                                                        {/* RANK BADGE & STATUS */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '40px' }}>
                                                            <div style={{ fontSize: '1rem', color: '#888', letterSpacing: '2px', marginBottom: '15px' }}>CLASSIFICATION</div>
                                                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px' }}>
                                                                {/* Tech Ring SVG */}
                                                                <svg style={{ position: 'absolute', inset: '-20px', width: '140px', height: '140px', animation: 'spin 20s linear infinite' }}>
                                                                    <circle cx="70" cy="70" r="60" fill="none" stroke={rankColor} strokeWidth="1" strokeDasharray="10 5" opacity="0.5" />
                                                                    <circle cx="70" cy="70" r="50" fill="none" stroke={rankColor} strokeWidth="2" strokeDasharray="30 30" opacity="0.8" />
                                                                </svg>

                                                                {/* Icon */}
                                                                <div style={{ color: rankColor, filter: `drop-shadow(0 0 15px ${rankColor})` }}>
                                                                    {score > 10000 ? <Trophy size={50} /> : <Award size={50} />}
                                                                </div>
                                                            </div>
                                                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: rankColor, textShadow: `0 0 20px ${rankColor}`, marginTop: '10px' }}>
                                                                {score > 10000 ? 'GOD TIER' : score > 5000 ? 'MASTER' : score > 1000 ? 'ARCHITECT' : 'ROOKIE'}
                                                            </div>
                                                        </div>

                                                        {/* SCORE & STREAK */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '40px', justifyContent: 'center' }}>
                                                            <div style={{ fontSize: '1rem', color: '#888', letterSpacing: '2px', marginBottom: '10px' }}>PERFORMANCE</div>
                                                            <div style={{ display: 'flex', gap: '40px' }}>
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>{score}</div>
                                                                    <div style={{ fontSize: '0.8rem', color: '#555' }}>PTS</div>
                                                                </div>
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FF9900' }}>{streak}</div>
                                                                    <div style={{ fontSize: '0.8rem', color: '#555' }}>STREAK</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* DATE & ID */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div style={{ fontSize: '1rem', color: '#888', letterSpacing: '2px', marginBottom: '10px' }}>ISSUED</div>
                                                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>
                                                                {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                            </div>
                                                            <div style={{ fontSize: '1rem', color: '#444', fontFamily: 'monospace', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '4px' }}>
                                                                ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* FOOTER SIGNATURE */}
                                                <div style={{ position: 'absolute', bottom: '60px', width: '100%', textAlign: 'center', opacity: 0.8 }}>
                                                    <div style={{ fontSize: '1rem', letterSpacing: '6px', color: '#fff', marginBottom: '15px', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>AUTHORIZED BY AWS MASTER CLASS</div>
                                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                                                        <div style={{ height: '1px', width: '50px', background: '#555' }} />
                                                        <Sword size={20} color="#555" />
                                                        <div style={{ height: '1px', width: '50px', background: '#555' }} />
                                                    </div>
                                                </div>

                                                {/* DECORATIVE HUD ELEMENTS */}
                                                <div style={{ position: 'absolute', top: '50%', left: '40px', writingMode: 'vertical-rl', color: `${rankColor}33`, fontSize: '0.8rem', letterSpacing: '4px' }}>SYSTEM.VERIFIED.SECURE</div>
                                                <div style={{ position: 'absolute', top: '50%', right: '40px', writingMode: 'vertical-rl', color: `${rankColor}33`, fontSize: '0.8rem', letterSpacing: '4px' }}>AWS.MASTER.CLASS.V2</div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    )}


                    <button onClick={handleQuitConfirm} className="btn-glass" style={{ marginTop: '30px', padding: '15px 40px' }}>
                        Return to Lobby
                    </button>
                </div >
            </div >
        );
    }

    // --- RENDER: GAMEPLAY (SINGLE PLAYER) ---
    const userProgress = ((currentQuestion) / questions.length) * 100;

    return (
        <div className="page-arena" style={{ paddingTop: '80px', minHeight: '100vh', overflow: 'hidden' }}>
            {showQuitModal && <QuitModal onConfirm={handleQuitConfirm} onCancel={handleQuitCancel} />}
            <HappyEmoji show={showHappyEmoji} />
            <SadEmoji show={showSadEmoji} />

            {/* HEADER */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '80px', background: 'rgba(5, 5, 10, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', padding: '0 40px', zIndex: 3000, borderBottom: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
                <button onClick={() => setShowQuitModal(true)} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', fontSize: '1rem' }}>
                    <ArrowLeft size={20} /> Back
                </button>

                {/* Timer Display */}
                {(gameMode === 'timed-1' || gameMode === 'timed-3') && (
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'monospace', color: timeLeft < 10 ? '#FF3333' : '#fff', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                )}

                {/* Title */}
                {!['timed-1', 'timed-3'].includes(gameMode) && (
                    <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        SOLO TRAINING
                    </div>
                )}

                <div style={{ display: 'flex', gap: '20px', color: '#00FF99', marginLeft: 'auto', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {/* Lives Display with Hearts */}
                        {[...Array(3)].map((_, i) => (
                            <Heart
                                key={i}
                                size={20}
                                fill={i < lives ? "#FF3333" : "transparent"}
                                color={i < lives ? "#FF3333" : "#444"}
                            />
                        ))}
                    </span>
                    <span>⚡ {streak}</span>
                    <span>💎 {score}</span>
                    <button
                        onClick={() => setMatchState('finished')}
                        className="btn-glass"
                        style={{
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            background: 'rgba(0, 255, 153, 0.1)',
                            borderColor: '#00FF99',
                            color: '#00FF99',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <CheckCircle size={16} /> Finish
                    </button>
                </div>
            </div>

            {/* GAMEPLAY CONTAINER */}
            <div style={{
                height: 'calc(100vh - 80px)',
                background: 'var(--bg-deep)',
                overflow: 'hidden'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', height: '100%', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#888' }}>
                        <span>Question</span>
                        <span>{Math.min(currentQuestion + 1, questions.length)} / {questions.length}</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '40px', overflow: 'hidden' }}>
                        <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #00C6FF, #0072FF)' }} animate={{ width: `${userProgress}%` }} />
                    </div>

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <QuestionCard
                                question={questions[currentQuestion]}
                                selectedOption={selectedOption}
                                handleAnswer={handleAnswer}
                                centered={true}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );

};
