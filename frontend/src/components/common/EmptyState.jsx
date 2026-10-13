import React from 'react';

function EmptyState({
  title = 'No records found.',
  buttonText = 'Add New',
  onButtonClick,
}) {
  return (
    <div className="cases-empty-state">
      <p className="cases-empty-title">{title}</p>
      {onButtonClick && (
        <button type="button" onClick={onButtonClick} className="cases-btn-first-report">
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
