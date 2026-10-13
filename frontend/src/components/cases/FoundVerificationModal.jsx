import React from 'react';
import { useFoundVerification } from '../../hooks/useFoundVerification';
import CameraCapture from '../common/CameraCapture';
import LocationPicker from '../common/LocationPicker';
import FoundPersonFormFields from '../report/FoundPersonFormFields';

function FoundVerificationModal({ person, onClose, onSuccess }) {
  const {
    camera,
    geo,
    reporterContact,
    setReporterContact,
    foundNotes,
    setFoundNotes,
    handleDeviceUpload,
    handleSubmit,
    isSubmitting,
  } = useFoundVerification(person, onSuccess);

  if (!person) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="modal-close-btn">
          ✕
        </button>

        <div className="found-modal-header">
          <span style={{ fontSize: '20px' }}>🤝</span>
          <h3 className="found-modal-title">
            Confirm Found: <span style={{ color: '#2ecc71' }}>{person.name}</span>
          </h3>
        </div>
        <p className="found-modal-subtitle">
          Camera opens automatically. Snap a verification photo and confirm the location where this person was spotted.
        </p>

        <form onSubmit={handleSubmit}>
          <CameraCapture
            videoRef={camera.videoRef}
            cameraActive={camera.cameraActive}
            cameraError={camera.cameraError}
            capturedImage={camera.capturedImage}
            onCapture={camera.capturePhoto}
            onRetake={camera.retakePhoto}
            onFileUpload={handleDeviceUpload}
            title="📸 Live Camera Verification Photo"
            subtitle="Snap a photo of the spotted person"
            fallbackLabel="📁 Or upload photo from device instead"
          />

          <LocationPicker
            value={geo.locationName}
            onChange={(e) => geo.setLocationName(e.target.value)}
            onFetchGps={geo.fetchLocation}
            isFetchingGps={geo.isFetching}
            gpsStatus={geo.statusMessage}
            coordinates={geo.coordinates}
            label="📍 Spotted Location"
            placeholder="Location where person was spotted"
          />

          <FoundPersonFormFields
            reporterContact={reporterContact}
            onContactChange={(e) => setReporterContact(e.target.value)}
            notes={foundNotes}
            onNotesChange={(e) => setFoundNotes(e.target.value)}
          />

          <button type="submit" disabled={isSubmitting} className="btn-confirm-found">
            {isSubmitting ? 'Updating Status...' : '✓ Confirm Found & Update Record'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoundVerificationModal;
