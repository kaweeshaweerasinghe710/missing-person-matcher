import React from 'react';

function CaseCard({ person, onViewDetails, onMarkFound }) {
  const isFound = person.status === 'FOUND';

  return (
    <div className={`case-grid-card ${isFound ? 'status-card-found' : ''}`}>
      <div>
        <div className="case-card-photo-container">
          {person.photoUrl ? (
            <img
              src={person.photoUrl}
              alt={person.name}
              className="case-card-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <span className="case-card-avatar-placeholder">👤</span>
          )}
          <span className={`case-card-badge ${isFound ? 'badge-found' : 'badge-missing'}`}>
            {person.status}
          </span>
        </div>
        <div className="case-card-info">
          <h3 className="case-card-name">{person.name}</h3>
          <p className="case-card-meta">
            {person.age} yrs • {person.gender}
          </p>

          {person.lastSeenDate && (
            <p className="case-card-detail">
               <strong>Last Seen:</strong> {person.lastSeenDate}
            </p>
          )}

          <p className="case-card-detail case-card-ellipsis">
             <strong>Location:</strong> {person.lastSeenLocation}
          </p>

          {person.clothing && (
            <p className="case-card-detail-sub case-card-ellipsis">
               <strong>Dress:</strong> {person.clothing}
            </p>
          )}
        </div>
      </div>
      <div className="case-card-actions">
        <button
          type="button"
          onClick={() => onViewDetails(person)}
          className="case-btn-details"
        >
          More Details
        </button>

        {!isFound ? (
          <button
            type="button"
            onClick={() => onMarkFound(person)}
            className="case-btn-found"
          >
             Found
          </button>
        ) : (
          <span className="case-badge-located">Located</span>
        )}
      </div>
    </div>
  );
}

export default CaseCard;
