import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReportFoundForm } from '../hooks/useReportFoundForm';
import CameraCapture from '../components/common/CameraCapture';
import LocationPicker from '../components/common/LocationPicker';
import FoundPersonFormFields from '../components/report/FoundPersonFormFields';
import SuccessView from '../components/common/SuccessView';

function ReportFound() {
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
        title="Found Person Report Submitted!"
        message="The record has been saved. Our system will scan for matching missing person reports."
        buttonText="← Back to Cases Directory"
        onButtonClick={() => navigate('/')}
      />
    );
  }

  return (
    <div className="form-page" style={{ maxWidth: '680px' }}>
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>

      <h2> Report Found </h2>

     

      <form onSubmit={handleSubmit}>
        <CameraCapture
          videoRef={camera.videoRef}
          cameraActive={camera.cameraActive}
          cameraError={camera.cameraError}
          capturedImage={camera.capturedImage}
          onCapture={camera.capturePhoto}
          onRetake={camera.retakePhoto}
          onFileUpload={handleDeviceUpload}
          title=" Photo of Found Individual "
          subtitle="Live camera opens automatically. Align the person and click 'Capture Photo'."
          fallbackLabel=" Or upload photo from device gallery instead"
        />

        <LocationPicker
          value={geo.locationName}
          onChange={(e) => geo.setLocationName(e.target.value)}
          onFetchGps={geo.fetchLocation}
          isFetchingGps={geo.isFetching}
          gpsStatus={geo.statusMessage}
          coordinates={geo.coordinates}
          label=" Found Location"
          required
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
          {isSubmitting ? 'Submitting Found Report...' : ' Submit Found Person Report'}
        </button>
      </form>
    </div>
  );
}

export default ReportFound;
