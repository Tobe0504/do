import classes from "./QrModalBody.module.css";

type QrModalBodyType = { url: string };

const QrModalBody = ({ url }: QrModalBodyType) => {
  return (
    <div className={classes.container}>
      <div className={classes.imageSection}>
        <img src={url} alt="QR Code" />
      </div>

      <p>Scan code to share your to-dos on other devices!</p>
    </div>
  );
};

export default QrModalBody;
