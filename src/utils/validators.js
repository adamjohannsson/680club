// Validate that a string has proper email format
const isValidEmail = ({ email }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export { isValidEmail };
