import React from 'react';
import { useTranslation } from 'react-i18next';
import { AI_PROMPT_PRESETS } from '../../services/aiService';

function AiVariationPicker({
  prompt,
  onPromptChange,
  onApplyPreset,
  onGenerate,
  isGenerating,
  variations,
  uploadedOriginal,
  selectedImageIndex,
  onSelectImage,
}) {
  const { t } = useTranslation();

  return (
    <div className="ai-variations-box">
      <div className="ai-variations-header">
        <span style={{ fontSize: '16px' }}>✨</span>
        <strong>{t('aiSectionTitle')}</strong>
      </div>
      <p className="ai-variations-subtitle">
        {t('aiSectionSubtitle')}
      </p>

      <div className="ai-presets-container">
        {AI_PROMPT_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onApplyPreset(preset)}
            className="ai-preset-tag"
          >
            + {preset}
          </button>
        ))}
      </div>

      <div className="ai-prompt-input-row">
        <input
          type="text"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder={t('aiPromptPlaceholder')}
          className="ai-prompt-input"
        />
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="btn-generate-ai"
        >
          {isGenerating ? t('generatingBtn') : t('generateBtn')}
        </button>
      </div>

      {(variations.length > 0 || uploadedOriginal) && (
        <div style={{ marginTop: '16px' }}>
          <div className="variations-strip-hint">
            {t('clickToSelectPhoto')}
          </div>

          <div className="variations-thumbnails-grid">
            {uploadedOriginal && (
              <div
                onClick={() => onSelectImage(uploadedOriginal, 0)}
                className={`thumb-card ${selectedImageIndex === 0 ? 'thumb-selected' : ''}`}
              >
                <img src={uploadedOriginal} alt="Original" className="thumb-img" />
                <div className="thumb-label">
                  {selectedImageIndex === 0 ? `✓ ${t('originalPhoto')}` : t('originalPhoto')}
                </div>
              </div>
            )}

            {variations.map((v) => (
              <div
                key={v.id}
                onClick={() => onSelectImage(v.url, v.id)}
                className={`thumb-card ${selectedImageIndex === v.id ? 'thumb-selected' : ''}`}
              >
                <img
                  src={v.url}
                  alt={v.title}
                  loading="lazy"
                  className="thumb-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="thumb-label">
                  {selectedImageIndex === v.id ? `✓ ${v.title}` : v.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AiVariationPicker;
