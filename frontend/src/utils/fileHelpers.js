export const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select an image file (PNG, JPG, JPEG, WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString();
  } catch {
    return dateStr;
  }
};

export const truncateText = (text, maxLength = 35) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
