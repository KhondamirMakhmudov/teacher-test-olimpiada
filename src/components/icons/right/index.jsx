const RightIcon = ({ props, color = "black", classname }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6169 10L7.1678 5.0814C6.94407 4.83401 6.94407 4.43292 7.1678 4.18554C7.39153 3.93815 7.75428 3.93815 7.97801 4.18554L12.8322 9.55207C13.0559 9.79945 13.0559 10.2005 12.8322 10.4479L7.97801 15.8145C7.75428 16.0618 7.39153 16.0618 7.1678 15.8145C6.94407 15.5671 6.94407 15.166 7.1678 14.9186L11.6169 10Z"
        fill={color}
      />
    </svg>
  );
};

export default RightIcon;
