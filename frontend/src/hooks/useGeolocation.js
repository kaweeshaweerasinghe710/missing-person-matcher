import { useState, useCallback, useEffect } from 'react';

export const useGeolocation = (autoFetch = false) => {
  const [coordinates, setCoordinates] = useState('');
  const [locationName, setLocationName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatusMessage('Geolocation is not supported by your browser.');
      return;
    }

    setIsFetching(true);
    setStatusMessage('Detecting GPS location...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const coordsStr = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        setCoordinates(coordsStr);

        let detectedName = `GPS: ${coordsStr}`;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          if (res.ok) {
            const data = await res.json();
            detectedName = data.display_name || coordsStr;
            const shortCity = data.address?.city || data.address?.town || data.address?.village || coordsStr;
            setStatusMessage(` Location detected: ${shortCity}`);
          } else {
            setStatusMessage(` GPS coordinates: ${coordsStr}`);
          }
        } catch {
          setStatusMessage(` GPS coordinates: ${coordsStr}`);
        }

        setLocationName(detectedName);
        setIsFetching(false);
      },
      () => {
        setIsFetching(false);
        setStatusMessage(' GPS access denied or unavailable. Please enter location manually.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchLocation();
    }
  }, [autoFetch, fetchLocation]);

  return {
    coordinates,
    locationName,
    statusMessage,
    isFetching,
    fetchLocation,
    setLocationName,
  };
};
