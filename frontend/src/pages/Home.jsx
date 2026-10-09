import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllMissingPersons, getAllFoundPersons } from '../services/api';

function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ missing: 0, found: 0 });

  useEffect(() => {
    Promise.all([getAllMissingPersons(), getAllFoundPersons()])
      .then(([missingRes, foundRes]) => {
        setStats({
          missing: missingRes.data.length,
          found: foundRes.data.length,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="hero">
        <h1>MISSING PERSON MATCHER</h1>
        <p>AI-Powered Missing Person Identification</p>
      </div>
      <div className="cards-grid">
        <div className="card">
          <div className="card-header red">REPORT MISSING PERSON</div>
          <div className="card-body">
            <div className="card-icon">👤</div>
            <p>Submit a missing person report with details and photos</p>
            <button className="card-btn red"
              onClick={() => navigate('/report-missing')}>
              REPORT NOW
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header green">REPORT FOUND PERSON</div>
          <div className="card-body">
            <div className="card-icon">🤝</div>
            <p>Submit details of a person found or located</p>
            <button className="card-btn green"
              onClick={() => navigate('/report-found')}>
              REPORT NOW
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header blue">VIEW CASES</div>
          <div className="card-body">
            <div className="card-icon">👁️</div>
            <p>Browse, search, and manage all missing and found person cases</p>
            <button className="card-btn blue"
              onClick={() => navigate('/cases')}>
              VIEW CASES
            </button>
          </div>
        </div>
      </div>
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-icon">🔴</span>
          <div>
            <div className="stat-label">Current Cases</div>
            <div className="stat-value">{stats.missing}</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">✅</span>
          <div>
            <div className="stat-label">Persons Located</div>
            <div className="stat-value">{stats.found}</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📋</span>
          <div>
            <div className="stat-label">Total Reports</div>
            <div className="stat-value">{stats.missing + stats.found}</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🤖</span>
          <div>
            <div className="stat-label">AI Matches</div>
            <div className="stat-value">0</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;