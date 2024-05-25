import classes from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
  styleName?: any;
};

const Card = ({ children, styleName }: CardProps) => {
  return <div className={`${classes.container} ${styleName}`}>{children}</div>;
};

export default Card;
