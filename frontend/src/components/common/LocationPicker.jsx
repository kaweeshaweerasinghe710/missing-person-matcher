import React from 'react';

function LocationPicker({
  value,
  onChange,
  onFetchGps,
  isFetchingGps,
  gpsStatus,
  coordinates,
  label = '📍 Location',
  required = false,
  placeholder = 'Enter location...',
}) {
  return (
    <div className="form-group">
      <div className="form-label-row">
        <label style={{ margin: 0, fontSize: '13px' }}>{label} {required ? '*' : ''}</label>
        <button
          type="button"
          onClick={onFetchGps}
          disabled={isFetchingGps}
          className="btn-refetch-gps"
        >
          {isFetchingGps ? 'Fetching GPS...' : '🔄 Re-fetch GPS'}
        </button>
      </div>

      <input
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />

      {gpsStatus && (
        <p className={`gps-status-text ${gpsStatus.startsWith('📍') ? 'gps-ok' : 'gps-warn'}`}>
          {gpsStatus}
        </p>
      )}

      {coordinates && (
        <p className="gps-coords-display">
          GPS Coordinates: {coordinates}
        </p>
      )}
    </div>
  );
}

export default LocationPicker;
