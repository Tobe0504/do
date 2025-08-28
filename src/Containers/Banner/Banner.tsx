import classes from "./Banner.module.css";

interface Props {
  bgImage: string;
  text: string;
}

const Banner: React.FC<Props> = ({ bgImage, text }) => {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className={classes.container}
    >
      <p>{text}</p>
      <div></div>
    </div>
  );
};

export default Banner;
