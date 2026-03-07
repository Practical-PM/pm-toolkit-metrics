import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SurvivalAnalysis from './tools/SurvivalAnalysis/SurvivalAnalysis';
import './App.css';

function App() {
  return (
    <Router basename="/metrics">
      <AppContent />
    </Router>
  );
}

function AppContent() {
  return (
    <div className="app practice-mode">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MetricsLanding />} />
          <Route path="/survival" element={<SurvivalAnalysis />} />
        </Routes>
      </main>

      <footer className="app-footer animate-slide-bottom stagger-4">
        <p className="sketchy-text">
          Part of <strong>The PM Toolkit</strong> - A collection of practical product management tools
        </p>
        <p className="footer-links sketchy-text">
          <a href="https://practicalpm.tools/" className="sketchy-text">&larr; Back to Toolkit</a>
          {" \u2022 "}
          <a href="https://github.com/Practical-PM" target="_blank" rel="noopener noreferrer" className="sketchy-text">
            Open Source on GitHub - Fork &amp; Download
          </a>
        </p>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/geranbutcher/" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/Practical-PM" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

function MetricsLanding() {
  const metrics = [
    {
      id: 'survival',
      title: 'Survival Analysis',
      description: 'Visualize and compare survival curves for different cohorts to understand retention and churn patterns.',
      icon: '📈',
      path: '/survival'
    }
  ];

  return (
    <div className="landing-page animate-fade-in">
      <div className="landing-header animate-fade-in stagger-1">
        <h1 className="sketchy-text">Metrics</h1>
        <p className="landing-description sketchy-text">
          Calculators and visualizations to help you measure, analyze, and understand 
          product and business metrics. Each tool includes explanations and interactive components.
        </p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <Link key={metric.id} to={metric.path} className="metric-card rough-card animate-fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
            <div className="metric-icon">{metric.icon}</div>
            <h3 className="metric-title sketchy-text">{metric.title}</h3>
            <p className="metric-description sketchy-text">{metric.description}</p>
            <div className="metric-link sketchy-text">
              Explore &rarr; 
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
