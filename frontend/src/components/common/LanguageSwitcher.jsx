import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('appLanguage', lang);
  };

  const currentLang = i18n.language || 'en';

  return (
    <div className="language-switcher-group">
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('si')}
        className={`lang-btn ${currentLang === 'si' ? 'active' : ''}`}
      >
        සිං
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('ta')}
        className={`lang-btn ${currentLang === 'ta' ? 'active' : ''}`}
      >
        த
      </button>
    </div>
  );
}

export default LanguageSwitcher;
