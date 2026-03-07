import {
  Badge,
  ActionButtonGroup,
} from '@toolkit-pm/design-system/components';
import './CohortCard.css';

export default function CohortCard({ cohort, onEdit, onDelete }) {
  const survivalRate = cohort.data && cohort.data.length > 0
    ? (cohort.data[cohort.data.length - 1].survived / cohort.data[0].total) * 100
    : 0;

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(cohort);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${cohort.name}"?`)) {
      onDelete(cohort.id);
    }
  };

  return (
    <div className="cohort-card" style={{ borderLeftColor: cohort.color }}>
      <div className="card-header">
        <div className="cohort-name-section">
          <div
            className="cohort-color-indicator"
            style={{ backgroundColor: cohort.color }}
          />
          <h3 className="cohort-name">
            <Badge color={cohort.color}>{cohort.name}</Badge>
          </h3>
        </div>
        <ActionButtonGroup
          onEdit={handleEdit}
          onDelete={handleDelete}
          editIcon="✏️"
          deleteIcon="🗑️"
        />
      </div>

      <div className="cohort-stats">
        <div className="stat">
          <div className="stat-label">Data Points</div>
          <div className="stat-value">{cohort.data?.length || 0}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Final Survival</div>
          <div className="stat-value">{survivalRate.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}
