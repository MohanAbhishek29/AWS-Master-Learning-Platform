import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, MessageCircle, Share2, Star, Zap, Hash, Search,
    Filter, ArrowRight, Heart, Download, Crown, TrendingUp, Radio, X, Trophy, Medal, User, FileImage, Layers, Database, Cpu, Globe, Cloud, Shield, Activity, Terminal, ExternalLink, Inbox, Server, HardDrive, Cpu as CpuIcon, Wifi, Workflow, Bell, ZapOff, BrainCircuit, Bot, Boxes, Lock, Repeat
} from 'lucide-react';
import { Link } from 'react-router-dom';

const INITIAL_SCHEMATICS = [
    { id: 1, title: 'Serverless E-Commerce', author: 'CloudMaster', likes: 245, isLiked: false, type: 'Serverless', complexity: 'High', description: 'A highly scalable web store using Lambda, DynamoDB, and Cognito.' },
    { id: 2, title: 'Multi-Region HA', author: 'DevOpsPro', likes: 189, isLiked: false, type: 'Network', complexity: 'Extreme', description: 'Active-Active deployment across Global regions with Route53 Failover.' },
    { id: 3, title: 'Data Lake Pipeline', author: 'DataWizard', likes: 156, isLiked: true, type: 'Analytics', complexity: 'Medium', description: 'Streaming data ingestion with Kinesis and Glue ETl processing.' },
    { id: 4, title: 'Microservices Mesh', author: 'KubeKing', likes: 134, isLiked: false, type: 'Compute', complexity: 'High', description: 'EKS cluster with App Mesh for fine-grained traffic control.' },
    { id: 5, title: 'Basic VPC Setup', author: 'JuniorDev', likes: 98, isLiked: false, type: 'Network', complexity: 'Low', description: 'Standard Public/Private subnet configuration with NAT Gateway.' },
    { id: 6, title: 'IoT Fleet Monitor', author: 'SensorGuy', likes: 87, isLiked: false, type: 'IoT', complexity: 'Medium', description: 'Real-time device tracking using IoT Core and Timestream.' },
    { id: 7, title: 'Zero-Trust Auth', author: 'InfosecExpert', likes: 312, isLiked: false, type: 'Security', complexity: 'Extreme', description: 'Comprehensive security mesh using Verified Access and OIDC.' },
    { id: 8, title: 'Bedrock AI Agent', author: 'AI_Alchemist', likes: 423, isLiked: true, type: 'AI/ML', complexity: 'High', description: 'Autonomous agent using Claude 3 and Knowledge Bases for Bedrock.' },
    { id: 9, title: 'Global Edge Cache', author: 'FastContent', likes: 167, isLiked: false, type: 'Network', complexity: 'Medium', description: 'Optimized CloudFront distribution with Lambda@Edge logic.' },
    { id: 10, title: 'Batch Video Transcoder', author: 'MediaHero', likes: 145, isLiked: false, type: 'Compute', complexity: 'High', description: 'Massive parallel video processing using AWS Batch and S3.' },
    { id: 11, title: 'Real-time Game Backend', author: 'GamerDev', likes: 289, isLiked: false, type: 'Serverless', complexity: 'High', description: 'Low-latency backend with AppSync, ElastiCache, and DynamoDB.' },
    { id: 12, title: 'Disaster Recovery Warm Standby', author: 'ResiliencyPro', likes: 212, isLiked: false, type: 'Network', complexity: 'Extreme', description: 'Automated failover architecture between primary and secondary regions.' },
    { id: 13, title: 'ML Training Pipeline', author: 'SageMaker_Master', likes: 198, isLiked: false, type: 'AI/ML', complexity: 'Medium', description: 'End-to-end ML training using SageMaker Pipelines and Step Functions.' },
    { id: 14, title: 'Hybrid Cloud VPN', author: 'InfraGenius', likes: 134, isLiked: false, type: 'Network', complexity: 'High', description: 'Secure Site-to-Site VPN bridge between On-Premise and AWS VPC.' },
    { id: 15, title: 'Blockchain Ledger', author: 'CryptoNova', likes: 156, isLiked: false, type: 'Analytics', complexity: 'Medium', description: 'Immutable transaction tracking using Amazon Managed Blockchain.' },
    { id: 16, title: 'Serverless SSR App', author: 'NextJsKing', likes: 278, isLiked: true, type: 'Serverless', complexity: 'Medium', description: 'Next.js application deployed using AWS Amplify and OpenNext.' },
    { id: 17, title: 'Enterprise Transit Gateway', author: 'NetworkGuru', likes: 189, isLiked: false, type: 'Network', complexity: 'Extreme', description: 'Centralized network hub for connecting multiple VPCs and Accounts.' },
    { id: 18, title: 'Event-Driven Chat', author: 'PubSubWizard', likes: 245, isLiked: false, type: 'Serverless', complexity: 'High', description: 'Scalable real-time chat using EventBridge and WebSockets.' },
    { id: 19, title: 'Predictive Maintenance IoT', author: 'SmartFactory', likes: 167, isLiked: false, type: 'IoT', complexity: 'Extreme', description: 'Edge computing and predictive modeling with Lookout for Equipment.' },
    { id: 20, title: 'Cloud-Native SIEM', author: 'SafeGuard', likes: 345, isLiked: false, type: 'Security', complexity: 'High', description: 'Security monitoring using GuardDuty, Security Hub, and OpenSearch.' },
    { id: 21, title: 'Data Mesh Governance', author: 'LakehouseLead', likes: 123, isLiked: false, type: 'Analytics', complexity: 'Extreme', description: 'Decentralized data architecture using Lake Formation and Glue.' },
    { id: 22, title: 'Fargate Auto-scaler', author: 'ContainerQueen', likes: 178, isLiked: false, type: 'Compute', complexity: 'Medium', description: 'Fine-tuned ECS Fargate scaling based on custom CloudWatch metrics.' },
    { id: 23, title: 'AI Personalized Recs', author: 'PersonaPro', likes: 234, isLiked: false, type: 'AI/ML', complexity: 'High', description: 'Recommendation engine using Amazon Personalize and Pinpoint.' },
    { id: 24, title: 'Secret Rotation Schema', author: 'KeystoreKing', likes: 190, isLiked: false, type: 'Security', complexity: 'Medium', description: 'Automatic rotation for RDS credentials using Secrets Manager.' },
    { id: 25, title: 'Serverless Analytics Bot', author: 'LexWizard', likes: 167, isLiked: false, type: 'AI/ML', complexity: 'Medium', description: 'Interact with your data using Amazon Lex and Quicksight APIs.' },
];

