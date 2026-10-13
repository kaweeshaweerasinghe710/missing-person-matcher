export const AI_PROMPT_PRESETS = [
  'Aged 5 years older',
  'With beard and moustache',
  'Wearing reading glasses',
  'Short cropped haircut',
  'Aged 10 years older, graying hair'
];

export const generateAppearanceVariations = (prompt, gender = 'person', age = 30) => {
  const modifiers = [
    'aged 4 years older, realistic portrait',
    'wearing glasses, realistic portrait photo',
    'different hairstyle, updated look',
    'aged portrait, realistic photography',
    'candid photo, updated look, portrait'
  ];

  const estimatedAge = age ? parseInt(age) + 4 : 'adult';
  const personDesc = `${gender || 'person'}, ${estimatedAge} years old, South Asian, ${prompt}`;
  const timestamp = Date.now();

  return modifiers.map((mod, index) => {
    const fullPrompt = `${personDesc}, ${mod}`;
    const encoded = encodeURIComponent(fullPrompt);
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=400&height=400&seed=${timestamp + index * 101}`;

    return {
      id: index + 1,
      title: `Variation ${index + 1}`,
      description: mod.split(',')[0],
      url,
    };
  });
};
