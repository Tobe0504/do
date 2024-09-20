import classes from "./ScanQr.module.css";
import { useState } from "react";
import { decryptData, onTasksImport } from "../../HelperFunctions/decryptData";
import { QrReader } from "react-qr-reader";

const ScanQr = () => {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (data: string) => {
    if (data) {
      const decodedData = atob(data);
      const decryptedTasks = decryptData(decodedData, "tasks");
      onTasksImport(decryptedTasks); // Call a function to import the tasks
      setScanResult(decryptedTasks);
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
      <QrReader
        scanDelay={300}
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result?.getText());
          }

          if (!!error) {
            handleError(error);
          }
        }}
        constraints={constraints}
        containerStyle={{ width: "100%", innerHeight: "100%" }}
      />
    </div>
  );
};

export default ScanQr;
