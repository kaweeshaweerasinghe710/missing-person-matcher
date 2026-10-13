import React, { useState } from 'react';

function MissingPoster({ person, innerRef }) {
  const [imgError, setImgError] = useState(false);

  if (!person) return null;

  const caseUrl = `${window.location.origin}/cases?id=${person.id || ''}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    caseUrl
  )}`;

  return (
    <div ref={innerRef} className="printable-poster">
      <div className="poster-header-banner">
        <h1 className="poster-header-title">MISSING PERSON</h1>
        <h2 className="poster-header-subtitle">අතුරුදහන් වූවෙකි • HELP US FIND</h2>
      </div>

      <div className="poster-body">
        <div className="poster-photo-wrapper">
          {person.photoUrl && !imgError ? (
            <img
              src={person.photoUrl}
              alt={person.name}
              className="poster-photo-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="poster-photo-placeholder">👤</div>
          )}
        </div>

        <h2 className="poster-person-name">{person.name}</h2>
        <div className="poster-quick-tag">
          {person.age} Years Old • {person.gender}
        </div>

        <div className="poster-details-grid">
          <div className="poster-detail-item">
            <span className="poster-detail-key">📅 Last Seen Date:</span>
            <span className="poster-detail-val">{person.lastSeenDate || 'Unknown'}</span>
          </div>

          <div className="poster-detail-item">
            <span className="poster-detail-key">📍 Last Seen Location:</span>
            <span className="poster-detail-val">{person.lastSeenLocation || 'Unknown'}</span>
          </div>

          {person.clothing && (
            <div className="poster-detail-item" style={{ gridColumn: 'span 2' }}>
              <span className="poster-detail-key">👕  Dress:</span>
              <span className="poster-detail-val">{person.clothing}</span>
            </div>
          )}

          {person.description && (
            <div className="poster-detail-item" style={{ gridColumn: 'span 2' }}>
              <span className="poster-detail-key">📝 Details :</span>
              <span className="poster-detail-val">{person.description}</span>
            </div>
          )}
        </div>

        <div className="poster-footer-row">
          <div className="poster-contact-box">
            <div className="poster-contact-title">IF SEEN, PLEASE CONTACT IMMEDIATELY:</div>
            <div className="poster-contact-phone">
              📞 {person.contactNumber ? person.contactNumber : '119 / Police'}
            </div>
          </div>

          <div className="poster-qr-box">
            <img
              src={qrUrl}
              alt="Scan QR"
              className="poster-qr-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="poster-qr-hint">Scan with phone to view case</div>
          </div>
        </div>

        <div className="poster-bottom-bar">
          PLEASE SHARE THIS POSTER • MISSING PERSON MATCHER SYSTEM
        </div>
      </div>
    </div>
  );
}

export default MissingPoster;
