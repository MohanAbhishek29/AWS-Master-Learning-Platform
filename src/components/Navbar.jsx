import React, { useState, useEffect } from 'react';
import { Search, Cloud, BookOpen, Layers, Users, Info, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { services as servicesData } from '../data/aws-services';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Search Logic
    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            const results = servicesData.filter(service =>
                service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5); // Limit to 5
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            height: '80px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            background: scrolled || location.pathname === '/builder' || location.pathname === '/globe' ? 'var(--bg-surface-glass)' : 'transparent',
            backdropFilter: 'blur(20px)',
            borderBottom: scrolled || location.pathname === '/builder' ? '1px solid var(--glass-border)' : '1px solid transparent'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: '40px'
            }}>

                {/* Logo */}
                <Link id="nav-logo" to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div style={{
                        width: '40px', height: '40px',
                        background: 'linear-gradient(135deg, #FF9900 0%, #FFC300 100%)',
                        borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(255, 153, 0, 0.4)'
                    }}>
                        <Cloud color="white" size={24} />
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                        AWS <span style={{ color: 'var(--text-secondary)' }}>Masterclass</span>
                    </span>
                </Link>

                {/* Links - Centered */}
                <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center', justifySelf: 'center' }}>
                    <NavLink id="nav-services" to="/services" icon={Layers} text="Services" active={location.pathname === '/services'} />
                    <NavLink id="nav-paths" to="/learning-paths" icon={BookOpen} text="Paths" active={location.pathname === '/learning-paths'} />
                    <NavLink id="nav-cheats" to="/cheatsheets" icon={Info} text="Cheats" active={location.pathname === '/cheatsheets'} />
                    <NavLink id="nav-arena" to="/arena" icon={null} text="⚔️ Arena" active={location.pathname === '/arena'} />
                    <NavLink id="nav-jobs" to="/job-simulator" icon={null} text="💼 Jobs" active={location.pathname === '/job-simulator'} />
                    <NavLink id="nav-galaxy" to="/galaxy" icon={null} text="🌌 Galaxy" active={location.pathname === '/galaxy'} />
                    <NavLink id="nav-globe" to="/globe" icon={null} text="🌍 Globe" active={location.pathname === '/globe'} />
                    <NavLink id="nav-builder" to="/builder" icon={null} text="🏗️ Builder" active={location.pathname === '/builder'} />
                    <NavLink id="nav-community" to="/community" icon={Users} text="Community" active={location.pathname === '/community'} />
                    <NavLink id="nav-about" to="/about" text="About" active={location.pathname === '/about'} />
                </div>

                {/* Search & Actions - Right Aligned */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifySelf: 'end', position: 'relative' }}>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '50%',
                            width: '40px', height: '40px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            color: theme === 'dark' ? '#FFD600' : '#4A5568',
                            transition: 'all 0.2s'
                        }}
                    >
                        {theme === 'dark' ? <Sun size={20} color={theme === 'dark' ? '#FFD600' : '#4A5568'} /> : <Moon size={20} color={theme === 'dark' ? '#FFD600' : '#4A5568'} />}
                    </button>

                    {/* Global Search Input */}
                    <div id="nav-search" className="glass-panel" style={{
                        display: 'flex', alignItems: 'center',
                        padding: '8px 16px', borderRadius: '100px',
                        border: '1px solid var(--glass-border)',
                        width: '240px',
                        background: searchQuery ? 'var(--bg-card)' : 'var(--glass-highlight)',
                        transition: 'all 0.3s'
                    }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    window.location.href = `/services?q=${e.target.value}`;
                                }
                            }}
                            onBlur={() => setTimeout(() => setSearchQuery(''), 200)} // Delay clearing to allow click
                            style={{
                                background: 'transparent', border: 'none', color: 'var(--text-primary)',
                                marginLeft: '10px', width: '100%', outline: 'none'
                            }}
                        />
                    </div>

                    {/* Search Dropdown */}
                    <AnimatePresence>
                        {searchQuery && searchResults.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="glass-panel"
                                style={{
                                    position: 'absolute',
                                    top: '50px',
                                    right: 0,
                                    width: '300px',
                                    background: 'var(--bg-surface)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '16px',
                                    padding: '8px',
                                    zIndex: 2000,
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                {searchResults.map(result => (
                                    <Link
                                        key={result.id}
                                        to={`/services?id=${result.id}`}
                                        onClick={() => setSearchQuery('')} // Clear on selection
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '12px',
                                            padding: '12px',
                                            textDecoration: 'none',
                                            borderRadius: '8px',
                                            transition: 'background 0.2s'
                                        }}
                                        className="search-result-item"
                                    >
                                        <div style={{ fontSize: '1.5rem' }}>
                                            {result.icon && <result.icon />}
                                        </div>
                                        <div>
                                            <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{result.name}</div>
                                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                                                {result.description}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                <Link
                                    to={`/services?q=${searchQuery}`}
                                    style={{
                                        display: 'block', padding: '12px', textAlign: 'center',
                                        color: 'var(--neon-blue)', fontSize: '0.9rem',
                                        borderTop: '1px solid #333', marginTop: '8px'
                                    }}
                                >
                                    View all results for "{searchQuery}"
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

            </div>
            <style>{`
                .search-result-item:hover {
                    background: rgba(255,255,255,0.05);
                }
            `}</style>
        </nav>
    );
};

const NavLink = ({ id, to, icon: Icon, text, active }) => (
    <Link id={id} to={to} style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: 500,
        transition: 'color 0.2s',
        position: 'relative'
    }}>
        {Icon && <Icon size={16} />}
        {text}
        {active && (
            <motion.div layoutId="nav-underline" style={{
                position: 'absolute', bottom: '-28px', left: 0, right: 0, height: '2px', background: 'var(--neon-blue)'
            }} />
        )}
    </Link>
);
