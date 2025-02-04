const StepCircleCheck = ({ dimensions, stroke, fill }) => {
  return (
    <svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_6855_3248)">
        <path
          d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
          fill={fill}
        />
        <path
          d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
          fill={stroke}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.096 7.39162L9.93602 14.3016L8.03602 12.2716C7.68602 11.9416 7.13602 11.9216 6.73602 12.2016C6.34602 12.4916 6.23602 13.0016 6.47602 13.4116L8.72602 17.0716C8.94602 17.4116 9.32601 17.6216 9.75601 17.6216C10.166 17.6216 10.556 17.4116 10.776 17.0716C11.136 16.6016 18.006 8.41162 18.006 8.41162C18.906 7.49162 17.816 6.68162 17.096 7.38162V7.39162Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_6855_3248">
          <path
            d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
            fill={fill}
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StepCircleCheck;
