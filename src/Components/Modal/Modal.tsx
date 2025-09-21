import classes from "./Modal.module.css";
import ReactDom from "react-dom";
import Close from "../../Assets/Icons/Close";
import { X } from "lucide-react";
import { useEffect } from "react";

const BackDrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal} style={props.style}>
      <X
        color={props.isLight ? "#000" : "#fff"}
        onClick={() => props.onClose()}
        size={20}
        style={{ cursor: "pointer" }}
      />
      <div>{props.body}</div>
    </div>
  );
};

const backdropContainer = document.getElementById("backdrop");
const modalOverlay = document.getElementById("modal-overlay");

// const Modal = (props: any) => {
//   // Effects
//   useEffect(() => {
//     const scrollBarWidth =
//       window.innerWidth - document.documentElement.clientWidth;
//     document.body.style.setProperty(
//       "--scrollbar-compensation",
//       `${scrollBarWidth}px`
//     );
//     document.body.classList.add("modal-open");

//     return () => {
//       document.body.classList.remove("modal-open");
//       document.body.style.removeProperty("--scrollbar-compensation");
//     };
//   }, []);

//   return (
//     <div className={classes.container}>
//       {ReactDom.createPortal(
//         <BackDrop onClick={props.onClose} />,
//         backdropContainer || document.body
//       )}
//       {ReactDom.createPortal(
//         <ModalOverlay
//           header={props.header}
//           body={props.body}
//           onClose={props.onClose}
//           style={props.style}
//         />,
//         modalOverlay || document.body
//       )}
//     </div>
//   );
// };

const Modal = (props: any) => {
  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty(
      "--scrollbar-compensation",
      `${scrollBarWidth}px`
    );
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.removeProperty("--scrollbar-compensation");
    };
  }, []);

  return (
    <>
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
    </>
  );
};

export default Modal;
