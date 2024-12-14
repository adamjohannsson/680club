const Card = ({ children, backgroundColor = 'grayscale-0' }) => {
  return (
    <div className={`background-${backgroundColor}`} style={{ border: '1px solid #D5D7DA', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
      {children}
    </div>
  );
}

export default Card;