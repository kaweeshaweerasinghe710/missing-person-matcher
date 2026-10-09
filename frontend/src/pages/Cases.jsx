import { useEffect, useState } from 'react';
import { getAllMissingPersons } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Cases() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllMissingPersons()
      .then(res => setCases(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = cases.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.lastSeenLocation?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cases-page">
      <div style={{ display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '24px' }}>
        <h2>📋 Missing Person Cases</h2>
        <button className="back-btn" onClick={() => navigate('/')}>← Home</button>
      </div>

      {/* Search */}
      <div className="form-group">
        <input
          placeholder="🔍 Search by name or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px',
                   backgroundColor: '#12122a', border: '1px solid #2a2a4a',
                   borderRadius: '6px', color: '#ffffff',
                   fontSize: '14px', outline: 'none', marginBottom: '24px' }}
        />
      </div>

      {loading && <p style={{ color: '#aaaacc' }}>Loading cases...</p>}

      {!loading && filtered.length === 0 && (
        <p style={{ color: '#aaaacc' }}>No cases found.</p>
      )}

      {filtered.map((c) => (
        <div key={c.id} className="case-card">
          <h3>👤 {c.name} — {c.age} yrs ({c.gender})</h3>
          <p>📍 Last seen: <strong style={{ color: '#fff' }}>{c.lastSeenLocation}</strong></p>
          <p>📞 Contact: {c.contactNumber}</p>
          <p>📝 {c.description}</p>
          <p style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>
            🕐 {new Date(c.createdAt).toLocaleDateString()}
          </p>
          <span className={`status-badge ${c.status === 'MISSING' ? 'missing' : 'found'}`}>
            {c.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Cases;