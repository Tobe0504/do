import classes from "./Modal.module.css";
import ReactDom from "react-dom";
import Close from "../../Assets/Icons/Close";

const BackDrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal} style={props.style}>
      <Close onClick={() => props.onClose()} />
      <div>{props.body}</div>
    </div>
  );
};

const backdropContainer = document.getElementById("backdrop");
const modalOverlay = document.getElementById("modal-overlay");

const Modal = (props: any) => {
  return (
    <div className={classes.container}>
      {ReactDom.createPortal(
        <BackDrop onClick={props.onClose} />,
        backdropContainer || document.body
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          header={props.header}
          body={props.body}
          onClose={props.onClose}
          style={props.style}
        />,
        modalOverlay || document.body
      )}
    </div>
  );
};

export default Modal;
