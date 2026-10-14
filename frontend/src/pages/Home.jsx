import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllMissingPersons, getAllFoundPersons } from '../services/api';

function Home() {
  const { t } = useTranslation();
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
        <h1>{t('appTitle')}</h1>
        <p>{t('heroSubtitle')}</p>
      </div>
      <div className="cards-grid">
        <div className="card">
          <div className="card-header red">{t('reportMissing')}</div>
          <div className="card-body">
            <div className="card-icon">👤</div>
            <p>{t('reportMissingDesc')}</p>
            <button
              type="button"
              className="card-btn red"
              onClick={() => navigate('/report-missing')}
            >
              {t('reportNow')}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header green">{t('reportFound')}</div>
          <div className="card-body">
            <div className="card-icon">👁️</div>
            <p>{t('reportFoundDesc')}</p>
            <button
              type="button"
              className="card-btn green"
              onClick={() => navigate('/report-found')}
            >
              {t('reportNow')}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header blue">{t('missingPersons')}</div>
          <div className="card-body">
            <div className="card-icon">📋</div>
            <p>{t('viewCasesDesc')}</p>
            <button
              type="button"
              className="card-btn blue"
              onClick={() => navigate('/cases')}
            >
              {t('viewCasesBtn')}
            </button>
          </div>
        </div>
      </div>
      <div className="stats-bar">
        <div className="stat-item">
          <div>
            <div className="stat-label">{t('currentCases')}</div>
            <div className="stat-value">{stats.missing}</div>
          </div>
        </div>
        <div className="stat-item">
          <div>
            <div className="stat-label">{t('personsLocated')}</div>
            <div className="stat-value">{stats.found}</div>
          </div>
        </div>
        <div className="stat-item">
          <div>
            <div className="stat-label">{t('totalReports')}</div>
            <div className="stat-value">{stats.missing + stats.found}</div>
          </div>
        </div>
        <div className="stat-item">
          <div>
            <div className="stat-label">{t('aiMatches')}</div>
            <div className="stat-value">0</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;