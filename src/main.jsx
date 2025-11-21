import React from 'react';
import { createRoot } from 'react-dom/client';
import DesignAlchemyLab from './design-alchemy-app.js'; // adjust filename/path if needed

console.log('main.jsx loaded');

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // log stack to console (Vercel / browser console)
    console.error('ErrorBoundary caught error:', error);
    console.error(info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, background: '#fff2f0', color: '#611a15', fontFamily: 'sans-serif' }}>
          <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>
            {String(this.state.error)}
            {this.state.info && '\n\n' + (this.state.info.componentStack ?? '')}
          </pre>
          <p style={{ marginTop: 12 }}>Also check the browser console for a full stack trace.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 9999, background: '#fff', padding: '6px 10px', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.08)', fontSize: 13 }}>
      DEBUG: React mounted (main.jsx)
    </div>

    <ErrorBoundary>
      <DesignAlchemyLab />
    </ErrorBoundary>
  </React.StrictMode>
);
