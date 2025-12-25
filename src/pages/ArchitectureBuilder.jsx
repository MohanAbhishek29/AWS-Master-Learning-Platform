import React, { useState, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import ReactFlow, {
    addEdge, Background, Controls, MiniMap,
    useNodesState, useEdgesState, useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import { toPng, toJpeg } from 'html-to-image';
import {
    ArrowLeft, Save, Trash2, Scan, ZoomIn, ZoomOut, ChevronDown, ChevronRight,
    Server, Database, Cloud, HardDrive, Shield, Activity, Globe, Share2,
    RotateCcw, RotateCw, Box, Layers, Cpu, Lock, Image as ImageIcon, Check
} from 'lucide-react';
import { Handle, Position } from 'reactflow';
import { Link } from 'react-router-dom';
import { services } from '../data/aws-services';

// --- Custom Node Component ---
const TechNode = ({ data = {}, selected }) => {
    const { label = 'Unknown', color = '#fff', type = 'Service' } = data;

    // Icon Mapping
    const getIcon = (lbl) => {
        const l = (lbl || '').toString();
        // Compute
        if (l.includes('EC2') || l.includes('Instance')) return <Server size={18} />;
        if (l.includes('Lambda') || l.includes('Function')) return <Cpu size={18} />;
        if (l.includes('EKS') || l.includes('ECS') || l.includes('Fargate') || l.includes('Container')) return <Box size={18} />;
        // Storage
        if (l.includes('S3') || l.includes('Glacier')) return <HardDrive size={18} />;
        if (l.includes('EBS') || l.includes('EFS') || l.includes('Storage')) return <HardDrive size={18} />;
        // Database
        if (l.includes('RDS') || l.includes('Dynamo') || l.includes('Aurora') || l.includes('Redshift') || l.includes('Database')) return <Database size={18} />;
        if (l.includes('ElastiCache') || l.includes('MemoryDB')) return <Layers size={18} />;
        // Network
        if (l.includes('VPC') || l.includes('Gateway') || l.includes('Direct Connect')) return <Globe size={18} />;
        if (l.includes('Load Balancer') || l.includes('ALB') || l.includes('NLB')) return <Activity size={18} />;
        if (l.includes('Route') || l.includes('DNS') || l.includes('CloudFront')) return <Globe size={18} />;
        // Security
        if (l.includes('IAM') || l.includes('Cognito') || l.includes('Directory')) return <Shield size={18} />;
        if (l.includes('WAF') || l.includes('Shield') || l.includes('Firewall')) return <Lock size={18} />;
        // Integration
        if (l.includes('SNS') || l.includes('SQS') || l.includes('MQ') || l.includes('Event')) return <Share2 size={18} />;
        // Analytics
        if (l.includes('Kinesis') || l.includes('Kafka') || l.includes('Athena') || l.includes('Glue')) return <Activity size={18} />;

        return <Cloud size={18} />;
    };

    return (
        <div style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(8px)',
            border: selected ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '10px',
            minWidth: '160px',
            display: 'flex', flexDirection: 'column', gap: '6px',
            boxShadow: selected ? `0 0 15px ${color}33` : '0 4px 6px rgba(0,0,0,0.2)',
            transition: 'all 0.2s ease-out',
            color: 'var(--text-primary)'
        }}>
            <Handle type="target" position={Position.Top} style={{ background: color, width: '8px', height: '8px' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    background: `${color}15`,
                    padding: '6px', borderRadius: '6px',
                    color: color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {getIcon(label)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase' }}>{type}</span>
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} style={{ background: color, width: '8px', height: '8px' }} />
        </div>
    );
};

const nodeTypes = { techNode: TechNode };

// --- Sidebar Category Component ---
const SidebarCategory = ({ title, color, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div style={{ marginBottom: '5px' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.03)', border: 'none', padding: '8px 12px',
                    color: 'var(--text-primary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px',
                    cursor: 'pointer', borderRadius: '4px', transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.03)'}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }}></div>
                    {title}
                </div>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {isOpen && (
                <div style={{ padding: '5px 0 10px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {children}
                </div>
            )}
        </div>
    );
};

// --- INITIAL DATA ---
const initialNodes = [];
const initialEdges = [];

export const ArchitectureBuilder = () => {
    const { isDarkMode } = useTheme();

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    // UI States
    const [showClearModal, setShowClearModal] = useState(false);
    const [showSaveMenu, setShowSaveMenu] = useState(false);
    const [showZoomMenu, setShowZoomMenu] = useState(false);
    const [transparentBg, setTransparentBg] = useState(false);

    // History
    const [history, setHistory] = useState([{ nodes: initialNodes, edges: initialEdges }]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const saveToHistory = useCallback((newNodes, newEdges) => {
        const currentHistory = history.slice(0, historyIndex + 1);
        setHistory([...currentHistory, { nodes: newNodes, edges: newEdges }]);
        setHistoryIndex(currentHistory.length);
    }, [history, historyIndex]);

    const onConnect = useCallback((params) => {
        setEdges((eds) => {
            const newEdges = addEdge({ ...params, animated: true, style: { stroke: 'var(--text-secondary)' } }, eds);
            saveToHistory(nodes, newEdges);
            return newEdges;
        });
    }, [setEdges, nodes, saveToHistory]);

    const onMove = useCallback((event, viewport) => setZoomLevel(viewport.zoom), []);

    const addNode = useCallback((label, type, color) => {
        const id = Math.random().toString();
        const newNode = {
            id, type: 'techNode',
            position: { x: Math.random() * 300 + 200, y: Math.random() * 300 + 100 },
            data: { label, color, type }
        };
        // Use functional state update ensuring we use latest nodes
        setNodes(currNodes => {
            const newNodes = currNodes.concat(newNode);
            saveToHistory(newNodes, edges);
            return newNodes;
        });
    }, [setNodes, edges, saveToHistory]);

    // --- SERVICE CATALOG VARS ---
    const C_COMPUTE = '#FF9900';
    const C_STORAGE = '#3F8624';
    const C_DB = '#3B48CC';
    const C_NET = '#8C4FFF';
    const C_SEC = '#E02020';
    const C_APP = '#FF4F8B';
    const C_DATA = '#527FFF';

    const handleUndo = () => {
        if (historyIndex > 0) {
            const prevIndex = historyIndex - 1;
            setNodes(history[prevIndex].nodes);
            setEdges(history[prevIndex].edges);
            setHistoryIndex(prevIndex);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const nextIndex = historyIndex + 1;
            setNodes(history[nextIndex].nodes);
            setEdges(history[nextIndex].edges);
            setHistoryIndex(nextIndex);
        }
    };

    // --- DOWNLOAD FUNCTIONALITY ---
    const downloadImage = (format) => {
        const flowViewport = document.querySelector('.react-flow__viewport');
        if (!flowViewport) return;

        const options = {
            backgroundColor: transparentBg && format === 'png' ? null : (isDarkMode ? '#0e0e11' : '#ffffff'),
            width: flowViewport.scrollWidth,
            height: flowViewport.scrollHeight,
            style: { transform: 'translate(0,0) scale(1)' },
        };

        const downloader = format === 'jpeg' ? toJpeg : toPng;
        downloader(flowViewport, options)
            .then((dataUrl) => {
                const a = document.createElement('a');
                a.setAttribute('download', `aws-architecture.${format}`);
                a.setAttribute('href', dataUrl);
                a.click();
                setShowSaveMenu(false);
            })
            .catch((err) => {
                console.error('Download failed', err);
            });
    };

    const clearCanvas = () => setShowClearModal(true);
    const confirmClear = () => {
        setNodes([]); setEdges([]);
        saveToHistory([], []);
        setShowClearModal(false);
    };

    const setSpecificZoom = (lvl) => {
        rfInstance?.zoomTo(lvl, { duration: 500 });
        setShowZoomMenu(false);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-deep)', color: 'var(--text-primary)', position: 'relative', overflow: 'hidden' }} onClick={() => { setShowSaveMenu(false); setShowZoomMenu(false); }}>

            {/* Toolbar (Top Right) */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'absolute', top: 20, right: 24, zIndex: 60,
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'var(--bg-card)', padding: '6px', borderRadius: '12px',
                    border: '1px solid var(--glass-border)', boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                }}
            >
                <button onClick={clearCanvas} title="Clear" className="icon-btn-danger"><Trash2 size={20} /></button>
                <div className="v-sep"></div>
                <button onClick={handleUndo} disabled={historyIndex <= 0} title="Undo" className="icon-btn"><RotateCcw size={20} /></button>
                <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} title="Redo" className="icon-btn"><RotateCw size={20} /></button>
                <div className="v-sep"></div>

                {/* Save Dropdown Trigger */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button
                        onClick={() => setShowSaveMenu(!showSaveMenu)}
                        title="Export"
                        className={`icon-btn ${showSaveMenu ? 'active' : ''}`}
                        style={{ color: showSaveMenu ? '#00A3FF' : '' }}
                    >
                        <Save size={20} />
                    </button>

                    {/* Save Menu */}
                    {showSaveMenu && (
                        <div style={{
                            position: 'absolute', top: '120%', right: 0,
                            background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '8px',
                            width: '220px', padding: '8px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            display: 'flex', flexDirection: 'column', gap: '4px'
                        }}>
                            <div style={{ padding: '4px 8px', fontSize: '0.7rem', color: '#666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Format
                            </div>
                            <button onClick={() => downloadImage('png')} className="menu-item">
                                <ImageIcon size={16} color="#4cd964" /> PNG Image
                            </button>
                            <button onClick={() => downloadImage('jpeg')} className="menu-item">
                                <ImageIcon size={16} color="#ffcc00" /> JPEG Image
                            </button>

                            <div style={{ borderTop: '1px solid #333', margin: '4px 0' }}></div>

                            <div
                                onClick={() => setTransparentBg(!transparentBg)}
                                className="menu-item"
                                style={{ justifyContent: 'space-between' }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '16px', height: '16px', border: '1px solid #555', borderRadius: '4px', background: transparentBg ? '#0073BB' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {transparentBg && <Check size={12} color="white" />}
                                    </div>
                                    Transparent BG
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Clear Modal */}
            {showClearModal && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'absolute', inset: 0, zIndex: 100,
                        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(2px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <div style={{
                        background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px',
                        padding: '24px', width: '300px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                        display: 'flex', flexDirection: 'column', gap: '16px'
                    }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Clear Workspace?</h3>
                        <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>
                            This will remove all nodes and connections. This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button
                                onClick={() => setShowClearModal(false)}
                                style={{
                                    background: 'transparent', border: '1px solid #444', color: '#ccc',
                                    padding: '8px 16px', borderRadius: '6px', cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmClear}
                                style={{
                                    background: '#ff4444', border: 'none', color: 'white',
                                    padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600
                                }}
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
                {/* Slim Scrollable Sidebar */}
                <div style={{
                    width: '280px',
                    background: 'var(--bg-surface)',
                    borderRight: '1px solid var(--glass-border)',
                    display: 'flex', flexDirection: 'column',
                    zIndex: 50,
                    height: '100%',
                    flexShrink: 0
                }}>
                    {/* Back Header Inside Sidebar */}
                    <div style={{ padding: '20px 20px 10px', display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '1px solid #222' }}>
                        <Link to="/" style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            color: 'var(--text-secondary)', textDecoration: 'none',
                            transition: 'all 0.2s', padding: '6px 0', width: 'fit-content'
                        }}>
                            <div style={{ background: 'var(--bg-card)', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                                <ArrowLeft size={16} color="var(--text-primary)" />
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Back to Home</span>
                        </Link>
                        <div>
                            <h1 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
                                Tech Builder
                            </h1>
                            <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: '#666' }}>v2.4 // Stable</p>
                        </div>
                    </div>

                    <div style={{ padding: '15px 20px 10px', fontSize: '0.7rem', fontWeight: 700, color: '#555', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Service Catalog
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 20px' }} className="custom-scrollbar">
                        {/* Categories */}
                        <SidebarCategory title="Compute" color={C_COMPUTE} defaultOpen={true}>
                            <button onClick={() => addNode('EC2 Instance', 'Compute', C_COMPUTE)} className="svc-btn">EC2 Instance</button>
                            <button onClick={() => addNode('Lambda Function', 'Compute', C_COMPUTE)} className="svc-btn">Lambda Function</button>
                            <button onClick={() => addNode('Fargate', 'Compute', C_COMPUTE)} className="svc-btn">Fargate</button>
                            <button onClick={() => addNode('EKS Cluster', 'Compute', C_COMPUTE)} className="svc-btn">EKS Cluster</button>
                            <button onClick={() => addNode('ECS Service', 'Compute', C_COMPUTE)} className="svc-btn">ECS Service</button>
                            <button onClick={() => addNode('Elastic Beanstalk', 'Compute', C_COMPUTE)} className="svc-btn">Elastic Beanstalk</button>
                            <button onClick={() => addNode('Batch Job', 'Compute', C_COMPUTE)} className="svc-btn">AWS Batch</button>
                        </SidebarCategory>

                        <SidebarCategory title="Storage" color={C_STORAGE}>
                            <button onClick={() => addNode('S3 Bucket', 'Storage', C_STORAGE)} className="svc-btn">S3 Bucket</button>
                            <button onClick={() => addNode('EBS Volume', 'Storage', C_STORAGE)} className="svc-btn">EBS Volume</button>
                            <button onClick={() => addNode('EFS File System', 'Storage', C_STORAGE)} className="svc-btn">EFS File System</button>
                            <button onClick={() => addNode('S3 Glacier', 'Storage', C_STORAGE)} className="svc-btn">S3 Glacier</button>
                            <button onClick={() => addNode('Storage Gateway', 'Storage', C_STORAGE)} className="svc-btn">Storage Gateway</button>
                        </SidebarCategory>

                        <SidebarCategory title="Database" color={C_DB}>
                            <button onClick={() => addNode('RDS Instance', 'Database', C_DB)} className="svc-btn">RDS Instance</button>
                            <button onClick={() => addNode('DynamoDB Table', 'Database', C_DB)} className="svc-btn">DynamoDB Table</button>
                            <button onClick={() => addNode('Aurora Cluster', 'Database', C_DB)} className="svc-btn">Aurora Cluster</button>
                            <button onClick={() => addNode('ElastiCache', 'Database', C_DB)} className="svc-btn">ElastiCache (Redis)</button>
                            <button onClick={() => addNode('Redshift', 'Database', C_DB)} className="svc-btn">Redshift Warehouse</button>
                            <button onClick={() => addNode('DocumentDB', 'Database', C_DB)} className="svc-btn">DocumentDB</button>
                        </SidebarCategory>

                        <SidebarCategory title="Networking" color={C_NET}>
                            <button onClick={() => addNode('VPC', 'Network', C_NET)} className="svc-btn">VPC</button>
                            <button onClick={() => addNode('Internet Gateway', 'Network', C_NET)} className="svc-btn">Internet Gateway</button>
                            <button onClick={() => addNode('NAT Gateway', 'Network', C_NET)} className="svc-btn">NAT Gateway</button>
                            <button onClick={() => addNode('ALB', 'Network', C_NET)} className="svc-btn">App Load Balancer</button>
                            <button onClick={() => addNode('NLB', 'Network', C_NET)} className="svc-btn">Net Load Balancer</button>
                            <button onClick={() => addNode('Route 53', 'Network', C_NET)} className="svc-btn">Route 53 DNS</button>
                            <button onClick={() => addNode('CloudFront', 'Network', C_NET)} className="svc-btn">CloudFront CDN</button>
                            <button onClick={() => addNode('API Gateway', 'Network', C_NET)} className="svc-btn">API Gateway</button>
                            <button onClick={() => addNode('Direct Connect', 'Network', C_NET)} className="svc-btn">Direct Connect</button>
                        </SidebarCategory>

                        <SidebarCategory title="Security" color={C_SEC}>
                            <button onClick={() => addNode('IAM Role', 'Security', C_SEC)} className="svc-btn">IAM Role</button>
                            <button onClick={() => addNode('Cognito User Pool', 'Security', C_SEC)} className="svc-btn">Cognito User Pool</button>
                            <button onClick={() => addNode('WAF', 'Security', C_SEC)} className="svc-btn">WAF Firewall</button>
                            <button onClick={() => addNode('Shield', 'Security', C_SEC)} className="svc-btn">Shield Advanced</button>
                            <button onClick={() => addNode('KMS Key', 'Security', C_SEC)} className="svc-btn">KMS Key</button>
                            <button onClick={() => addNode('Secrets Manager', 'Security', C_SEC)} className="svc-btn">Secrets Manager</button>
                        </SidebarCategory>

                        <SidebarCategory title="App Integration" color={C_APP}>
                            <button onClick={() => addNode('SNS Topic', 'Integration', C_APP)} className="svc-btn">SNS Topic</button>
                            <button onClick={() => addNode('SQS Queue', 'Integration', C_APP)} className="svc-btn">SQS Queue</button>
                            <button onClick={() => addNode('EventBridge', 'Integration', C_APP)} className="svc-btn">EventBridge Bus</button>
                            <button onClick={() => addNode('Step Functions', 'Integration', C_APP)} className="svc-btn">Step Functions</button>
                            <button onClick={() => addNode('AppSync', 'Integration', C_APP)} className="svc-btn">AppSync (GraphQL)</button>
                        </SidebarCategory>

                        <SidebarCategory title="Analytics" color={C_DATA}>
                            <button onClick={() => addNode('Kinesis Stream', 'Analytics', C_DATA)} className="svc-btn">Kinesis Stream</button>
                            <button onClick={() => addNode('Athena', 'Analytics', C_DATA)} className="svc-btn">Athena</button>
                            <button onClick={() => addNode('Glue', 'Analytics', C_DATA)} className="svc-btn">Glue ETL</button>
                            <button onClick={() => addNode('OpenSearch', 'Analytics', C_DATA)} className="svc-btn">OpenSearch</button>
                            <button onClick={() => addNode('MSK', 'Analytics', C_DATA)} className="svc-btn">MSK (Kafka)</button>
                        </SidebarCategory>
                    </div>
                </div>

                {/* Canvas */}
                <div style={{ flex: 1, background: 'var(--bg-deep)', position: 'relative' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setRfInstance}
                        onMove={onMove}
                        minZoom={0.2}
                        maxZoom={2}
                        attributionPosition="bottom-right"
                    >
                        <Background color={isDarkMode ? "#1a1a1e" : "#e5e7eb"} gap={20} size={1} />
                        <MiniMap
                            style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', bottom: 20, right: 20 }}
                            nodeColor={(n) => n.data?.color || (isDarkMode ? '#fff' : '#000')}
                            maskColor={isDarkMode ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)"}
                        />
                        <Controls style={{ bottom: 100, right: 20, display: 'flex', flexDirection: 'column', gap: '5px', background: 'transparent', boxShadow: 'none', border: 'none' }} showInteractive={false} />
                    </ReactFlow>

                    {/* Centered Zoom Bar */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
                            display: 'flex', alignItems: 'center', gap: '15px',
                            background: 'var(--bg-card)', padding: '6px 20px', borderRadius: '30px',
                            border: '1px solid var(--glass-border)', backdropFilter: 'blur(5px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.4)', zIndex: 60
                        }}
                    >
                        <button onClick={() => rfInstance?.zoomOut()} className="zoom-btn"><ZoomOut size={16} /></button>

                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowZoomMenu(!showZoomMenu)}
                                style={{
                                    fontSize: '0.85rem', color: '#ccc', minWidth: '50px',
                                    background: 'transparent', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                                }}
                            >
                                {Math.round(zoomLevel * 100)}%
                            </button>

                            {/* Zoom Selection Menu */}
                            {showZoomMenu && (
                                <div style={{
                                    position: 'absolute', bottom: '140%', left: '50%', transform: 'translateX(-50%)',
                                    background: '#1a1a20', border: '1px solid #333', borderRadius: '8px',
                                    padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px',
                                    boxShadow: '0 5px 20px rgba(0,0,0,0.5)', minWidth: '80px'
                                }}>
                                    {[0.5, 0.75, 1, 1.5, 2].map(zoom => (
                                        <button
                                            key={zoom}
                                            onClick={() => setSpecificZoom(zoom)}
                                            className="menu-item"
                                            style={{ justifyContent: 'center' }}
                                        >
                                            {zoom * 100}%
                                        </button>
                                    ))}
                                    <div style={{ borderTop: '1px solid #333', margin: '2px 0' }}></div>
                                    <button onClick={() => { rfInstance?.fitView(); setShowZoomMenu(false); }} className="menu-item" style={{ justifyContent: 'center' }}>
                                        Fit
                                    </button>
                                </div>
                            )}
                        </div>

                        <button onClick={() => rfInstance?.zoomIn()} className="zoom-btn"><ZoomIn size={16} /></button>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; borderRadius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444; }

                .svc-btn {
                    text-align: left; background: transparent; border: none; color: #888;
                    padding: 6px 10px; fontSize: 0.8rem; cursor: pointer; borderRadius: 4px;
                    transition: all 0.1s; display: block; width: 100%; margin-bottom: 2px;
                }
                .svc-btn:hover { background: rgba(255,255,255,0.05); color: #fff; transform: translateX(2px); }

                .icon-btn {
                    background: transparent; border: none; color: #aaa; padding: 0;
                    width: 36px; height: 36px; display: grid; place-items: center;
                    border-radius: 8px; cursor: pointer; transition: all 0.2s; position: relative;
                }
                .icon-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
                .icon-btn.active { background: rgba(0, 163, 255, 0.1); color: #00A3FF; }
                .icon-btn:disabled { opacity: 0.3; cursor: not-allowed; }

                .icon-btn-danger {
                    background: transparent; border: none; color: #ff6666; padding: 0;
                    width: 36px; height: 36px; display: grid; place-items: center;
                    border-radius: 8px; cursor: pointer; transition: all 0.2s;
                }
                .icon-btn-danger:hover { background: rgba(255, 68, 68, 0.1); color: #ff4444; }

                .zoom-btn {
                    background: transparent; border: none; color: #aaa; padding: 0;
                    display: grid; place-items: center; cursor: pointer;
                    width: 24px; height: 24px;
                    border-radius: 50%; transition: color 0.2s;
                }
                .zoom-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }

                .menu-item {
                    display: flex; alignItems: center; gap: 8px;
                    background: transparent; border: none; color: #ccc;
                    padding: 8px 12px; width: 100%; text-align: left;
                    font-size: 0.85rem; cursor: pointer; border-radius: 6px;
                    transition: all 0.1s;
                }
                .menu-item:hover { background: rgba(255,255,255,0.05); color: white; }

                .v-sep { width: 1px; height: 16px; background: rgba(255,255,255,0.1); margin: 0 4px; }
            `}</style>
        </div>
    );
};
