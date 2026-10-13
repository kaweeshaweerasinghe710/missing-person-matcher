import { useState } from 'react';
import { reportMissingPerson } from '../services/api';
import { readFileAsDataUrl } from '../utils/fileHelpers';
import { generateAppearanceVariations } from '../services/aiService';

export const useReportMissingForm = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    lastSeenLocation: '',
    lastSeenDate: '',
    clothing: '',
    contactNumber: '',
    photoUrl: '',
    description: '',
  });

  const [uploadedOriginal, setUploadedOriginal] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [variations, setVariations] = useState([]);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPerson, setCreatedPerson] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64Data = await readFileAsDataUrl(file);
      setUploadedOriginal(base64Data);
      setForm((prev) => ({ ...prev, photoUrl: base64Data }));
      setSelectedImageIndex(0);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGenerateVariations = () => {
    if (!aiPrompt.trim()) {
      alert('Please enter an AI prompt or select a preset tag to describe how they might look.');
      return;
    }

    setGeneratingAi(true);
    const generated = generateAppearanceVariations(aiPrompt, form.gender, form.age);

    setTimeout(() => {
      setVariations(generated);
      setGeneratingAi(false);
    }, 1200);
  };

  const handleSelectImage = (url, index) => {
    setForm((prev) => ({ ...prev, photoUrl: url }));
    setSelectedImageIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await reportMissingPerson(form);
      setCreatedPerson(res.data || form);
      setIsSuccess(true);
    } catch {
      alert('Error submitting report. Please make sure the backend is running.');
    }
    setIsSubmitting(false);
  };

  return {
    form,
    handleChange,
    handleFileUpload,
    selectedImageIndex,
    aiPrompt,
    setAiPrompt,
    handleGenerateVariations,
    generatingAi,
    variations,
    uploadedOriginal,
    handleSelectImage,
    handleSubmit,
    isSubmitting,
    isSuccess,
    createdPerson,
  };
};