const TOP_ENGINEERS = [
    { rank: 1, name: 'Abhi', points: 28450, spec: 'Master Architect', location: 'India', badges: ['Elite', 'Certified'] },
    { rank: 2, name: 'SarahConnor', points: 15420, spec: 'Security Spec', location: 'USA', badges: ['Guardian'] },
    { rank: 3, name: 'NeoAnderson', points: 14200, spec: 'Fullstack Dev', location: 'Zion', badges: ['The One'] },
    { rank: 4, name: 'CloudMaster', points: 12100, spec: 'Serverless Expert', location: 'UK', badges: ['Pioneer'] },
    { rank: 5, name: 'DevOpsPro', points: 11050, spec: 'CI/CD Ninja', location: 'Japan', badges: ['Speedster'] },
];

const LIVE_TOPICS = [
    { id: 1, title: "BREAKING: AWS announces Quantum Ledger v2", count: '12.4k', author: '@S3Killer', time: '2m ago' },
    { id: 2, title: "Bedrock Agents now support recursive reasoning", count: '8.2k', author: '@AIMaster', time: '15m ago' },
    { id: 3, title: "S3 Express One Zone: Real-world benchmarks", count: '5.1k', author: '@DataNinja', time: '1h ago' },
    { id: 4, title: "Kubernetes vs. Fargate: The 2025 Verdict", count: '3.9k', author: '@K8SPro', time: '3h ago' },
];

const COMMUNITY_ACTIVITIES = [
    { id: 1, user: 'Abhi', action: 'ranked up to', item: 'Platinum Architect', time: '2m ago', type: 'rank' },
    { id: 2, user: 'Sarah', action: 'published', item: 'Zero-Trust VPC', time: '12m ago', type: 'publish' },
    { id: 3, user: 'Neo', action: 'unlocked', item: 'The One Badge', time: '45m ago', type: 'badge' },
    { id: 4, user: 'DevOpsPro', action: 'merged', item: 'Global Failover PR', time: '1h ago', type: 'code' },
    { id: 5, user: 'CloudMaster', action: 'shared', item: 'Cost Optimizer v2', time: '2h ago', type: 'share' },
    { id: 6, user: 'JuniorDev', action: 'earned', item: 'First Schematic Like', time: '3h ago', type: 'event' },
];

