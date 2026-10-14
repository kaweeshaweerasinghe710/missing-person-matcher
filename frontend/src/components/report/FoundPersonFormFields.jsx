import React from 'react';
import { useTranslation } from 'react-i18next';

function FoundPersonFormFields({
  foundDate,
  onDateChange,
  reporterContact,
  onContactChange,
  notes,
  onNotesChange,
}) {
  const { t } = useTranslation();

  return (
    <>
      {onDateChange && (
        <div className="form-group">
          <label>{t('dateSpotted')}</label>
          <input
            name="foundDate"
            type="date"
            value={foundDate}
            onChange={onDateChange}
            required
          />
        </div>
      )}

      <div className="form-group" style={{ marginBottom: '14px' }}>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
          {t('finderContact')}
        </label>
        <input
          value={reporterContact}
          onChange={onContactChange}
          required
          placeholder="077XXXXXXX"
        />
      </div>

      <div className="form-group" style={{ marginBottom: '18px' }}>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
          {t('conditionNotes')}
        </label>
        <textarea
          value={notes}
          onChange={onNotesChange}
          rows={3}
          placeholder={t('conditionNotesPlaceholder')}
        />
      </div>
    </>
  );
}

export default FoundPersonFormFields;
