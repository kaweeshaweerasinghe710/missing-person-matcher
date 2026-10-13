import React from 'react';

function SuccessView({
  icon = '✅',
  title = 'Submitted Successfully!',
  message = 'Your record has been published.',
  buttonText = '← Back to Directory',
  onButtonClick,
  actionButtonText,
  onActionClick,
}) {
  return (
    <div className="success-page">
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>{icon}</div>
      <h2>{title}</h2>
      <p>{message}</p>

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {actionButtonText && onActionClick && (
          <button
            type="button"
            className="card-btn red"
            style={{ width: 'auto', padding: '12px 28px', fontSize: '14px' }}
            onClick={onActionClick}
          >
            {actionButtonText}
          </button>
        )}
        <button
          type="button"
          className="card-btn blue"
          style={{ width: 'auto', padding: '12px 28px', fontSize: '14px' }}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default SuccessView;
