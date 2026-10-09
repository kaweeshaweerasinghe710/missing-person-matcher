import { useState } from 'react';
import { reportMissingPerson } from '../services/api';
import { useNavigate } from 'react-router-dom';

function ReportMissing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', age: '', gender: '',
    lastSeenLocation: '', contactNumber: '', description: '',
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
      alert('Error submitting. Try again.');
    }
    setLoading(false);
  };

  if (success) return (
    <div className="success-page">
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
      <h2>Report Submitted!</h2>
      <p>We will notify you when a match is found.</p>
      <button className="card-btn blue" style={{ width: 'auto', padding: '12px 30px' }}
        onClick={() => navigate('/')}>
        ← Back to Home
      </button>
    </div>
  );

  return (
    <div className="form-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      <h2>📢 Report Missing Person</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" value={form.name}
            onChange={handleChange} required placeholder="e.g. Kamal Perera" />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Age</label>
            <input name="age" type="number" value={form.age}
              onChange={handleChange} required placeholder="e.g. 45" />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Gender</label>
            <select name="gender" value={form.gender}
              onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Last Seen Location</label>
          <input name="lastSeenLocation" value={form.lastSeenLocation}
            onChange={handleChange} required placeholder="e.g. Kandy Bus Stand" />
        </div>

        <div className="form-group">
          <label>Your Contact Number</label>
          <input name="contactNumber" value={form.contactNumber}
            onChange={handleChange} required placeholder="e.g. 077XXXXXXX" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description}
            onChange={handleChange} rows={3} required
            placeholder="Physical description, clothing, etc."
            style={{ width: '100%', padding: '12px', backgroundColor: '#0d0d1a',
                     border: '1px solid #2a2a4a', borderRadius: '6px',
                     color: '#ffffff', fontSize: '14px', outline: 'none',
                     resize: 'vertical' }} />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}

export default ReportMissing;