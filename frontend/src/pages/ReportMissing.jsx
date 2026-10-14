import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReportMissingForm } from '../hooks/useReportMissingForm';
import MissingPersonFormFields from '../components/report/MissingPersonFormFields';
import PhotoSection from '../components/report/PhotoSection';
import SuccessView from '../components/common/SuccessView';
import PosterModal from '../components/poster/PosterModal';

function ReportMissing() {
  const navigate = useNavigate();
  const [showPoster, setShowPoster] = useState(false);

  const {
    form,
    handleChange,
    handleFileUpload,
    selectedImageIndex,
    aiPrompt,
    setAiPrompt,
    handleGenerateVariations,
    generatingAi,
    variations,
    uploadedOriginal,
    handleSelectImage,
    handleSubmit,
    isSubmitting,
    isSuccess,
    createdPerson,
  } = useReportMissingForm();

  if (isSuccess) {
    return (
      <>
        <SuccessView
      
          title="Report Submitted Successfully!"
          message="The missing person record has been published. You can now generate, print, or download an official poster."
          actionButtonText=" Generate & Print Official Poster"
          onActionClick={() => setShowPoster(true)}
          buttonText="← Back to Missing Persons List"
          onButtonClick={() => navigate('/')}
        />
        {showPoster && (
          <PosterModal
            person={createdPerson || form}
            onClose={() => setShowPoster(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="form-page" style={{ maxWidth: '680px' }}>
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>

      <h2>📢 Report Missing Person</h2>
      <p style={{ color: '#aaaacc', fontSize: '14px', marginBottom: '24px' }}>
        Please provide accurate details to help identify and locate the missing individual.
      </p>

      <form onSubmit={handleSubmit}>
        <MissingPersonFormFields form={form} onChange={handleChange} />

        <PhotoSection
          onFileUpload={handleFileUpload}
          activePhotoUrl={form.photoUrl}
          selectedImageIndex={selectedImageIndex}
          aiPrompt={aiPrompt}
          onPromptChange={setAiPrompt}
          onGenerate={handleGenerateVariations}
          isGenerating={generatingAi}
          variations={variations}
          uploadedOriginal={uploadedOriginal}
          onSelectImage={handleSelectImage}
        />

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting Report...' : 'Submit Missing Person Report'}
        </button>
      </form>
    </div>
  );
}

export default ReportMissing;