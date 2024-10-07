// Return text in lowercase, with no diacritics, and with no leading or trailing whitespace
const getNormalizedText = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export { getNormalizedText };
