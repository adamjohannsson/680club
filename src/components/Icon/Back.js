const Back = ({ dimensions, stroke, fill }) => {
  return (
    <svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8327 9.9974H4.16602M4.16602 9.9974L9.99935 15.8307M4.16602 9.9974L9.99935 4.16406"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Back;
