import { useState, useEffect } from 'react';
import { Button, Modal, ModalActions, PageLayout, Tile, TitleBar } from '@toolkit-pm/design-system/components';
import CohortManager from './components/CohortManager';
import SurvivalChart from './components/SurvivalChart';
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage } from './utils/storage';
import './SurvivalAnalysis.css';

const EXAMPLE_COHORTS = [
  {
    id: 1,
    name: 'Q1 2024',
    color: '#3b82f6',
    data: [
      { period: 0, survived: 1000, total: 1000 },
      { period: 1, survived: 850, total: 1000 },
      { period: 2, survived: 720, total: 1000 },
      { period: 3, survived: 620, total: 1000 },
      { period: 4, survived: 550, total: 1000 },
      { period: 5, survived: 500, total: 1000 },
      { period: 6, survived: 460, total: 1000 },
    ]
  },
  {
    id: 2,
    name: 'Q2 2024',
    color: '#10b981',
    data: [
      { period: 0, survived: 1000, total: 1000 },
      { period: 1, survived: 880, total: 1000 },
      { period: 2, survived: 780, total: 1000 },
      { period: 3, survived: 700, total: 1000 },
      { period: 4, survived: 640, total: 1000 },
      { period: 5, survived: 590, total: 1000 },
      { period: 6, survived: 550, total: 1000 },
    ]
  },
  {
    id: 3,
    name: 'Q3 2024',
    color: '#f59e0b',
    data: [
      { period: 0, survived: 1000, total: 1000 },
      { period: 1, survived: 900, total: 1000 },
      { period: 2, survived: 820, total: 1000 },
      { period: 3, survived: 750, total: 1000 },
      { period: 4, survived: 690, total: 1000 },
      { period: 5, survived: 640, total: 1000 },
      { period: 6, survived: 600, total: 1000 },
    ]
  }
];

const cloneExampleCohorts = () => EXAMPLE_COHORTS.map((cohort) => ({
  ...cohort,
  data: cohort.data.map((point) => ({ ...point })),
}));

function SurvivalAnalysis() {
  const [cohorts, setCohorts] = useState([]);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved && saved.length > 0) {
      setCohorts(saved);
    } else {
      setCohorts(cloneExampleCohorts());
    }
  }, []);

  useEffect(() => {
    if (cohorts.length > 0) {
      saveToLocalStorage(cohorts);
    }
  }, [cohorts]);

  const handleAddCohort = (cohort) => {
    const newCohort = {
      id: Date.now(),
      ...cohort,
      data: cohort.data || []
    };
    setCohorts([...cohorts, newCohort]);
  };

  const handleUpdateCohort = (id, updates) => {
    setCohorts(cohorts.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleDeleteCohort = (id) => {
    setCohorts(cohorts.filter(c => c.id !== id));
  };

  const handleGenerateExample = () => {
    if (cohorts.length > 0 && !window.confirm('Replace current cohorts with example data?')) {
      return;
    }
    setCohorts(cloneExampleCohorts());
  };

  const handleReset = () => {
    if (!window.confirm('Reset all cohort data and clear local storage?')) {
      return;
    }
    clearLocalStorage();
    setCohorts([]);
  };

  return (
    <PageLayout>
      <TitleBar
        title="Survival Analysis"
        actions={(
          <>
            <Button variant="walkthrough" onClick={() => setIsWalkthroughOpen(true)}>
              Walkthrough
            </Button>
            <Button variant="secondary" onClick={handleGenerateExample}>
              Generate Example
            </Button>
            <Button variant="danger" onClick={handleReset}>
              Reset All Data
            </Button>
          </>
        )}
      />

      <Tile className="explanation-section">
        <h2>Survival Analysis &amp; Cohort Retention</h2>
        <div className="explanation-content">
          <p>
            Survival analysis helps you understand how different cohorts of users, customers, or 
            entities retain over time. By comparing survival curves across cohorts, you can identify 
            trends, improvements, or issues in retention patterns.
          </p>
          
          <div className="concept-box">
            <h3>What is a Survival Curve?</h3>
            <p>
              A survival curve shows the percentage of a cohort that &quot;survives&quot; (remains active) 
              over time. In product management, this typically means:
            </p>
            <ul>
              <li><strong>Customer Retention:</strong> What percentage of customers acquired in a period are still active?</li>
              <li><strong>Feature Adoption:</strong> How long do users continue using a feature?</li>
              <li><strong>Cohort Comparison:</strong> Are newer cohorts performing better or worse than older ones?</li>
            </ul>
          </div>

          <div className="use-cases">
            <h3>Common Use Cases</h3>
            <div className="use-cases-grid">
              <div className="use-case-card">
                <strong>Customer Cohorts</strong>
                <p>Compare retention of customers acquired in Q1 vs Q2 vs Q3 to see if product improvements are working.</p>
              </div>
              <div className="use-case-card">
                <strong>Feature Cohorts</strong>
                <p>Track how long users who adopted a feature in different months continue using it.</p>
              </div>
              <div className="use-case-card">
                <strong>Campaign Cohorts</strong>
                <p>Measure the long-term value of users acquired through different marketing campaigns.</p>
              </div>
            </div>
          </div>
        </div>
      </Tile>

      <CohortManager
        cohorts={cohorts}
        onAdd={handleAddCohort}
        onUpdate={handleUpdateCohort}
        onDelete={handleDeleteCohort}
      />

      {cohorts.length > 0 && (
        <SurvivalChart cohorts={cohorts} />
      )}

      <Modal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        title="Survival Analysis Walkthrough"
      >
        <p>Use this tool to compare retention behavior across cohorts over time.</p>
        <ol className="survival-walkthrough-list">
          <li>Start with Generate Example to see representative cohort curves.</li>
          <li>Add or edit cohorts and period data in the cohort manager panel.</li>
          <li>Compare curve separation to spot improving or declining retention.</li>
          <li>Use Reset All Data to clear local changes and start a fresh analysis.</li>
        </ol>
        <ModalActions onCancel={() => setIsWalkthroughOpen(false)} cancelLabel="Close" />
      </Modal>
    </PageLayout>
  );
}

export default SurvivalAnalysis;
