import { useState } from 'react';
import { useCamera } from './useCamera';
import { useGeolocation } from './useGeolocation';
import { readFileAsDataUrl } from '../utils/fileHelpers';
import { markAsFound, reportFoundPerson } from '../services/api';

export const useFoundVerification = (person, onSuccess) => {
  const [reporterContact, setReporterContact] = useState('');
  const [foundNotes, setFoundNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const camera = useCamera(true);
  const geo = useGeolocation(true);

  const handleDeviceUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      camera.setCapturedImage(dataUrl);
      camera.stopCamera();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!person) return;

    setIsSubmitting(true);
    try {
      await markAsFound(person.id);

      if (camera.capturedImage) {
        try {
          await reportFoundPerson({
            foundLocation: geo.locationName || 'Location recorded at verification',
            foundDate: new Date().toISOString().split('T')[0],
            gpsCoordinates: geo.coordinates,
            reporterContact: reporterContact || 'Direct card verification',
            photoUrl: camera.capturedImage,
            notes: `Spotted verification for missing case: ${person.name}. ${foundNotes}`,
          });
        } catch {}
      }

      onSuccess(person.id);
    } catch {
      alert('Error updating status. Please verify backend is running.');
    }
    setIsSubmitting(false);
  };

  return {
    camera,
    geo,
    reporterContact,
    setReporterContact,
    foundNotes,
    setFoundNotes,
    handleDeviceUpload,
    handleSubmit,
    isSubmitting,
  };
};
