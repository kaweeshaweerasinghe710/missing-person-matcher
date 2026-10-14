import React from 'react';

function MissingPersonFormFields({ form, onChange }) {
  return (
    <>
      <div className="form-group">
        <label>Full Name </label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder=" Kamal Perera"
        />
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Age </label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={onChange}
            required
            placeholder=" 45"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Gender </label>
          <select name="gender" value={form.gender} onChange={onChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Last Seen Date </label>
          <input
            name="lastSeenDate"
            type="date"
            value={form.lastSeenDate}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Last Seen Location </label>
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
        <label>Clothing </label>
        <input
          name="clothing"
          value={form.clothing}
          onChange={onChange}
          required
          placeholder=" Blue collared shirt, black trousers, brown shoes"
        />
      </div>

      <div className="form-group">
        <label>Contact Number</label>
        <input
          name="contactNumber"
          value={form.contactNumber}
          onChange={onChange}
          required
          placeholder="077XXXXXXX"
        />
      </div>

      <div className="form-group">
        <label>Additional Marks</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={3}
          placeholder="Height, skin tone, scars, tattoos, medical conditions, etc."
        />
      </div>
    </>
  );
}

export default MissingPersonFormFields;
