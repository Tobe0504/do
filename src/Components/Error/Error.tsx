import classes from "./Error.module.css";

type ErrorProps = {
  children: React.ReactNode;
  type: "success" | "error";
  notShowIndicator?: boolean;
};

const Error = ({ children, type, notShowIndicator }: ErrorProps) => {
  return (
    <div
      className={classes.container}
      style={
        type === "success"
          ? { border: "none" }
          : { border: "1px solid #dc362e" }
      }
    >
      {!notShowIndicator && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8.66667 10.6667H8V8H7.33333M8 5.33333H8.00667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
            stroke="#2E2E2E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span>{children}</span>
    </div>
  );
};

export default Error;
