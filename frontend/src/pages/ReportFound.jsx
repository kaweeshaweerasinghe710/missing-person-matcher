import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReportFoundForm } from '../hooks/useReportFoundForm';
import CameraCapture from '../components/common/CameraCapture';
import LocationPicker from '../components/common/LocationPicker';
import FoundPersonFormFields from '../components/report/FoundPersonFormFields';
import SuccessView from '../components/common/SuccessView';

function ReportFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    form,
    handleChange,
    camera,
    geo,
    handleDeviceUpload,
    handleSubmit,
    isSubmitting,
    isSuccess,
  } = useReportFoundForm();

  if (isSuccess) {
    return (
      <SuccessView
        icon="🤝"
        title={t('foundSuccessTitle')}
        message={t('foundSuccessMsg')}
        buttonText={t('backToCases')}
        onButtonClick={() => navigate('/')}
      />
    );
  }

  return (
    <div className="form-page" style={{ maxWidth: '680px' }}>
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        {t('backBtn')}
      </button>

      <h2>{t('reportFoundTitle')}</h2>

      <div className="unidentified-banner">
        <div className="unidentified-banner-title">
          <span>ℹ️</span> {t('unidentifiedTitle')}
        </div>
        <p className="unidentified-banner-text">
          {t('unidentifiedDesc')}
        </p>
      </div>

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
          required
          placeholder="Colombo, Kandy..."
        />

        <FoundPersonFormFields
          foundDate={form.foundDate}
          onDateChange={handleChange}
          reporterContact={form.reporterContact}
          onContactChange={handleChange}
          notes={form.notes}
          onNotesChange={handleChange}
        />

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
          style={{ backgroundColor: '#27ae60' }}
        >
          {isSubmitting ? t('submittingFoundReport') : t('submitFoundReport')}
        </button>
      </form>
    </div>
  );
}

export default ReportFound;
