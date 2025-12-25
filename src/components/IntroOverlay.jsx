import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SoundManager } from '../utils/SoundManager';
import { ArrowRight, Play } from 'lucide-react';
// Generic "web" icons
// AWS Service Icons
// AWS Service Icons (Safe Imports)
// Using visual proxies since specific Si* icons are not exported
import { SiAmazonwebservices } from 'react-icons/si';
import { FaServer, FaDatabase, FaCloud, FaCode, FaBoxOpen } from 'react-icons/fa';

const ICONS = [FaServer, FaCloud, FaDatabase, FaCode, FaBoxOpen, SiAmazonwebservices];

// Generate random floating debris (Optimized for performance)
const debris = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    Icon: ICONS[i % ICONS.length],
    x: (Math.random() - 0.5) * 150, // Wider spread
    y: (Math.random() - 0.5) * 150,
    z: Math.random() * 1500, // Good depth
    color: ['#FF9900', '#00A1C9', '#3F8624', '#C925D1'][Math.floor(Math.random() * 4)] // AWS Colors
}));

export const IntroOverlay = ({ onComplete }) => {
    const [phase, setPhase] = useState('idle'); // idle -> voice -> debris -> open
    const [currentText, setCurrentText] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const hasSeen = sessionStorage.getItem('intro_seen_v11'); // Bump to v11 for fresh test
        if (hasSeen) {
            setIsVisible(false);
            onComplete();
        }
    }, [onComplete]);

    const [isFadingOut, setIsFadingOut] = useState(false); // Define state to fix crash

    const [voice, setVoice] = useState(null);

    // Voice Loading Logic
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            console.log("Available voices:", voices.map(v => v.name));

            // Priority list for female voices
            const femaleVoice = voices.find(v =>
                v.name.toLowerCase().includes('zira') ||
                v.name.toLowerCase().includes('samantha') ||
                v.name.toLowerCase().includes('female') ||
                v.name.toLowerCase().includes('google us english') ||
                v.name.toLowerCase().includes('susan') ||
                v.name.toLowerCase().includes('karen')
            );

            if (femaleVoice) {
                setVoice(femaleVoice);
            }
        };

        loadVoices();

        // Browsers load voices asynchronously, so we must listen for the event
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const startExperience = () => {
        setPhase('voice');

        // 1. VOICE PHASE
        const msg = new SpeechSynthesisUtterance();
        msg.text = "Welcome to the AWS Masterclass. This platform turns complexity into clarity. Gamified learning for the future. Let's dive in.";
        msg.volume = 1;
        msg.rate = 1.0; // Normal speed for better flow

        // If we found a preferred voice, Use it. 
        // If not, boost pitch to 1.4 to simulate female range on a male voice as fallback
        if (voice) {
            msg.voice = voice;
            msg.pitch = 1.0;
        } else {
            msg.pitch = 1.4;
        }

        // Message timing (Balanced Sync - Leading the voice but giving time to read)
        setCurrentText("WELCOME");
        setTimeout(() => setCurrentText("AWS MASTERCLASS"), 1200); // 1.2s (Give WELCOME time to type)
        setTimeout(() => setCurrentText("CLARITY"), 3500);
        setTimeout(() => setCurrentText("GAMIFIED"), 5500);
        setTimeout(() => setCurrentText("FUTURE"), 6800);
        setTimeout(() => setCurrentText("DIVING IN..."), 8200);

        // 2. DEBRIS PHASE (Delayed to ensure voice ends)
        setTimeout(() => {
            setPhase('debris');
            try {
                SoundManager.playIntroBuildUp();
            } catch (e) { console.error("Sound Error:", e); }
        }, 9000); // 9.0s Trigger

        // 3. OPEN PHASE (Synced to Climax - Pre-triggered)
        setTimeout(() => {
            setPhase('open');
            try {
                SoundManager.playGrandReveal(); // Grand Chord
            } catch (e) { console.error("Sound Error:", e); }
        }, 13400); // 9.5s + 4s - 100ms = 13.4s

        // 3.5 START FADING OUT (Overlap with Zoom)
        setTimeout(() => {
            setIsFadingOut(true);
        }, 18500); // 13.5s + 5s = 18.5s

        // 4. FINISH
        setTimeout(() => {
            sessionStorage.setItem('intro_seen_v11', 'true');
            setIsVisible(false);
            onComplete();
        }, 21000); // 13.5s + 7s = 20.5s

        window.speechSynthesis.speak(msg);
    };

    if (!isVisible) return null;

    return (
        <motion.div
            className="intro-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: isFadingOut ? 0 : 1 }} // Controlled fade
            transition={{ duration: 2.0, ease: "easeInOut" }} // Smooth 2s fade out
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'black',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column',
                perspective: '1000px',
                overflow: 'hidden'
            }}
        >
            {phase === 'idle' && (
                <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 240, 255, 0.5)' }}
                    onClick={startExperience}
                    style={{
                        background: 'transparent',
                        border: '2px solid var(--neon-cyan)',
                        color: 'var(--neon-cyan)',
                        padding: '20px 40px',
                        fontSize: '1.5rem',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 'bold',
                        display: 'flex', alignItems: 'center', gap: '15px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        zIndex: 20
                    }}
                >
                    <Play fill="currentColor" /> Initialize System
                </motion.button>
            )}

            {phase === 'voice' && (
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={currentText}
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 1.2, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                            color: 'white',
                            fontSize: 'clamp(3rem, 10vw, 8rem)',
                            fontWeight: 900,
                            textAlign: 'center',
                            fontFamily: 'Outfit, sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '-2px',
                            background: 'linear-gradient(to bottom, #fff, #888)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.3))',
                            zIndex: 20,
                            width: '100%',
                            padding: '0 20px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        {currentText}
                    </motion.h1>
                </AnimatePresence>
            )}

            {/* RESTORED VISUALS: Floating Debris */}
            <AnimatePresence>
                {phase === 'debris' && (
                    <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
                        {debris.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, z: -1500 }}
                                animate={{ opacity: [0, 1, 1, 0], z: 1500, x: item.x * 5, y: item.y * 5 }}
                                transition={{
                                    duration: 3.0,
                                    ease: "linear",
                                    repeat: Infinity,
                                    delay: Math.random() * 5.0, // Spread out start heavily
                                    repeatDelay: Math.random() * 2.0
                                }}
                                style={{
                                    position: 'absolute',
                                    left: '50%', top: '50%',
                                    color: item.color,
                                    willChange: 'transform' // GPU Hint
                                }}
                            >
                                {item.Icon && <item.Icon size={50} />}
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* RESTORED VISUALS: "AWS" Zoom Effect */}
            <AnimatePresence>
                {(phase === 'debris' || phase === 'open') && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: phase === 'open' ? [1, 150] : 0, // Start at 1 (Visible) to remove "micro-delay" perception
                            opacity: phase === 'open' ? 1 : 0
                        }}
                        transition={{ duration: 7.0, ease: [0.2, 0, 0.9, 0] }} // Faster initial bite [0.2] then expo finish
                        style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            zIndex: 10,
                            filter: 'drop-shadow(0 0 50px #FF9900)',
                            willChange: 'transform' // GPU Hint
                        }}
                    >
                        <SiAmazonwebservices size={150} color="#FF9900" />
                    </motion.div>
                )
                }
            </AnimatePresence >
        </motion.div >
    );
};
