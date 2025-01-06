const isWeb = () => {
  // WARNING: if you change this value, also modify CSS class '.desktop-box' max-width property
  return window.innerWidth > 768 ? true : false;
};

const responsive = {
  isWeb,
};

export default responsive;
