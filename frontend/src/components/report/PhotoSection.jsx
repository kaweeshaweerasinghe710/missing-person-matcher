import React from 'react';
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
  return (
    <div className="photo-upload-section">
      <label className="photo-upload-title">
        📸 Photo of Missing Person & Appearance Variations
      </label>
      <p className="photo-upload-subtitle">
        Upload a photo from your device. You can optionally simulate and choose an updated AI variation below.
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
