import React from 'react';
import { formatDate } from '../../utils/fileHelpers';

function CaseDetailsModal({ person, onClose, onMarkFound, onPrintPoster }) {
  if (!person) return null;

  const isFound = person.status === 'FOUND';

  const detailsList = [
    { label: 'Age', value: `${person.age} years` },
    { label: 'Gender', value: person.gender },
    { label: 'Last Seen Date', value: person.lastSeenDate },
    { label: 'Last Seen Location', value: person.lastSeenLocation },
    { label: 'Clothing / Dress', value: person.clothing },
    { label: 'Contact', value: person.contactNumber },
    { label: 'Description', value: person.description },
    { label: 'Reported Date', value: formatDate(person.createdAt) },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="modal-close-btn">
          ✕
        </button>
        <div className="modal-avatar-wrapper">
          {person.photoUrl ? (
            <img src={person.photoUrl} alt={person.name} className="modal-avatar-img" />
          ) : (
            <span className="modal-avatar-placeholder">👤</span>
          )}
        </div>

        <h2 className="modal-title">{person.name}</h2>
        <div className="modal-status-wrapper">
          <span className={`modal-badge ${isFound ? 'badge-found' : 'badge-missing'}`}>
            {person.status}
          </span>
        </div>

        <div className="modal-details-list">
          {detailsList.map(({ label, value }) => (
            <div key={label} className="modal-detail-row">
              <span className="modal-detail-label">{label}</span>
              <span className="modal-detail-value">{value || '—'}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          {onPrintPoster && (
            <button
              type="button"
              onClick={() => onPrintPoster(person)}
              className="case-btn-details"
              style={{
                padding: '14px',
                fontSize: '14px',
                flex: 1,
                backgroundColor: '#2c3e50',
                color: '#fff',
                border: '1px solid #34495e',
                fontWeight: '700',
              }}
            >
              📄 Print Poster
            </button>
          )}

          {!isFound && (
            <button
              type="button"
              onClick={() => onMarkFound(person)}
              className="modal-action-btn-found"
              style={{ marginTop: 0, flex: 1 }}
            >
               Mark Found
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaseDetailsModal;
