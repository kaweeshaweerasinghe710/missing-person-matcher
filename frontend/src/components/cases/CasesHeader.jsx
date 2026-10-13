import React from 'react';

function CasesHeader({ count = 0, searchValue = '', onSearchChange }) {
  return (
    <>
      <div className="cases-header">
        <h2 className="cases-title">
           Missing Persons Directory
          <span className="cases-count">({count} reported cases)</span>
        </h2>
        <p className="cases-subtitle">
          Browse missing persons or click "✓ Found" on any card to capture a verification photo and location.
        </p>
      </div>

      <input
        placeholder="🔍 Search by name, location, or clothing..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="cases-search-bar"
      />
    </>
  );
}

export default CasesHeader;
