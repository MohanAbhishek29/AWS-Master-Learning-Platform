import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', color: '#ff5555', background: '#0f0f12', height: '100vh', fontFamily: 'monospace' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Mission Aborted (Runtime Error)</h2>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <p style={{ color: 'white', marginBottom: '10px', fontWeight: 'bold' }}>{this.state.error && this.state.error.toString()}</p>
                        <details style={{ whiteSpace: 'pre-wrap', color: '#888' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '20px', padding: '10px 24px', background: '#FF9900', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Re-Initialize System
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
