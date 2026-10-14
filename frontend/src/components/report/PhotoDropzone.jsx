import React from 'react';

function PhotoDropzone({ onFileUpload, activePhotoUrl, selectedImageIndex }) {
  return (
    <>
      <div className="file-dropzone">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={onFileUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
          <div style={{ fontSize: '32px', marginBottom: '6px' }}>📁</div>
          <span className="btn-choose-file">
            Choose Photo from Device
          </span>
          <p className="file-types-hint">
            PNG, JPG, JPEG, WEBP accepted
          </p>
        </label>
      </div>

      {activePhotoUrl && (
        <div className="active-photo-preview-box">
          <span className="badge-active-photo">
            ✓ Active Photo for Report
          </span>
          <div>
            <img
              src={activePhotoUrl}
              alt="Selected Preview"
              className="active-photo-img"
            />
          </div>
          <p className="active-photo-caption">
            {selectedImageIndex === 0
              ? 'Original Uploaded Photo'
              : `Selected AI Variation ${selectedImageIndex}`}
          </p>
        </div>
      )}
    </>
  );
}

export default PhotoDropzone;
