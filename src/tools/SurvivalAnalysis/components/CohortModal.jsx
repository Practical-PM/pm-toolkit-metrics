import { useState, useEffect } from 'react';
import {
  Modal,
  FormField,
  FormGroup,
  ModalActions,
  ColorSelector,
  Button,
} from '@toolkit-pm/design-system/components';
import './CohortModal.css';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export default function CohortModal({ isOpen, onClose, onSave, editingCohort }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [data, setData] = useState([{ period: 0, survived: 1000, total: 1000 }]);

  useEffect(() => {
    if (editingCohort) {
      setName(editingCohort.name || '');
      setColor(editingCohort.color || COLORS[0]);
      setData(editingCohort.data || [{ period: 0, survived: 1000, total: 1000 }]);
    } else {
      setName('');
      setColor(COLORS[0]);
      setData([{ period: 0, survived: 1000, total: 1000 }]);
    }
  }, [editingCohort, isOpen]);

  const handleFormSubmit = (e) => {
    e?.preventDefault?.();
    if (!name.trim()) return;

    const sortedData = [...data].sort((a, b) => a.period - b.period);

    onSave({
      name: name.trim(),
      color,
      data: sortedData
    });
  };

  const handleAddPeriod = () => {
    const lastPeriod = data.length > 0 ? Math.max(...data.map(d => d.period)) : -1;
    setData([...data, { period: lastPeriod + 1, survived: data[data.length - 1]?.survived || 0, total: data[0]?.total || 1000 }]);
  };

  const handleUpdatePeriod = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: parseInt(value) || 0 };
    setData(newData);
  };

  const handleRemovePeriod = (index) => {
    if (data.length > 1) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingCohort ? 'Edit Cohort' : 'Add Cohort'}
    >
      <form onSubmit={handleFormSubmit}>
        <FormField
          label="Cohort Name *"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Q1 2024"
          required
        />

        <FormGroup label="Color">
          <ColorSelector
            colors={COLORS}
            selected={color}
            onSelect={setColor}
          />
        </FormGroup>

        <FormGroup label="Survival Data">
          <div className="data-table">
            <div className="table-header">
              <div>Period</div>
              <div>Survived</div>
              <div>Total</div>
              <div>Actions</div>
            </div>
            {data.map((item, index) => (
              <div key={index} className="table-row">
                <input
                  type="number"
                  value={item.period}
                  onChange={(e) => handleUpdatePeriod(index, 'period', e.target.value)}
                  min="0"
                />
                <input
                  type="number"
                  value={item.survived}
                  onChange={(e) => handleUpdatePeriod(index, 'survived', e.target.value)}
                  min="0"
                  max={item.total}
                />
                <input
                  type="number"
                  value={item.total}
                  onChange={(e) => handleUpdatePeriod(index, 'total', e.target.value)}
                  min="0"
                />
                {data.length > 1 && (
                  <Button
                    type="button"
                    variant="delete"
                    className="btn-remove"
                    onClick={() => handleRemovePeriod(index)}
                    title="Remove period"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="add"
            onClick={handleAddPeriod}
          >
            + Add Period
          </Button>
        </FormGroup>

        <ModalActions
          onCancel={onClose}
          onSubmit={handleFormSubmit}
          submitLabel={editingCohort ? 'Update Cohort' : 'Add Cohort'}
          cancelLabel="Cancel"
        />
      </form>
    </Modal>
  );
}
