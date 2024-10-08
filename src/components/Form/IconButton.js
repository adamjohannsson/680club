const IconButton = ({ icon, onClick }) => {
  return (
    <div className="IconButton sm" onClick={onClick}>
      {icon}
    </div>
  );
};

export default IconButton;
