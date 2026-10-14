import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFoundVerification } from '../../hooks/useFoundVerification';
import CameraCapture from '../common/CameraCapture';
import LocationPicker from '../common/LocationPicker';
import FoundPersonFormFields from '../report/FoundPersonFormFields';

function FoundVerificationModal({ person, onClose, onSuccess }) {
  const { t } = useTranslation();
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
            {t('confirmFoundTitle')} <span style={{ color: '#2ecc71' }}>{person.name}</span>
          </h3>
        </div>
        <p className="found-modal-subtitle">
          {t('confirmFoundSubtitle')}
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
            title={t('livePhotoTitle')}
            subtitle={t('livePhotoSubtitle')}
            fallbackLabel={t('uploadFallback')}
          />

          <LocationPicker
            value={geo.locationName}
            onChange={(e) => geo.setLocationName(e.target.value)}
            onFetchGps={geo.fetchLocation}
            isFetchingGps={geo.isFetching}
            gpsStatus={geo.statusMessage}
            coordinates={geo.coordinates}
            label={t('foundLocation')}
            placeholder="Location where person was spotted"
          />

          <FoundPersonFormFields
            reporterContact={reporterContact}
            onContactChange={(e) => setReporterContact(e.target.value)}
            notes={foundNotes}
            onNotesChange={(e) => setFoundNotes(e.target.value)}
          />

          <button type="submit" disabled={isSubmitting} className="btn-confirm-found">
            {isSubmitting ? t('updatingStatus') : t('confirmFoundActionBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoundVerificationModal;
