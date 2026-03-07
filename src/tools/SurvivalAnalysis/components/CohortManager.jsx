import { useState } from 'react';
import {
  Tile,
  Button,
  EmptyState,
  CardGrid,
} from '@toolkit-pm/design-system/components';
import CohortCard from './CohortCard';
import CohortModal from './CohortModal';
import './CohortManager.css';

export default function CohortManager({ cohorts, onAdd, onUpdate, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCohort, setEditingCohort] = useState(null);

  const handleAddClick = () => {
    setEditingCohort(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (cohort) => {
    setEditingCohort(cohort);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCohort(null);
  };

  const handleModalSave = (cohortData) => {
    if (editingCohort) {
      onUpdate(editingCohort.id, cohortData);
    } else {
      onAdd(cohortData);
    }
    handleModalClose();
  };

  return (
    <Tile className="cohort-manager">
      <div className="manager-header">
        <h2>Cohorts</h2>
        <Button variant="add" onClick={handleAddClick}>
          + Add Cohort
        </Button>
      </div>

      {cohorts.length === 0 ? (
        <EmptyState
          message="No cohorts yet. Add a cohort to start analyzing survival curves."
          actionLabel="Add Cohort"
          onAction={handleAddClick}
        />
      ) : (
        <CardGrid onAdd={handleAddClick} addLabel="+ Add Cohort">
          {cohorts.map(cohort => (
            <CohortCard
              key={cohort.id}
              cohort={cohort}
              onEdit={handleEditClick}
              onDelete={onDelete}
            />
          ))}
        </CardGrid>
      )}

      <CohortModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        editingCohort={editingCohort}
      />
    </Tile>
  );
}
