const EditIcon = ({ props, color = "#6C7984" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1174_5350)">
        <path
          d="M3.33337 16.6669H6.66671L15.4167 7.91691C15.8587 7.47488 16.1071 6.87536 16.1071 6.25024C16.1071 5.62512 15.8587 5.0256 15.4167 4.58358C14.9747 4.14155 14.3752 3.89322 13.75 3.89322C13.1249 3.89322 12.5254 4.14155 12.0834 4.58358L3.33337 13.3336V16.6669Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.25 5.41666L14.5833 8.74999"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1174_5350">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EditIcon;
