import { useEffect, useState } from 'react';
import { getAllMissingPersons, markAsFound } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Cases() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null); // modal

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = () => {
    getAllMissingPersons()
      .then(res => setCases(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleMarkFound = async (id) => {
    if (!window.confirm('Mark this person as FOUND?')) return;
    try {
      await markAsFound(id);
      setCases(prev => prev.map(c =>
        c.id === id ? { ...c, status: 'FOUND' } : c
      ));
      if (selected && selected.id === id) {
        setSelected(prev => ({ ...prev, status: 'FOUND' }));
      }
    } catch {
      alert('Error updating status. Please verify backend is running.');
    }
  };

  const filtered = cases.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.lastSeenLocation?.toLowerCase().includes(search.toLowerCase()) ||
    c.clothing?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>

      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: 0 }}>📋 Missing Persons
            <span style={{ fontSize: '14px', color: '#aaaacc', marginLeft: '12px' }}>
              ({filtered.length} reported)
            </span>
          </h2>
          <p style={{ color: '#aaaacc', fontSize: '13px', margin: '4px 0 0' }}>
            Help spot and reunite missing individuals with their families
          </p>
        </div>
        <button
          onClick={() => navigate('/report-missing')}
          style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none',
                   padding: '12px 24px', borderRadius: '8px', fontSize: '14px',
                   fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px' }}>
          + Report Missing Person
        </button>
      </div>

      <input
        placeholder="🔍 Search by name, location, or clothing..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '12px 16px', marginBottom: '28px',
                 backgroundColor: '#12122a', border: '1px solid #2a2a4a',
                 borderRadius: '8px', color: '#ffffff', fontSize: '14px',
                 outline: 'none', boxSizing: 'border-box' }}
      />

      {loading && <p style={{ color: '#aaaacc' }}>Loading cases...</p>}
      {!loading && filtered.length === 0 &&
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#12122a', borderRadius: '12px', border: '1px solid #1e1e3a' }}>
          <p style={{ color: '#aaaacc', fontSize: '16px', marginBottom: '16px' }}>No missing person reports found.</p>
          <button
            onClick={() => navigate('/report-missing')}
            style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
            Report the First Case
          </button>
        </div>}

      <div style={{ display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '20px' }}>
        {filtered.map((c) => (
          <div key={c.id} style={{
            backgroundColor: '#12122a',
            border: `1px solid ${c.status === 'FOUND' ? '#27ae60' : '#1e1e3a'}`,
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div>
              <div style={{
                width: '100%', height: '190px',
                backgroundColor: '#1a1a35',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative'
              }}>
                {c.photoUrl ? (
                  <img src={c.photoUrl} alt={c.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <span style={{ fontSize: '64px', opacity: 0.4 }}>👤</span>
                )}
                <span style={{
                  position: 'absolute', top: '10px', right: '10px',
                  backgroundColor: c.status === 'FOUND' ? '#27ae60' : '#e74c3c',
                  color: 'white', padding: '3px 10px', borderRadius: '20px',
                  fontSize: '11px', fontWeight: '700'
                }}>
                  {c.status}
                </span>
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '18px', margin: '0 0 6px 0', color: '#ffffff' }}>{c.name}</h3>
                <p style={{ color: '#aaaacc', fontSize: '13px', margin: '0 0 8px 0' }}>
                  {c.age} yrs • {c.gender}
                </p>

                {c.lastSeenDate && (
                  <p style={{ color: '#ddd', fontSize: '13px', margin: '0 0 4px 0' }}>
                    📅 <strong>Last Seen:</strong> {c.lastSeenDate}
                  </p>
                )}

                <p style={{ color: '#ddd', fontSize: '13px', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  📍 <strong>Location:</strong> {c.lastSeenLocation}
                </p>

                {c.clothing && (
                  <p style={{ color: '#aaaacc', fontSize: '12px', margin: '0 0 6px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    👕 <strong>Dress:</strong> {c.clothing}
                  </p>
                )}
              </div>
            </div>
            <div style={{ padding: '0 16px 16px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSelected(c)}
                style={{ flex: 1, padding: '10px 8px', backgroundColor: '#1e1e3a',
                         color: '#ffffff', border: '1px solid #2a2a4a',
                         borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                More Details
              </button>
              {c.status === 'MISSING' ? (
                <button
                  onClick={() => handleMarkFound(c.id)}
                  style={{ flex: 1, padding: '10px 8px', backgroundColor: '#27ae60',
                           color: 'white', border: 'none',
                           borderRadius: '6px', cursor: 'pointer',
                           fontSize: '12px', fontWeight: '700' }}>
                  ✓ Found
                </button>
              ) : (
                <span style={{ flex: 1, textAlign: 'center', padding: '10px 8px', backgroundColor: '#1b3b28', color: '#27ae60', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                  Located
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '20px'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            backgroundColor: '#12122a', borderRadius: '14px',
            padding: '32px', width: '100%', maxWidth: '520px',
            border: '1px solid #2a2a4a', position: 'relative',
            maxHeight: '90vh', overflowY: 'auto'
          }}>

            <button onClick={() => setSelected(null)} style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'none', border: 'none', color: '#aaaacc',
              fontSize: '22px', cursor: 'pointer'
            }}>✕</button>


            <div style={{ width: '110px', height: '110px', borderRadius: '50%',
                          backgroundColor: '#1a1a35', margin: '0 auto 16px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          overflow: 'hidden', border: '2px solid #2a2a4a' }}>
              {selected.photoUrl
                ? <img src={selected.photoUrl} alt={selected.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: '50px' }}>👤</span>
              }
            </div>

            <h2 style={{ textAlign: 'center', margin: '0 0 6px 0' }}>{selected.name}</h2>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{
                backgroundColor: selected.status === 'FOUND' ? '#27ae60' : '#e74c3c',
                color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700'
              }}>{selected.status}</span>
            </div>

            {[
              { label: 'Age', value: `${selected.age} years` },
              { label: 'Gender', value: selected.gender },
              { label: 'Last Seen Date', value: selected.lastSeenDate },
              { label: 'Last Seen Location', value: selected.lastSeenLocation },
              { label: 'Clothing / Dress', value: selected.clothing },
              { label: 'Contact', value: selected.contactNumber },
              { label: 'Description', value: selected.description },
              { label: 'Reported Date', value: selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : '—' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', marginBottom: '12px',
                                        borderBottom: '1px solid #1e1e3a', paddingBottom: '10px' }}>
                <span style={{ color: '#aaaacc', fontSize: '13px', width: '140px',
                                flexShrink: 0, fontWeight: '500' }}>{label}</span>
                <span style={{ fontSize: '13px', color: '#ffffff', wordBreak: 'break-word' }}>{value || '—'}</span>
              </div>
            ))}

            {selected.status === 'MISSING' && (
              <button
                onClick={() => handleMarkFound(selected.id)}
                style={{ width: '100%', padding: '14px', backgroundColor: '#27ae60',
                         color: 'white', border: 'none', borderRadius: '8px',
                         fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                         marginTop: '12px' }}>
                ✓ Mark this Person as Found
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cases;