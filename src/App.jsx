import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { ServiceModal } from './components/ServiceModal';
import { IntroOverlay } from './components/IntroOverlay';
import { Footer } from './components/Footer';
import { ChatAssistant } from './components/ChatAssistant';


// Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { LearningPaths } from './pages/LearningPaths';
import { Cheatsheets } from './pages/Cheatsheets';
import { Community } from './pages/Community';
import { Arena } from './pages/Arena';
import { About } from './pages/About';
import { CertificatePage } from './pages/CertificatePage';
import { JobSimulator } from './pages/JobSimulator';
import { Galaxy } from './pages/Galaxy';
import { RegionGlobe } from './pages/RegionGlobe';
import { ArchitectureBuilder } from './pages/ArchitectureBuilder';

function App() {
    const [showIntro, setShowIntro] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedService, setSelectedService] = useState(null);

    // Reset search when location changes
    const location = useLocation();

    // URL Query Param sync
    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q');
        if (q) {
            setSearchTerm(q);
        } else if (location.pathname !== '/services') {
            setSearchTerm(''); // Clear if navigating elsewhere
        }
        window.scrollTo(0, 0);
    }, [location]);

    // Immersive routes (No Navbar/Footer)
    const isImmersive = ['/builder', '/galaxy', '/globe'].includes(location.pathname);

    return (
        <div className="app-main">
            <IntroOverlay onComplete={() => setShowIntro(false)} />
            {!isImmersive && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={
                    <Services
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        searchTerm={searchTerm}
                        onSelectService={setSelectedService}
                    />
                } />
                <Route path="/learning-paths" element={<LearningPaths />} />
                <Route path="/cheatsheets" element={<Cheatsheets />} />
                <Route path="/community" element={<Community />} />
                <Route path="/about" element={<About />} />
                <Route path="/arena" element={<Arena />} />
                <Route path="/certificate" element={<CertificatePage />} />
                <Route path="/job-simulator" element={<JobSimulator />} />
                <Route path="/galaxy" element={<Galaxy />} />
                <Route path="/globe" element={<RegionGlobe />} />
                <Route path="/builder" element={<ArchitectureBuilder />} />
            </Routes>

            <AnimatePresence>
                {selectedService && (
                    <ServiceModal
                        service={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>

            {!showIntro && <ChatAssistant />}


            {!isImmersive && <Footer />}
        </div>
    );
}

export default App;
