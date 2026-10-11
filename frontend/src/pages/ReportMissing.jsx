import { useState } from 'react';
import { reportMissingPerson } from '../services/api';
import { useNavigate } from 'react-router-dom';

function ReportMissing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    lastSeenLocation: '',
    lastSeenDate: '',
    clothing: '',
    contactNumber: '',
    photoUrl: '',
    description: '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await reportMissingPerson(form);
      setSuccess(true);
    } catch {
      alert('Error submitting report. Please make sure the backend is running.');
    }
    setLoading(false);
  };

  if (success) return (
    <div className="success-page">
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
      <h2>Report Submitted Successfully!</h2>
      <p>The missing person record has been published. We will notify you when a match is detected.</p>
      <button className="card-btn blue" style={{ width: 'auto', padding: '12px 30px' }}
        onClick={() => navigate('/')}>
        ← Back to Missing Persons List
      </button>
    </div>
  );

  return (
    <div className="form-page" style={{ maxWidth: '600px' }}>
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      <h2>📢 Report Missing Person</h2>
      <p style={{ color: '#aaaacc', fontSize: '14px', marginBottom: '24px' }}>
        Please provide accurate details to help identify and locate the missing individual.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Kamal Perera"
          />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Age *</label>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              required
              placeholder="e.g. 45"
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Gender *</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Last Seen Date *</label>
            <input
              name="lastSeenDate"
              type="date"
              value={form.lastSeenDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Last Seen Location *</label>
            <input
              name="lastSeenLocation"
              value={form.lastSeenLocation}
              onChange={handleChange}
              required
              placeholder="e.g. Kandy Bus Stand"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Clothing / Dress Worn </label>
          <input
            name="clothing"
            value={form.clothing}
            onChange={handleChange}
            required
            placeholder="e.g. Blue collared shirt, black trousers, brown shoes"
          />
        </div>

        <div className="form-group">
          <label>Photo URL (Image Link)</label>
          <input
            name="photoUrl"
            value={form.photoUrl}
            onChange={handleChange}
            placeholder="e.g. https://example.com/photo.jpg"
          />
          {form.photoUrl && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <img
                src={form.photoUrl}
                alt="Preview"
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #2a2a4a' }}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Contact Number (Family / Reporter) *</label>
          <input
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            required
            placeholder="e.g. 077XXXXXXX"
          />
        </div>

        <div className="form-group">
          <label>Additional Description / Identification Marks</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Height, skin tone, scars, tattoos, medical conditions, etc."
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0d0d1a',
              border: '1px solid #2a2a4a',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting Report...' : 'Submit Missing Person Report'}
        </button>
      </form>
    </div>
  );
}

export default ReportMissing;