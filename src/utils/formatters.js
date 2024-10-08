const formatDate = ({timestamp}) => {
  const date = new Date(timestamp);

  // Convert date to a string with the format "2024-Feb-20 23:00"
  const datePart = `${date.toLocaleDateString('en-US', {year: 'numeric'})}-${date.toLocaleDateString('en-US', {month: 'short'})}-${date.toLocaleDateString('en-US', {day: 'numeric'})}`;
  const timePart = `${date.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false })}:${date.toLocaleTimeString('en-US', { minute: '2-digit'})}`;

  return `${datePart} at ${timePart}`;
};

export { formatDate };
