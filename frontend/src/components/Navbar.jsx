import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './common/LanguageSwitcher';

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        {t('appTitle')}
      </Link>
      <div className="navbar-right-section">
        <ul className="navbar-links">
          <li>
            <Link to="/">{t('missingPersons')}</Link>
          </li>
          <li>
            <Link to="/report-missing" style={{ color: '#e74c3c', fontWeight: 'bold' }}>
              {t('reportMissing')}
            </Link>
          </li>
          <li>
            <Link to="/report-found" style={{ color: '#2ecc71', fontWeight: 'bold' }}>
              {t('reportFound')}
            </Link>
          </li>
        </ul>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;
