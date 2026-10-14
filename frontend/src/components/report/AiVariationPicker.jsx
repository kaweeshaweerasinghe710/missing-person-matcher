import React from 'react';
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
  return (
    <div className="ai-variations-box">
      <div className="ai-variations-header">
        <strong>Generate Appearance Variations using AI (Optional)</strong>
      </div>
      <p className="ai-variations-subtitle">
        Simulate how this person might look now (e.g., aged, beard, glasses, changed hair).
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
          placeholder="e.g. Aged 4 years, has grown a beard, wears glasses"
          className="ai-prompt-input"
        />
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="btn-generate-ai"
        >
          {isGenerating ? 'Generating...' : ' Generate 5 Variations'}
        </button>
      </div>

      {(variations.length > 0 || uploadedOriginal) && (
        <div style={{ marginTop: '16px' }}>
          <div className="variations-strip-hint">
            Click any image below to select it as the report's main photo:
          </div>

          <div className="variations-thumbnails-grid">
            {uploadedOriginal && (
              <div
                onClick={() => onSelectImage(uploadedOriginal, 0)}
                className={`thumb-card ${selectedImageIndex === 0 ? 'thumb-selected' : ''}`}
              >
                <img src={uploadedOriginal} alt="Original" className="thumb-img" />
                <div className="thumb-label">
                  {selectedImageIndex === 0 ? '✓ Original' : 'Original'}
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
