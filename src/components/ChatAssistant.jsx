import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ArrowRight, Minimize2, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/aws-services';

export const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hello! 👋 I am your AWS Assistant. You can ask me to explain services, or say "Take me to Galaxy" to navigate instantly!' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [lastContext, setLastContext] = useState(null);
    const [isIdle, setIsIdle] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem('aws_user_name') || '');
    const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
    const [showSettings, setShowSettings] = useState(false);
    const [isDraggable, setIsDraggable] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const messagesEndRef = useRef(null);
    const idleTimerRef = useRef(null);
    const lastTapRef = useRef(0);
    const navigate = useNavigate();

    // Site Features Knowledge Base
    const siteFeatures = [
        { id: 'galaxy', keywords: ['galaxy', '3d', 'visualization', 'stars', 'space', 'universe'], name: 'Service Galaxy', path: '/galaxy', desc: 'A 3D interactive universe where every AWS service is a star. You can fly around, click nodes to see relationships, and visualize how services connect in categories.' },
        { id: 'globe', keywords: ['globe', 'map', 'region', 'infrastructure', 'world', 'earth', 'location'], name: 'Global Infrastructure', path: '/globe', desc: 'A real-time 3D globe visualization. It shows all AWS Regions, Availability Zones, and Points of Presence, demonstrating the massive physical scale of the cloud.' },
        { id: 'simulator', keywords: ['job', 'simulator', 'interview', 'work', 'practice', 'task', 'real world'], name: 'Job Simulator', path: '/job-simulator', desc: 'An interactive role-playing game where you solve real-world cloud problems (like "Fix a crashing server") to gain experience for job interviews.' },
        { id: 'arena', keywords: ['arena', 'battle', 'quiz', 'competition', 'fight', 'game', 'leaderboard', 'score'], name: 'Cloud Arena', path: '/arena', desc: 'A multiplayer quiz battleground! Challenge yourself or others to answer AWS questions, climb the leaderboard, and prove your mastery.' },
        { id: 'builder', keywords: ['builder', 'architecture', 'diagram', 'design', 'draw', 'canvas'], name: 'Architecture Builder', path: '/builder', desc: 'A drag-and-drop canvas for designing cloud systems. verified architectures. You can visually map out EC2, S3, and RDS connections to plan your projects.' },
        { id: 'cheatsheets', keywords: ['cheat', 'sheet', 'reference', 'quick', 'pdf', 'guide'], name: 'Cheatsheets', path: '/cheatsheets', desc: 'A collection of high-quality PDFs and quick-reference cards for architectural patterns, service limits, and best practices.' },
        { id: 'learning', keywords: ['learning', 'path', 'course', 'roadmap', 'learn', 'study', 'beginner'], name: 'Learning Paths', path: '/learning-paths', desc: 'Curated educational roadmaps that guide you step-by-step from "Cloud Novice" to "Solutions Architect" or "DevOps Engineer".' },
        { id: 'certificate', keywords: ['certificate', 'exam', 'certified', 'degree', 'ccp', 'associate'], name: 'Certifications', path: '/certificate', desc: 'Detailed guides on AWS Certifications (CCP, SAA, etc.), including tips, exam requirements, and how to get certified.' },
        { id: 'services', keywords: ['services', 'catalog', 'list', 'all services', 'menu', 'browse'], name: 'Service Catalog', path: '/services', desc: 'The comprehensive library of all AWS services. Search, filter by category, and click any service to learn its details.' },
        { id: 'community', keywords: ['community', 'forum', 'chat', 'social', 'help', 'peers'], name: 'Community', path: '/community', desc: 'A hub for cloud learners. Join discussions, find study partners, and share your learning achievements with others.' },
        { id: 'about', keywords: ['about', 'info', 'team', 'creator', 'contact', 'mission'], name: 'About Us', path: '/about', desc: 'Learn about the vision behind this "God-Tier" learning platform and the team dedicated to making cloud education stunning and accessible.' },
        { id: 'home', keywords: ['home', 'main', 'start', 'dashboard', 'landing'], name: 'Home', path: '/', desc: 'The command center of the application. Get an overview of new features, your progress, and quick links to all modules.' }
    ];

    // --- Double Tap Detection ---
    const handleDoubleTap = () => {
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
            setIsDraggable(!isDraggable);
        }
        lastTapRef.current = now;
    };

    // --- Auto-Hide Logic ---
    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        if (!isOpen && !isDraggable) {
            idleTimerRef.current = setTimeout(() => {
                setIsIdle(true);
            }, 3000); // 3 seconds inactivity -> Peek Mode
        }
    };

    useEffect(() => {
        resetIdleTimer();
        return () => clearTimeout(idleTimerRef.current);
    }, [isOpen, isDraggable]);

    // --- Scroll Logic ---
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // --- Message Handling ---
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // DELAY for "Thinking" feel
        // We use a promise to ensure at least 1s delay but allow async work
        await new Promise(r => setTimeout(r, 600));

        // 1. Try Local Logic First (Navigation / Small Talk)
        const localResponse = generateResponse(userMsg.text, lastContext);

        // 2. If Fallback & Has Key -> Use AI
        if (localResponse.fallback && apiKey) {
            const aiText = await callGeminiAI(userMsg.text);
            if (aiText) {
                setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: aiText }]);
                setIsTyping(false);
                return;
            }
        }

        // 3. Local Response (or Fallback if no AI)
        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            type: 'bot',
            text: localResponse.text,
            action: localResponse.action
        }]);

        if (localResponse.newContext) setLastContext(localResponse.newContext);

        if (localResponse.forceNavigate) {
            setTimeout(() => {
                navigate(localResponse.forceNavigate);
            }, 1500);
        }

        setIsTyping(false);
    };

    // --- Intelligence Engine ---
    const generateResponse = (text, currentContextId) => {
        const lower = text.trim().toLowerCase();

        // 0. NAME CAPTURE PATTERN
        const nameMatch = lower.match(/(my name is|i am|call me)\s+([a-z\s]+)/i);
        if (nameMatch) {
            const extractedName = nameMatch[2].split(' ')[0]; // Get first name
            const capitalized = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
            localStorage.setItem('aws_user_name', capitalized);
            setUserName(capitalized);
            return { text: `Nice to meet you, ${capitalized}! 🤝 I'll remember that.` };
        }

        // 1. COMPLEX CONVERSATIONAL PATTERNS (The "Simulated AI" Feel)
        const prefix = userName ? `${userName}` : 'there';

        const conversationRules = [
            { patterns: [/^(hi|hello|hey|yo|greetings)/], response: `Hi ${prefix}! 👋 How can I help you with AWS today?` },
            { patterns: [/how are you/, /how (is|'s) it going/], response: `I'm functioning at 100% efficiency, ${userName ? userName : 'buddy'}! 🚀 Thanks for asking. How are you?` },
            { patterns: [/who are you/, /what are you/, /your name/], response: "I'm the AWS Cloud Assistant. I live in this website to help you learn and navigate!" },
            { patterns: [/good (morning|afternoon|evening)/], response: `Good ${lower.includes('morning') ? 'morning' : 'day'}, ${userName}! Ready to learn some cloud computing?` },
            { patterns: [/fine/, /good/, /great/, /amazing/, /cool/, /nice/], response: "That's awesome! 🎉 Positive vibes only. Want to check out the Galaxy?" },
            { patterns: [/bye/, /goodbye/, /see you/, /later/], response: `Goodbye ${userName}! 👋 Happy learning!` },
            { patterns: [/thank/, /thx/], response: `You're welcome ${userName}! 🚀 Happy to help.` },
            { patterns: [/author/, /creator/, /made you/, /built you/, /developer/], response: "I was built by the awesome Mohan Abhishek, the Lead Space Architect! 🚀💻" },
            { patterns: [/joke/], response: "Why do Cloud Engineers use umbrellas? ☔ Because of the heavy 'Cloud' cover! (Sorry, I tried 😅)" },
            { patterns: [/real/, /human/, /person/], response: "I'm a virtual assistant, but I try to be as helpful as a real human! 🤖" },
            { patterns: [/yeah/, /yes/, /sure/, /ok/], response: "Great! What would you like to explore first? The Galaxy or specific services?" },
            { patterns: [/(will|can) you help/, /i need help/], response: "Absolutely! I can explain services, navigate you to pages, or tell jokes. Just ask!" },
            { patterns: [/boring/, /bored/], response: "Bored? Try the **Job Simulator**! It's super interactive and fun. 🎮", action: { label: "Go to Simulator", link: "/job-simulator" } },
            { patterns: [/weather/], response: "I'm in the cloud, so it's always partly cloudy with a chance of data streams! ☁️" },
            { patterns: [/cloud/], response: "The Cloud is just someone else's computer... but much cooler and scalable! 🖥️" },
            // NEW: Platform Overview
            { patterns: [/website/, /app/, /platform/, /this site/, /explain everything/, /what (can|do) i do/], response: "This is the **AWS God-Tier Learning Platform**! 🚀\n\nHere's what you can do:\n- **Galaxy**: Fly through a 3D universe of services.\n- **Simlator**: Fix real cloud problems.\n- **Arena**: Battle others in quizzes.\n- **Builder**: Draw your own architectures.\n\nAsk me to 'Explain the Arena' or 'Go to Galaxy' to get started!", action: { label: "Explore Galaxy", link: "/galaxy" } }
        ];

        // Check patterns first
        for (const rule of conversationRules) {
            if (rule.patterns.some(p => lower.match(p))) {
                return rule.action ? { text: rule.response, action: rule.action } : { text: rule.response };
            }
        }

        // 2. IMMEDIATE NAVIGATION (Action Oriented)
        // Detects: "go to", "take me to", "navigate to", "show me", "open"
        const navIntent = lower.match(/(go to|navigate to|take me to|show me|open)\s+(.+)/);

        if (navIntent) {
            const target = navIntent[2]; // The "galaxy", "ec2", "home" part

            // Check Site Features
            const feature = siteFeatures.find(f => f.keywords.some(k => target.includes(k)));
            if (feature) {
                return {
                    text: `Sure thing! 🚀 Warping you to **${feature.name}**...`,
                    forceNavigate: feature.path
                };
            }

            // Check Services
            const service = services.find(s => target.includes(s.id) || target.includes(s.name.toLowerCase()));
            if (service) {
                return {
                    text: `Opening details for **${service.name}**...`,
                    forceNavigate: `/services?q=${service.id}`
                };
            }
        }

        // 3. CONTEXT FOLLOW-UP ("Tell me more")
        if (currentContextId && (lower.includes('more') || lower.includes('explain') || lower.includes('example') || lower.includes('detail'))) {
            const service = services.find(s => s.id === currentContextId);
            if (service) {
                return {
                    text: `Here's deeper insight into ${service.name}:\n\n💡 **Analogy**: ${service.analogy}\n\n🛠️ **Use Cases**: ${service.useCases.join(', ')}`,
                    newContext: service.id
                };
            }
        }

        // 4. KNOWLEDGE LOOKUP (Service details)
        const foundService = services.find(s => lower.includes(s.id) || lower.includes(s.name.toLowerCase()));
        if (foundService) {
            let replyText = `${foundService.name}: ${foundService.description}`;

            if (lower.includes('price') || lower.includes('cost')) {
                replyText = `💰 **Pricing**: ${foundService.pricing}`;
            } else if (lower.includes('use') || lower.includes('when')) {
                replyText = `🛠️ **Use Cases**: ${foundService.useCases.join(', ')}`;
            }

            return {
                text: replyText,
                action: { label: `Go to ${foundService.name}`, link: `/services?q=${foundService.id}` },
                newContext: foundService.id // Set context
            };
        }

        // 5. FEATURE LOOKUP (Description only, no "go to" command)
        const foundFeature = siteFeatures.find(f => f.keywords.some(k => lower.includes(k)));
        if (foundFeature) {
            return {
                text: `${foundFeature.name}: ${foundFeature.desc}`,
                action: { label: `Go to ${foundFeature.name}`, link: foundFeature.path }
            };
        }

        // 6. FALLBACK - Softer Message or AI Handover
        return {
            fallback: true, // Signal to try AI
            text: "I didn't quite catch that. 🤔 You can say 'Go to Galaxy', 'What is EC2?', or simply 'Hi'!",
            action: { label: "Browse Services", link: "/services" }
        };
    };

    // --- Gemini AI Integration ---
    const callGeminiAI = async (prompt) => {
        if (!apiKey) return null;

        try {
            const systemPrompt = `You are the AWS Cloud Assistant for a learning website. Your creator is Mohan Abhishek. 
            Keep answers concise (under 80 words), friendly, and emoji-rich. 
            User's name is ${userName || 'Friend'}. 
            Context: The user is asking about AWS. Answer their question directly.`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }] }]
                })
            });

            const data = await response.json();
            const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            return aiText || null;
        } catch (error) {
            console.error("AI Error:", error);
            return "My cloud connection is a bit fuzzy right now! ☁️ Try again later.";
        }
    };

    const handleActionClick = (link) => {
        navigate(link);
    };

    const handleSaveKey = (key) => {
        localStorage.setItem('gemini_api_key', key);
        setApiKey(key);
        setShowSettings(false);
        setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: "Brain upgrade successful! 🧠 I can now answer almost anything about AWS!" }]);
    };

    return (
        <motion.div
            drag={isDraggable}
            dragMomentum={false}
            dragConstraints={{ left: -window.innerWidth + 100, right: 0, top: -window.innerHeight + 100, bottom: 0 }}
            onDragStart={() => setDragActive(true)}
            onDragEnd={() => setDragActive(false)}
            onMouseEnter={resetIdleTimer}
            onMouseLeave={resetIdleTimer}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column-reverse',
                alignItems: 'flex-end',
                gap: '20px',
                pointerEvents: 'none' // Allow clicks to pass through to buttons but not the whole area
            }}
        >
            {/* The FAB is the handle in this case */}
            <div style={{ pointerEvents: 'auto', position: 'relative' }}>
                {/* Drag Handle Indicator */}
                <AnimatePresence>
                    {isDraggable && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            style={{
                                position: 'absolute',
                                top: '-25px',
                                right: '0',
                                background: 'white',
                                color: 'black',
                                padding: '2px 10px',
                                borderRadius: '10px',
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                whiteSpace: 'nowrap',
                                boxShadow: '0 4px 10px rgba(0,243,255,0.4)',
                                border: '1px solid var(--neon-blue)',
                                zIndex: 10000
                            }}
                        >
                            MOVE MODE: DBL-CLICK TO LOCK
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => !dragActive && setIsOpen(!isOpen)}
                    onMouseDown={handleDoubleTap}
                    animate={{
                        x: (isIdle && !isOpen && !isDraggable) ? 50 : 0,
                        opacity: (isIdle && !isOpen && !isDraggable) ? 0.5 : 1,
                        scale: isDraggable ? 1.1 : 1,
                    }}
                    whileHover={{ scale: 1.1, x: isDraggable ? 0 : -5 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: isOpen ? '#333' : (isDraggable ? 'black' : 'var(--neon-blue)'),
                        border: isDraggable ? '3px solid var(--neon-blue)' : '2px solid rgba(255,255,255,0.2)',
                        boxShadow: isDraggable ? '0 0 30px var(--neon-blue)' : (isOpen ? 'none' : '0 0 20px var(--neon-blue)'),
                        color: (isOpen || isDraggable) ? 'white' : 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: isDraggable ? 'move' : 'pointer',
                        outline: 'none',
                        transition: 'background 0.3s, border 0.3s'
                    }}
                >
                    {isOpen ? <Minimize2 size={24} /> : (isDraggable ? <Settings className="animate-spin-slow" size={28} /> : <Bot size={32} />)}
                </motion.button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            pointerEvents: 'auto',
                            width: '360px',
                            height: '520px',
                            background: 'rgba(10, 10, 15, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '24px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '16px 20px',
                            background: 'rgba(255,255,255,0.03)',
                            borderBottom: '1px solid var(--glass-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    background: 'var(--neon-blue)', color: 'black',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>AWS Assistant</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#00FF99' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FF99' }}></span>
                                        Online
                                    </div>
                                </div>
                            </div>

                            {/* Settings Icon */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: apiKey ? '#00FF99' : '#666',
                                        cursor: 'pointer',
                                        padding: '4px'
                                    }}
                                    title="AI Settings"
                                >
                                    <Settings size={18} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#888',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Settings Panel */}
                        {showSettings && (
                            <div style={{
                                padding: '20px',
                                background: 'rgba(20,20,30,0.95)',
                                borderBottom: '1px solid var(--glass-border)',
                                animation: 'fadeIn 0.2s'
                            }}>
                                <h4 style={{ margin: '0 0 10px 0', color: 'white' }}>🧠 Supercharge your Bot</h4>
                                <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '12px' }}>
                                    Add your free <strong>Google Gemini API Key</strong> to enable real AI responses.
                                </p>
                                <input
                                    type="password"
                                    placeholder="Paste API Key here..."
                                    defaultValue={apiKey}
                                    onBlur={(e) => handleSaveKey(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid #333',
                                        background: 'black',
                                        color: 'white',
                                        marginBottom: '8px'
                                    }}
                                />
                                <div style={{ fontSize: '0.75rem', color: '#666' }}>
                                    Key is stored locally in your browser.
                                </div>
                            </div>
                        )}

                        {/* Messages Area */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            {messages.map(msg => (
                                <div key={msg.id} style={{
                                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%'
                                }}>
                                    <div style={{
                                        background: msg.type === 'user' ? 'var(--neon-blue)' : 'rgba(255,255,255,0.08)',
                                        color: msg.type === 'user' ? 'black' : 'rgba(255,255,255,0.9)',
                                        padding: '12px 16px',
                                        borderRadius: '18px',
                                        borderBottomRightRadius: msg.type === 'user' ? '4px' : '18px',
                                        borderTopLeftRadius: msg.type === 'bot' ? '4px' : '18px',
                                        lineHeight: '1.5',
                                        fontSize: '0.95rem'
                                    }}>
                                        {msg.text.split('\n').map((line, i) => (
                                            <p key={i} style={{ margin: 0, marginBottom: line ? '8px' : 0 }}>
                                                {line}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Action Button */}
                                    {msg.action && (
                                        <motion.button
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onClick={() => handleActionClick(msg.action.link)}
                                            style={{
                                                marginTop: '8px',
                                                background: 'transparent',
                                                border: '1px solid var(--neon-blue)',
                                                color: 'var(--neon-blue)',
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem',
                                                fontWeight: 500,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                            whileHover={{ background: 'rgba(0, 243, 255, 0.1)', x: 5 }}
                                        >
                                            {msg.action.label} <ArrowRight size={14} />
                                        </motion.button>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '18px', borderTopLeftRadius: '4px' }}>
                                    <motion.div
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        style={{ display: 'flex', gap: '4px' }}
                                    >
                                        <span style={{ width: '6px', height: '6px', background: '#ccc', borderRadius: '50%' }}></span>
                                        <span style={{ width: '6px', height: '6px', background: '#ccc', borderRadius: '50%' }}></span>
                                        <span style={{ width: '6px', height: '6px', background: '#ccc', borderRadius: '50%' }}></span>
                                    </motion.div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} style={{
                            padding: '16px',
                            background: 'rgba(0,0,0,0.3)',
                            borderTop: '1px solid var(--glass-border)',
                            display: 'flex',
                            gap: '10px'
                        }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about EC2, S3..."
                                style={{
                                    flex: 1,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '24px',
                                    padding: '12px 20px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.95rem'
                                }}
                            />
                            <motion.button
                                type="submit"
                                whileTap={{ scale: 0.9 }}
                                disabled={!input.trim()}
                                style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '50%',
                                    background: input.trim() ? 'var(--neon-blue)' : '#333',
                                    color: input.trim() ? 'black' : '#666',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: input.trim() ? 'pointer' : 'default',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Send size={20} />
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
