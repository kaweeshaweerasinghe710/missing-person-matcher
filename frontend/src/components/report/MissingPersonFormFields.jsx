import React from 'react';
import { useTranslation } from 'react-i18next';

function MissingPersonFormFields({ form, onChange }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="form-group">
        <label>{t('fullName')}</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder="Kamal Perera"
        />
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>{t('age')}</label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={onChange}
            required
            placeholder="45"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>{t('gender')} *</label>
          <select name="gender" value={form.gender} onChange={onChange} required>
            <option value="">{t('selectGender')}</option>
            <option value="Male">{t('male')}</option>
            <option value="Female">{t('female')}</option>
            <option value="Other">{t('other')}</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>{t('lastSeenDate')} *</label>
          <input
            name="lastSeenDate"
            type="date"
            value={form.lastSeenDate}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>{t('lastSeenLocation')} *</label>
          <input
            name="lastSeenLocation"
            value={form.lastSeenLocation}
            onChange={onChange}
            required
            placeholder="Kandy Bus Stand"
          />
        </div>
      </div>

      <div className="form-group">
        <label>{t('clothingLabel')}</label>
        <input
          name="clothing"
          value={form.clothing}
          onChange={onChange}
          required
          placeholder="Blue shirt, black trousers"
        />
      </div>

      <div className="form-group">
        <label>{t('contactNumber')}</label>
        <input
          name="contactNumber"
          value={form.contactNumber}
          onChange={onChange}
          required
          placeholder="077XXXXXXX"
        />
      </div>

      <div className="form-group">
        <label>{t('addDescription')}</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={3}
          placeholder="Height, skin tone, scars, tattoos, etc."
        />
      </div>
    </>
  );
}

export default MissingPersonFormFields;
