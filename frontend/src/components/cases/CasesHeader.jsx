import React from 'react';
import { useTranslation } from 'react-i18next';

function CasesHeader({ count = 0, searchValue = '', onSearchChange }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="cases-header">
        <h2 className="cases-title">
          📋 {t('directoryTitle')}
          <span className="cases-count">({count} {t('reportedCases')})</span>
        </h2>
        <p className="cases-subtitle">
          {t('directorySubtitle')}
        </p>
      </div>

      <input
        placeholder={t('searchPlaceholder')}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="cases-search-bar"
      />
    </>
  );
}

export default CasesHeader;
