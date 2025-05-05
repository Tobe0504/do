import classes from "./GradientCard.module.css";

type GradientCardTypes = {
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const GradientCard = ({
  isActive,
  children,
  onClick,
  className,
}: GradientCardTypes) => {
  return (
    <div
      className={`${classes.outerContainer} ${
        isActive ? classes?.active : classes.inActive
      } ${className}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className={classes.container}>
        <div className={classes.gradient}>{children}</div>
      </div>
    </div>
  );
};

export default GradientCard;
