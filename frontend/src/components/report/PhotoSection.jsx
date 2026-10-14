import React from 'react';
import { useTranslation } from 'react-i18next';
import PhotoDropzone from './PhotoDropzone';
import AiVariationPicker from './AiVariationPicker';

function PhotoSection({
  onFileUpload,
  activePhotoUrl,
  selectedImageIndex,
  aiPrompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  variations,
  uploadedOriginal,
  onSelectImage,
}) {
  const { t } = useTranslation();

  return (
    <div className="photo-upload-section">
      <label className="photo-upload-title">
        {t('photoSectionTitle')}
      </label>
      <p className="photo-upload-subtitle">
        {t('photoSectionSubtitle')}
      </p>

      <PhotoDropzone
        onFileUpload={onFileUpload}
        activePhotoUrl={activePhotoUrl}
        selectedImageIndex={selectedImageIndex}
      />

      <AiVariationPicker
        prompt={aiPrompt}
        onPromptChange={onPromptChange}
        onApplyPreset={onPromptChange}
        onGenerate={onGenerate}
        isGenerating={isGenerating}
        variations={variations}
        uploadedOriginal={uploadedOriginal}
        selectedImageIndex={selectedImageIndex}
        onSelectImage={onSelectImage}
      />
    </div>
  );
}

export default PhotoSection;
