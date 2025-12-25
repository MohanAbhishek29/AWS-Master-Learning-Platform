// Mock Data
const siteFeatures = [
    { id: 'galaxy', keywords: ['galaxy'], name: 'Service Galaxy', path: '/galaxy', desc: 'Galaxy Desc' },
    { id: 'simulator', keywords: ['simulator'], name: 'Job Simulator', path: '/job-simulator', desc: 'Simulator Desc' }
];

const services = [
    { id: 'ec2', name: 'Amazon EC2', description: 'Virtual Servers', pricing: 'Pay per hour', useCases: ['Web Servers'] }
];

// The EXACT logic from ChatAssistant.jsx (simplified for Node)
const generateResponse = (text, currentContextId) => {
    const lower = text.toLowerCase();

    // 1. SMALL TALK
    if (lower === 'hi' || lower === 'hello' || lower === 'hey') {
        return { text: "Hi there! 👋 How can I help you with AWS today?" };
    }
    if (lower.includes('joke')) return { text: "Why do Cloud Engineers use umbrellas? ☔ Because of the heavy 'Cloud' cover! (Sorry, I tried 😅)" };
    if (lower.includes('bye')) return { text: "Goodbye! 👋 Happy learning! I'll be here if you need anything else." };

    // 2. NAV INTENT
    const navIntent = lower.match(/(go to|navigate to|take me to|show me|open)\s+(.+)/);
    if (navIntent) {
        const target = navIntent[2];
        const feature = siteFeatures.find(f => f.keywords.some(k => target.includes(k)));
        if (feature) return { text: `Warping to ${feature.name}`, forceNavigate: feature.path };
    }

    return { text: "Fallback" };
};

// Test Cases
console.log("Testing 'hi':", generateResponse("hi"));
console.log("Testing 'joke':", generateResponse("tell me a joke"));
console.log("Testing 'bye':", generateResponse("bye"));
console.log("Testing 'go to galaxy':", generateResponse("go to galaxy"));
