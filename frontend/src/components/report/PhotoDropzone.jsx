import React from 'react';
import { useTranslation } from 'react-i18next';

function PhotoDropzone({ onFileUpload, activePhotoUrl, selectedImageIndex }) {
  const { t } = useTranslation();

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
            {t('choosePhotoBtn')}
          </span>
          <p className="file-types-hint">
            {t('acceptedFormats')}
          </p>
        </label>
      </div>

      {activePhotoUrl && (
        <div className="active-photo-preview-box">
          <span className="badge-active-photo">
            {t('activePhotoBadge')}
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
              ? t('originalPhoto')
              : `${t('selectedVariation')} ${selectedImageIndex}`}
          </p>
        </div>
      )}
    </>
  );
}

export default PhotoDropzone;
