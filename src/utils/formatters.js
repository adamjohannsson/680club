const formatCreditCardNumber = ({ number, mask = true }) => {
  // Make sure number is string
  const numberString = number.toString();
  // Remove all non-digits
  const digitsOnly = numberString.replace(/\D/g, '');
  // Explode number into 4 character chunks
  const chunks = digitsOnly.match(/.{1,4}/g);

  if (mask) {
    // Replace characters in middle chunks with *
    const maskedChunks = chunks.map((chunk, index) => {
      if (index !== 0 && index !== chunks.length - 1) {
        return chunk.replace(/\d/g, '*');
      }
      return chunk;
    });

    // Return masked chunks separated by spaces
    return maskedChunks.join(' ');
  }

  // Return unmasked chunks separated by spaces
  return chunks.join(' ');
};

const formatDate = ({ timestamp, includeTime = true }) => {
  const date = new Date(timestamp);

  // Convert date to string with format "2024-Jan-01 23:00"
  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  const hour = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    hour12: false,
  });
  const minute = date.toLocaleTimeString('en-US', { minute: '2-digit' });

  return `${day} ${month} ${year}${includeTime ? ` at ${hour}:${minute}` : ''}`;
};

export { formatDate, formatCreditCardNumber };