export const Community = () => {
    const [view, setView] = useState('hub');
    const [filter, setFilter] = useState('All');
    const [schematics, setSchematics] = useState(INITIAL_SCHEMATICS);
    const [selectedBlueprint, setSelectedBlueprint] = useState(null);

    const toggleLike = (id) => {
        setSchematics(prev => prev.map(item => item.id === id ? { ...item, likes: item.isLiked ? item.likes - 1 : item.likes + 1, isLiked: !item.isLiked } : item));
    };

    const downloadBlueprintImage = (item) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1200; canvas.height = 800;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#0a1118'; ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Technical Grid
        ctx.strokeStyle = 'rgba(0, 163, 255, 0.05)'; ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
        for (let y = 0; y < canvas.height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

        // Primary Border
        ctx.strokeStyle = '#00A3FF'; ctx.lineWidth = 4; ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        // Header Details
        ctx.fillStyle = '#fff'; ctx.font = 'bold 54px Inter'; ctx.fillText(item.title.toUpperCase(), 80, 120);
        ctx.fillStyle = '#00A3FF'; ctx.font = 'bold 16px Inter'; ctx.fillText(`[ SCHEMATIC_REV_04 ] ID: ${item.id}00-AWS-SEC`, 80, 155);
        ctx.fillStyle = '#445566'; ctx.font = '14px monospace'; ctx.fillText(`AUTH: @${item.author.toUpperCase()} | REGION: GLOBAL | COMP: ${item.complexity.toUpperCase()}`, 80, 180);

        // Node Drawing Helper
        const drawNodeOnCanvas = (x, y, label, color, large = false) => {
            const size = large ? 110 : 80;
            const rx = x - size / 2;
            const ry = y - size / 2;

            // Outer Box with Glow
            ctx.shadowBlur = 15; ctx.shadowColor = color;
            ctx.strokeStyle = color; ctx.lineWidth = 3;
            ctx.strokeRect(rx, ry, size, size);
            ctx.shadowBlur = 0;

            // Fill
            ctx.fillStyle = 'rgba(10, 17, 24, 0.9)'; ctx.fillRect(rx, ry, size, size);

            // Label
            ctx.fillStyle = color; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'center';
            ctx.fillText(label.toUpperCase(), x, y + size / 2 + 25);

            // Symbol placeholder
            ctx.font = '30px Inter'; ctx.fillText('◆', x, y + 10);
        };

        const drawFlow = (x1, y1, x2, y2, color) => {
            ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash([8, 4]);
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]);
        };

        // Layout Config
        const cx = canvas.width / 2;
        const cy = canvas.height / 2 + 60;

        switch (item.type) {
            case 'Serverless':
                drawNodeOnCanvas(cx - 300, cy, 'Edge/User', '#ff9900');
                drawFlow(cx - 240, cy, cx - 60, cy, '#ff4444');
                drawNodeOnCanvas(cx, cy, 'Lambda', '#ff4444', true);
                drawFlow(cx + 60, cy, cx + 240, cy, '#00A3FF');
                drawNodeOnCanvas(cx + 300, cy, 'DynamoDB', '#00A3FF');
                break;
            case 'Network':
                drawNodeOnCanvas(cx, cy - 180, 'IGW/VPC', '#00A3FF');
                ctx.strokeStyle = '#333'; ctx.setLineDash([10, 5]); ctx.strokeRect(cx - 350, cy - 100, 700, 220);
                drawNodeOnCanvas(cx - 220, cy + 10, 'Subnet-A', '#4cd964');
                drawNodeOnCanvas(cx, cy + 10, 'Subnet-B', '#4cd964');
                drawNodeOnCanvas(cx + 220, cy + 10, 'Subnet-C', '#4cd964');
                break;
            case 'Analytics':
                drawNodeOnCanvas(cx - 250, cy, 'Ingest', '#ff9500');
                drawFlow(cx - 190, cy, cx - 60, cy, '#007aff');
                drawNodeOnCanvas(cx, cy, 'Kinesis', '#007aff', true);
                drawFlow(cx + 60, cy, cx + 190, cy, '#4cd964');
                drawNodeOnCanvas(cx + 250, cy, 'Redshift', '#4cd964');
                break;
            case 'Compute':
                drawNodeOnCanvas(cx - 200, cy, 'Cluster', '#007aff', true);
                drawFlow(cx - 130, cy - 50, cx + 130, cy - 80, '#00A3FF');
                drawNodeOnCanvas(cx + 200, cy - 80, 'Node-01', '#00A3FF');
                drawNodeOnCanvas(cx + 200, cy + 80, 'Node-02', '#00A3FF');
                break;
            case 'IoT':
                drawNodeOnCanvas(cx, cy, 'IoT Core', '#ff4444', true);
                drawFlow(cx, cy - 55, cx - 180, cy - 100, '#666');
                drawNodeOnCanvas(cx - 220, cy - 110, 'Device-A', '#666');
                drawFlow(cx, cy - 55, cx + 180, cy - 100, '#666');
                drawNodeOnCanvas(cx + 220, cy - 110, 'Device-B', '#666');
                break;
            case 'Security':
                drawNodeOnCanvas(cx - 200, cy, 'WAF/Shield', '#ff4444', true);
                drawFlow(cx - 130, cy, cx + 200, cy, '#4cd964');
                drawNodeOnCanvas(cx + 200, cy, 'Origin', '#00A3FF');
                break;
            case 'AI/ML':
                drawNodeOnCanvas(cx - 250, cy, 'Data', '#ff9900');
                drawFlow(cx - 190, cy, cx - 60, cy, '#a855f7');
                drawNodeOnCanvas(cx, cy, 'Bedrock', '#a855f7', true);
                drawFlow(cx + 60, cy, cx + 190, cy, '#00A3FF');
                drawNodeOnCanvas(cx + 250, cy, 'Agent', '#00A3FF');
                break;
            default:
                drawNodeOnCanvas(cx, cy, 'Infrastructure', '#00A3FF', true);
        }

        // Footer Metadata
        ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'right';
        ctx.fillText('GENERATED VIA AWS MASTERCLASS COMMUNITY ENGINE v4.2.1', canvas.width - 60, canvas.height - 60);

        const link = document.createElement('a');
        link.download = `AWS-SCHEMATIC-${item.title.toUpperCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png', 1.0); link.click();
    };

    const BlueprintViewer = ({ blueprint, onClose }) => {
        const renderDiagram = () => {
            switch (blueprint.type) {
                case 'Serverless':
                    return (
                        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}><Node icon={Globe} label="Users" color="#ff9900" /><Node icon={Shield} label="Auth" color="#ff4444" /></div>
                            <div style={{ width: '100px', height: '2px', background: 'linear-gradient(90deg, #ff9900, #ff4444)' }} />
                            <Node icon={Zap} label="Lambda" color="#ff4444" active large />
                            <div style={{ width: '100px', height: '2px', background: 'linear-gradient(90deg, #ff4444, #00A3FF)' }} />
                            <Node icon={Database} label="NoSQL" color="#00A3FF" />
                        </div>
                    );
                case 'Network':
                    return (
                        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '0 40px' }}>
                            <Node icon={Cloud} label="IGW" color="#555" />
                            <div style={{ gridColumn: 'span 3', border: '2px dashed #333', borderRadius: '15px', padding: '20px', display: 'flex', justifyContent: 'space-around' }}>
                                <Node icon={Shield} label="ACL" color="#ff4444" /><Node icon={Server} label="Subnet" color="#4cd964" /><Node icon={Shield} label="SG" color="#ff4444" />
                            </div>
                        </div>
                    );
                case 'Analytics':
                    return (
                        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
                            <Node icon={Activity} label="Stream" color="#ff9500" active /><Node icon={Workflow} label="ETL" color="#007aff" /><Node icon={HardDrive} label="Lake" color="#4cd964" />
                        </div>
                    );
                case 'Compute':
                    return (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => <Node key={i} icon={CpuIcon} label={`pod-${i}`} color="#00A3FF" />)}
                        </div>
                    );
                case 'IoT':
                    return (
                        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><Node icon={Wifi} label="CORE" color="#ff4444" active large /></div>
                            {[0, 1, 2, 3, 4, 5].map(i => {
                                const angle = (i * 60) * (Math.PI / 180);
                                return <div key={i} style={{ position: 'absolute', top: `${50 + 35 * Math.sin(angle)}%`, left: `${50 + 35 * Math.cos(angle)}%`, transform: 'translate(-50%, -50%)' }}><Node icon={Radio} label={`dev-${i}`} color="#666" small /></div>
                            })}
                        </div>
                    );
                case 'Security':
                    return (
                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                            <Node icon={Lock} label="Shield" color="#ff4444" active large />
                            <ArrowRight color="#333" />
                            <Node icon={Shield} label="WAF" color="#ff9500" />
                            <ArrowRight color="#333" />
                            <Node icon={Server} label="Compute" color="#00A3FF" />
                        </div>
                    );
                case 'AI/ML':
                    return (
                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                            <Node icon={BrainCircuit} label="Model" color="#a855f7" active large />
                            <ArrowRight color="#333" />
                            <Node icon={Bot} label="Agent" color="#00A3FF" />
                            <ArrowRight color="#333" />
                            <Node icon={Inbox} label="Output" color="#4cd964" />
                        </div>
                    );
                default:
                    return <Node icon={Zap} label="PROTOTYPE" color="#00A3FF" active large />;
            }
        };

        return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)' }}>
                <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '1200px', height: '85vh', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '32px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 400px', boxShadow: '0 50px 100px rgba(0,0,0,0.5)' }}>
                    <div style={{ padding: '60px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <button onClick={onClose} style={{ position: 'absolute', top: 30, left: 30, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', padding: '10px', borderRadius: '50%' }}><X size={24} /></button>
                        <div style={{ marginTop: '20px' }}><span style={{ fontSize: '0.7rem', color: '#00A3FF', fontWeight: 800, background: 'rgba(0,163,255,0.1)', padding: '4px 12px', borderRadius: '20px' }}>DOC ID: {blueprint.id}00-REV-MAX</span><h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '10px 0' }}>{blueprint.title}</h2></div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1e2a3a', borderRadius: '24px', margin: '30px 0', background: 'radial-gradient(circle at center, #111e2f 0%, #0a1118 100%)' }}>{renderDiagram()}</div>
                    </div>
                    <div style={{ background: 'var(--bg-deep)', padding: '60px', borderLeft: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1 }}><h4 style={{ color: '#555', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '20px' }}>TECHNICAL OVERVIEW</h4><p style={{ color: '#888', lineHeight: '1.8', fontSize: '1rem' }}>{blueprint.description}</p></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <button onClick={() => downloadBlueprintImage(blueprint)} style={{ background: '#00A3FF', color: '#000', padding: '20px', borderRadius: '16px', border: 'none', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}><Download size={20} /> GENERATE HIGH-RES PNG</button>
                            <button style={{ background: 'transparent', color: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #333', fontWeight: 700, cursor: 'pointer' }}>CONTACT ARCHITECT</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

    const Node = ({ icon: Icon, label, color, active, large, small }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: small ? '5px' : '12px' }}>
            <div style={{ width: large ? '110px' : small ? '50px' : '80px', height: large ? '110px' : small ? '50px' : '80px', borderRadius: large ? '30px' : '20px', background: 'var(--bg-card)', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: active ? `0 0 30px ${color}33` : 'none' }}>
                <Icon size={large ? 50 : small ? 24 : 36} color={color} />
            </div>
            {!small && <span style={{ fontSize: large ? '1rem' : '0.8rem', fontWeight: 800, color }}>{label}</span>}
        </div>
    );

    const renderContent = () => {
        if (view === 'engineers') return <EngineersView onBack={() => setView('hub')} />;
        if (view === 'schematics') return <SchematicsView onBack={() => setView('hub')} filter={filter} setFilter={setFilter} schematics={schematics} onSelect={setSelectedBlueprint} toggleLike={toggleLike} downloadBlueprintImage={downloadBlueprintImage} />;
        if (view === 'discussions') return <DiscussionsView onBack={() => setView('hub')} />;
        return (
            <div className="container" style={{ padding: '20px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '30px' }}>Trending Blueprints</h2>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {schematics.slice(0, 5).map(item => <BlueprintCard key={item.id} item={item} onSelect={setSelectedBlueprint} toggleLike={toggleLike} onDownload={() => downloadBlueprintImage(item)} />)}
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div className="pulse-card" style={{ background: 'var(--bg-surface)', padding: '25px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '1rem', color: '#555', margin: 0 }}>COMMUNITY PULSE</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ff4444', fontSize: '0.7rem', fontWeight: 900, animation: 'pulse-glow 2s infinite' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4444' }} /> LIVE</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }} className="activity-scroll">
                                {COMMUNITY_ACTIVITIES.map(act => (
                                    <ActivityRow key={act.id} user={act.user} action={act.action} item={act.item} time={act.time} type={act.type} />
                                ))}
                            </div>
                            <button onClick={() => setView('discussions')} style={{ width: '100%', marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid #333', borderRadius: '12px', color: '#888', fontSize: '0.8rem', cursor: 'pointer' }}>View Full Activity Feed</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-primary)', paddingTop: '80px', fontFamily: '"Inter", sans-serif' }}>
            <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
                <h1 style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '10px' }}>HUB</h1>
                <p style={{ color: '#444', marginBottom: '50px', letterSpacing: '2px' }}>THE ENGINEERING METAVERSE</p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <TabBox icon={Users} label="Engineers" color="#4cd964" active={view === 'engineers'} onClick={() => setView('engineers')} />
                    <TabBox icon={Share2} label="Schematics" color="#00A3FF" active={view === 'schematics'} onClick={() => setView('schematics')} />
                    <TabBox icon={MessageCircle} label="Discussions" color="#ff9500" active={view === 'discussions'} onClick={() => setView('discussions')} />
                </div>
            </div>
            {renderContent()}
            <AnimatePresence>{selectedBlueprint && <BlueprintViewer blueprint={selectedBlueprint} onClose={() => setSelectedBlueprint(null)} />}</AnimatePresence>
            <style>{`
                .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
                @keyframes pulse-glow { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
                .pulse-card { transition: all 0.3s; }
                .pulse-card:hover { border-color: #333; transform: translateY(-5px); }
                .activity-scroll::-webkit-scrollbar { width: 4px; }
                .activity-scroll::-webkit-scrollbar-thumb { background: #222; borderRadius: 4px; }
                .podium-name { font-weight: 950; letter-spacing: 1px; text-transform: uppercase; }
                .podium-xp { font-weight: 900; color: #4cd964; font-family: monospace; }
            `}</style>
        </div>
    );
};

const TabBox = ({ icon: Icon, label, color, active, onClick }) => (
    <motion.div whileHover={{ y: -10 }} onClick={onClick} style={{ width: '180px', padding: '30px 0', background: active ? 'rgba(255,255,255,0.05)' : 'var(--bg-surface)', borderRadius: '24px', cursor: 'pointer', border: '1px solid', borderColor: active ? color : 'var(--glass-border)', transition: 'all 0.3s' }}>
        <Icon size={32} color={active ? color : '#444'} style={{ margin: '0 auto', display: 'block' }} />
        <p style={{ margin: '15px 0 0', fontSize: '0.8rem', fontWeight: 900, color: active ? '#fff' : '#444', letterSpacing: '1px' }}>{label.toUpperCase()}</p>
    </motion.div>
);

const BlueprintCard = ({ item, onSelect, toggleLike, onDownload }) => (
    <div onClick={() => onSelect(item)} style={{ padding: '25px', background: 'var(--bg-surface)', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '50px', height: '50px', background: '#00A3FF11', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap color="#00A3FF" size={24} /></div>
            <div><h4 style={{ margin: 0, fontSize: '1.2rem' }}>{item.title}</h4><p style={{ margin: '4px 0 0', color: '#444', fontSize: '0.8rem' }}>by @{item.author} • {item.type}</p></div>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }} style={{ color: item.isLiked ? '#ff4444' : '#333', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><Heart size={20} fill={item.isLiked ? '#ff4444' : 'none'} /><span style={{ fontWeight: 900 }}>{item.likes}</span></div>
            <button onClick={(e) => { e.stopPropagation(); onDownload(); }} style={{ background: 'rgba(0,163,255,0.1)', border: 'none', color: '#00A3FF', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><Download size={18} /></button>
        </div>
    </div>
);

const EngineersView = ({ onBack }) => (
    <div className="container">
        <button onClick={onBack} style={{ color: '#00A3FF', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}><ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /> EXIT HALL</button>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '20px', height: '480px', marginBottom: '80px', position: 'relative' }}>
            <PodiumSpot rank={2} name="SarahConnor" points="15,420" height="200px" color="#C0C0C0" icon={Shield} />
            <PodiumSpot rank={1} name="Abhi" points="28,450" height="320px" color="#FFD700" crown icon={Crown} large />
            <PodiumSpot rank={3} name="NeoAnderson" points="14,200" height="140px" color="#CD7F32" icon={Zap} />
        </div>

        <div style={{ background: 'var(--bg-surface)', borderRadius: '32px', overflow: 'hidden', padding: '10px', border: '1px solid var(--glass-border)' }}>
            <div style={{ padding: '20px 40px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.7rem', fontWeight: 900 }}>
                <span>RANK & ENGINEER</span>
                <span style={{ textAlign: 'right' }}>ACCUMULATED XP</span>
            </div>
            {TOP_ENGINEERS.map((eng) => (
                <motion.div
                    key={eng.rank}
                    whileHover={{ background: 'rgba(255,255,255,0.02)' }}
                    style={{ display: 'flex', justifyContent: 'space-between', padding: '30px 40px', borderBottom: eng.rank === TOP_ENGINEERS.length ? 'none' : '1px solid #222', transition: 'all 0.2s' }}
                >
                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: 950, color: eng.rank <= 3 ? (eng.rank === 1 ? '#FFD700' : eng.rank === 2 ? '#C0C0C0' : '#CD7F32') : '#333', width: '40px' }}>{eng.rank}</span>
                        <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(255,255,255,0.03)', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={24} color={eng.rank === 1 ? '#FFD700' : '#444'} />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-primary)' }}>{eng.name}</h4>
                            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{eng.spec} • {eng.location}</p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', alignSelf: 'center' }}>
                        <span style={{ fontSize: '1.6rem', fontWeight: 950, color: '#4cd964' }}>{eng.points.toLocaleString()}</span>
                        <p style={{ margin: 0, fontSize: '0.6rem', color: '#444', fontWeight: 900 }}>XP POINTS</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

const PodiumSpot = ({ rank, name, points, height, color, crown, icon: Icon, large }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: rank * 0.2 }}
            style={{ position: 'relative' }}
        >
            {crown && <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} style={{ position: 'absolute', top: -55, left: '50%', transform: 'translateX(-50%)' }}><Crown size={45} color={color} style={{ filter: `drop-shadow(0 0 15px ${color})` }} /></motion.div>}
            <div style={{ width: large ? '120px' : '90px', height: large ? '120px' : '90px', borderRadius: '50%', background: 'var(--bg-surface)', border: `4px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${color}22` }}>
                <Icon size={large ? 50 : 36} color={color} />
            </div>
        </motion.div>

        <div style={{ textAlign: 'center' }}>
            <div className="podium-name" style={{ fontSize: large ? '1.4rem' : '1.1rem', color }}>{name}</div>
            <div className="podium-xp" style={{ fontSize: large ? '1.1rem' : '0.9rem' }}>{points} XP</div>
        </div>

        <motion.div
            initial={{ height: 0 }}
            animate={{ height }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
                width: large ? '150px' : '120px',
                background: `linear-gradient(to bottom, ${color}33 0%, #0a0a0c 100%)`,
                borderRadius: '24px 24px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${color}22`,
                position: 'relative'
            }}
        >
            <span style={{ fontSize: large ? '6rem' : '4rem', fontWeight: 950, color: `${color}08`, lineHeight: 1 }}>{rank}</span>
            {large && <div style={{ position: 'absolute', bottom: 20, color: color, fontSize: '0.7rem', fontWeight: 900, opacity: 0.5 }}>GLOBAL #1</div>}
        </motion.div>
    </div>
);

const SchematicsView = ({ onBack, filter, setFilter, schematics, onSelect, downloadBlueprintImage }) => (
    <div className="container">
        <button onClick={onBack} style={{ color: '#00A3FF', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}><ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /> BACK TO HUB</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 950 }}>BLUEPRINT GALLERY</h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['All', 'Serverless', 'Network', 'Compute', 'Analytics', 'IoT', 'Security', 'AI/ML'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{ padding: '10px 25px', borderRadius: '30px', background: filter === f ? '#00A3FF' : 'var(--bg-surface)', border: 'none', color: filter === f ? '#000' : 'var(--text-secondary)', fontWeight: 900, cursor: 'pointer', transition: 'all 0.2s' }}>{f.toUpperCase()}</button>
                ))}
            </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
            {(filter === 'All' ? schematics : schematics.filter(s => s.type === filter)).map(item => (
                <motion.div
                    key={item.id}
                    whileHover={{ y: -10, borderColor: '#00A3FF33' }}
                    onClick={() => onSelect(item)}
                    style={{ padding: '40px', background: 'var(--bg-surface)', borderRadius: '32px', border: '1px solid var(--glass-border)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}
                >
                    <div style={{ width: '40px', height: '40px', background: '#00A3FF11', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                        {item.type === 'Security' ? <Lock size={20} color="#ff4444" /> : item.type === 'AI/ML' ? <BrainCircuit size={20} color="#a855f7" /> : <Zap size={20} color="#00A3FF" />}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '10px' }}>{item.title}</h3>
                    <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.description}</p>
                    <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#333', fontSize: '0.7rem', fontWeight: 900 }}>@{item.author.toUpperCase()}</span>
                        <button onClick={(e) => { e.stopPropagation(); downloadBlueprintImage(item); }} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}><Download size={18} /></button>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

const DiscussionsView = ({ onBack }) => (
    <div className="container">
        <button onClick={onBack} style={{ color: '#ff9500', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}><ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /> DISENGAGE</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}><h2 style={{ fontSize: '2.5rem', fontWeight: 950, margin: 0 }}>GLOBALCOMMS</h2><div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4444', fontWeight: 900, animation: 'pulse-glow 1s infinite' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff4444' }} /> CONNECTION ACTIVE</div></div>
        <div style={{ gridTemplateColumns: '1fr', display: 'grid', gap: '20px' }}>
            {LIVE_TOPICS.map(topic => (
                <motion.div
                    key={topic.id}
                    whileHover={{ x: 10, background: 'var(--bg-card-hover)' }}
                    style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-surface)', padding: '40px', borderRadius: '32px', border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                            <div style={{ color: '#ff9500', fontWeight: 900, fontSize: '0.7rem' }}>[ TRANSMISSION_ESTABLISHED ]</div>
                            <span style={{ color: '#222' }}>|</span>
                            <span style={{ color: '#555', fontSize: '0.7rem' }}>{topic.time}</span>
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{topic.title}</h3>
                        <p style={{ color: '#444', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><User size={14} /> SOURCE: {topic.author}</p>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '150px' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#ff9500' }}>{topic.count}</div>
                        <div style={{ fontSize: '0.7rem', color: '#333', fontWeight: 900, textTransform: 'uppercase' }}>Interactions</div>
                        <button style={{ marginTop: '20px', padding: '10px 25px', borderRadius: '15px', background: '#ff950011', border: '1px solid #ff950033', color: '#ff9500', fontWeight: 800, cursor: 'pointer' }}>JOIN CHAT</button>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

const ActivityRow = ({ user, action, item, time, type }) => {
    const getIcon = () => {
        switch (type) {
            case 'rank': return <Crown size={14} color="#FFD700" />;
            case 'publish': return <Zap size={14} color="#00A3FF" />;
            case 'badge': return <Star size={14} color="#ff9500" />;
            case 'code': return <Terminal size={14} color="#4cd964" />;
            default: return <Activity size={14} color="#888" />;
        }
    };

    return (
        <motion.div
            whileHover={{ x: 5, background: 'rgba(255,255,255,0.02)' }}
            style={{ display: 'flex', gap: '15px', padding: '12px', borderRadius: '10px', cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s' }}
        >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {getIcon()}
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{user}</span> {action} <span style={{ color: '#00A3FF' }}>{item}</span>
                </p>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 800 }}>{time.toUpperCase()}</div>
            </div>
        </motion.div>
    );
};
