import classes from "./ScanQr.module.css";
import { useContext, useState } from "react";
import {
  decryptData,
  getLocalStorage,
  onTasksImport,
} from "../../HelperFunctions/decryptData";
import { Scanner } from "@yudiel/react-qr-scanner";
import { TaskContext } from "../../Context/TaskContext";

const ScanQr = () => {
  // Context
  const { setTaskState } = useContext(TaskContext);

  const handleScan = (data: string) => {
    if (data) {
      const decodedData = atob(data);
      const decryptedTasks = decryptData(decodedData, "tasks", true);

      onTasksImport(decryptedTasks);

      setTaskState(decryptedTasks);
    }
  };

  console.log(getLocalStorage("do-todos", "tasks"));

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
        // containerStyle={{ width: "100%", innerHeight: "100%" }}
      />
    </div>
  );
};

export default ScanQr;
