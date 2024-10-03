const getLocalStorageItem = ({ key, defaultValue }) => {
  const item = window.localStorage.getItem(key);

  if (!item) {
    window.localStorage.setItem(key, defaultValue);
    return defaultValue;
  }

  return item;
};

export { getLocalStorageItem };
