import React, { useRef } from 'react';
import MissingPoster from './MissingPoster';

function PosterModal({ person, onClose }) {
  const posterRef = useRef(null);

  if (!person) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay poster-modal-overlay" onClick={onClose}>
      <div className="poster-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="poster-modal-toolbar">
          <div className="poster-toolbar-title">
             Official Printable Poster Preview
          </div>
          <div className="poster-toolbar-actions">
            <button type="button" onClick={handlePrint} className="btn-print-poster">
              🖨️ Print / Save as PDF
            </button>
            <button type="button" onClick={onClose} className="btn-close-poster">
              ✕ Close
            </button>
          </div>
        </div>

        <div className="poster-modal-preview-area">
          <MissingPoster person={person} innerRef={posterRef} />
        </div>
      </div>
    </div>
  );
}

export default PosterModal;
