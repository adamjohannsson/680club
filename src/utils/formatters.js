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

export { formatDate };
