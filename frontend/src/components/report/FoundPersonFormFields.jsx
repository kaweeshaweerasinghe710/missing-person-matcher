import React from 'react';

function FoundPersonFormFields({
  foundDate,
  onDateChange,
  reporterContact,
  onContactChange,
  notes,
  onNotesChange,
}) {
  return (
    <>
      {onDateChange && (
        <div className="form-group">
          <label> Date Spotted </label>
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
          Finder  Contact *
        </label>
        <input
          value={reporterContact}
          onChange={onContactChange}
          required
          placeholder=" 077XXXXXXX "
        />
      </div>

      <div className="form-group" style={{ marginBottom: '18px' }}>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
          Condition & Clothes Notes
        </label>
        <textarea
          value={notes}
          onChange={onNotesChange}
          rows={3}
        />
      </div>
    </>
  );
}

export default FoundPersonFormFields;
