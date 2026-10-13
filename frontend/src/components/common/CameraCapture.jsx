import React from 'react';

function CameraCapture({
  videoRef,
  cameraActive,
  cameraError,
  capturedImage,
  onCapture,
  onRetake,
  onFileUpload,
  title = ' Live Camera Photo',
  subtitle = 'Align the person and click "Capture Photo"',
  fallbackLabel = ' Or upload photo from device gallery instead',
}) {
  return (
    <div className="camera-capture-box">
      <label className="camera-label">{title}</label>
      {subtitle && <p className="camera-subtitle">{subtitle}</p>}
      {cameraActive && !capturedImage && (
        <div className="camera-viewport">
          <video ref={videoRef} autoPlay playsInline className="camera-video" />
          <div className="camera-controls">
            <button type="button" onClick={onCapture} className="camera-btn-capture">
               Capture Photo
            </button>
          </div>
        </div>
      )}
      {capturedImage && (
        <div className="camera-preview-container">
          <div className="camera-preview-wrapper">
            <img src={capturedImage} alt="Captured" className="camera-preview-img" />
            <span className="camera-badge-captured"> Captured</span>
          </div>
          <div className="camera-retake-wrapper">
            <button type="button" onClick={onRetake} className="camera-btn-retake">
               Retake Photo
            </button>
          </div>
        </div>
      )}
      {cameraError && <p className="camera-error-msg">{cameraError}</p>}
      {onFileUpload && (
        <div className="camera-file-fallback">
          <input
            type="file"
            id="camera-fallback-file"
            accept="image/*"
            onChange={onFileUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="camera-fallback-file" className="camera-fallback-link">
            {fallbackLabel}
          </label>
        </div>
      )}
    </div>
  );
}

export default CameraCapture;
