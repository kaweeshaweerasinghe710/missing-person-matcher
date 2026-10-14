import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReportMissingForm } from '../hooks/useReportMissingForm';
import MissingPersonFormFields from '../components/report/MissingPersonFormFields';
import PhotoSection from '../components/report/PhotoSection';
import SuccessView from '../components/common/SuccessView';
import PosterModal from '../components/poster/PosterModal';

function ReportMissing() {
  const { t } = useTranslation();
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
          icon="✅"
          title={t('missingSuccessTitle')}
          message={t('missingSuccessMsg')}
          actionButtonText={t('generatePosterBtn')}
          onActionClick={() => setShowPoster(true)}
          buttonText={t('backToList')}
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
        {t('backBtn')}
      </button>

      <h2>{t('reportMissingTitle')}</h2>
      <p style={{ color: '#aaaacc', fontSize: '14px', marginBottom: '24px' }}>
        {t('reportMissingSubtitle')}
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
          {isSubmitting ? t('submittingReport') : t('submitMissingReport')}
        </button>
      </form>
    </div>
  );
}

export default ReportMissing;