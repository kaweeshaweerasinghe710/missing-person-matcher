import { useState } from 'react';
import { reportFoundPerson } from '../services/api';
import { useCamera } from './useCamera';
import { useGeolocation } from './useGeolocation';
import { readFileAsDataUrl } from '../utils/fileHelpers';

export const useReportFoundForm = () => {
  const [form, setForm] = useState({
    foundDate: new Date().toISOString().split('T')[0],
    reporterContact: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const camera = useCamera(true);
  const geo = useGeolocation(true);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

    if (!camera.capturedImage) {
      alert('Please take or upload a photo of the found person.');
      return;
    }

    setIsSubmitting(true);
    try {
      await reportFoundPerson({
        ...form,
        foundLocation: geo.locationName || 'Unknown location',
        gpsCoordinates: geo.coordinates,
        photoUrl: camera.capturedImage,
      });
      setIsSuccess(true);
    } catch {
      alert('Error submitting report. Please make sure the backend is running.');
    }
    setIsSubmitting(false);
  };

  return {
    form,
    handleChange,
    camera,
    geo,
    handleDeviceUpload,
    handleSubmit,
    isSubmitting,
    isSuccess,
  };
};
