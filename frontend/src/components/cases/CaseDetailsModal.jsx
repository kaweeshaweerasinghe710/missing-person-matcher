import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/fileHelpers';

function CaseDetailsModal({ person, onClose, onMarkFound, onPrintPoster }) {
  const { t } = useTranslation();
  if (!person) return null;

  const isFound = person.status === 'FOUND';

  const detailsList = [
    { label: t('age'), value: `${person.age} ${t('ageYears')}` },
    { label: t('gender'), value: person.gender },
    { label: t('lastSeenDate'), value: person.lastSeenDate },
    { label: t('lastSeenLocation'), value: person.lastSeenLocation },
    { label: t('clothing'), value: person.clothing },
    { label: t('contact'), value: person.contactNumber },
    { label: t('description'), value: person.description },
    { label: t('reportedDate'), value: formatDate(person.createdAt) },
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
              {t('printPosterBtn')}
            </button>
          )}

          {!isFound && (
            <button
              type="button"
              onClick={() => onMarkFound(person)}
              className="modal-action-btn-found"
              style={{ marginTop: 0, flex: 1 }}
            >
              {t('markFoundModalBtn')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaseDetailsModal;
