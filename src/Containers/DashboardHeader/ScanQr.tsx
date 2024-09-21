import classes from "./ScanQr.module.css";
import { useContext } from "react";
import { decryptData, onTasksImport } from "../../HelperFunctions/decryptData";
import { Scanner } from "@yudiel/react-qr-scanner";
import { TaskContext } from "../../Context/TaskContext";

type ScanQrTypes = {
  onClick: () => void;
};

const ScanQr = ({ onClick }: ScanQrTypes) => {
  // Context
  const { setTaskState } = useContext(TaskContext);

  const handleScan = (data: string) => {
    if (data) {
      const decodedData = atob(data);
      const decryptedTasks = decryptData(decodedData, "tasks", true);

      onTasksImport(decryptedTasks);

      setTaskState(decryptedTasks);

      onClick();
    }
  };

  const handleError = (err: any) => {
    console.error("QR scan error:", err);
  };

  const constraints: MediaTrackConstraints = {
    facingMode: "environment",
  };

  return (
    <div className={classes.container}>
      <Scanner
        scanDelay={300}
        onScan={(result) => {
          if (!!result) {
            handleScan(result[0].rawValue);
            console.log(result[0]);
          }

          if (!result) {
            handleError("Error reading");
          }
        }}
        constraints={constraints}
        classNames={{
          container: classes.qrScanner, // Custom class for the container
          video: classes.qrScannerVideo, // Custom class for the video element
        }}
      />
      <p>Place barcode close enough to fit the camera box</p>
    </div>
  );
};

export default ScanQr;
