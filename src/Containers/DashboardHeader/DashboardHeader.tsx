import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import { TaskContext } from "../../Context/TaskContext";
import { getLocalStorage } from "../../HelperFunctions/decryptData";
import { generateTaskSummary } from "../../HelperFunctions/generateDates";
import { generateTaskQRCode } from "../../HelperFunctions/generateQrCode";
import { getCurrentTime } from "../../HelperFunctions/getTime";
import classes from "./DashboardHeader.module.css";
import QrModalBody from "./QrModalBody";
import ScanQr from "./ScanQr";

const DashboardHeader = () => {
  // States
  const [time, setTime] = useState({
    hours: getCurrentTime().hours,
    minutes: getCurrentTime().minutes,
    seconds: getCurrentTime().seconds,
  });
  const [qrCodeData, setQrCodeData] = useState({ url: "", isLoading: false });
  const [scanQr, setScanQr] = useState(false);

  // Context
  const { taskState } = useContext(TaskContext);

  // Utils
  const handleGenerateQR = async () => {
    setQrCodeData({ url: "", isLoading: true });

    const qrCodeURL = await generateTaskQRCode();
    setQrCodeData({ url: qrCodeURL as string, isLoading: false });
  };

  // Router
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime();
      setTime({
        hours: getCurrentTime().hours,
        minutes: getCurrentTime().minutes,
        seconds: getCurrentTime().seconds,
      });

      if (
        time.hours === "23" &&
        time.minutes === "57" &&
        time.seconds === "00"
      ) {
        localStorage.setItem(
          JSON.stringify(generateTaskSummary(taskState)),
          "summary"
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  // Local
  const userString = getLocalStorage("do-user", "user");
  const user = userString;

  return (
    <>
      {qrCodeData.url && (
        <Modal
          body={<QrModalBody url={qrCodeData?.url} />}
          onClick={() => {
            setQrCodeData({ url: "", isLoading: false });
          }}
        />
      )}

      {scanQr && (
        <Modal
          body={
            <ScanQr
              onClick={() => {
                setScanQr(false);
              }}
            />
          }
          onClick={() => {
            setScanQr(false);
          }}
        />
      )}

      <Card styleName={classes.container}>
        <div>
          <h4>Welcome, {user?.firstname || "doer!"}</h4>
          <p>
            {" "}
            {taskState?.length > 0
              ? "Seamlessly and securely share your tasks across devices, all while staying offline."
              : "Let's get you started on your first set of todos"}
          </p>

          <div className={classes.buttonSection}>
            <Button
              onClick={() => {
                setScanQr(true);
              }}
              loading={qrCodeData?.isLoading}
              type={taskState.length < 1 ? "secondary" : "primary"}
            >
              <span>Scan a todo</span>
            </Button>

            <Button
              onClick={() => {
                taskState.length > 0 ? handleGenerateQR() : navigate("/create");
              }}
              loading={qrCodeData?.isLoading}
              type={taskState.length > 0 ? "secondary" : "primary"}
            >
              <span>
                {taskState?.length > 0
                  ? "Transfer your todos"
                  : "Create a new Todo"}
              </span>
            </Button>
          </div>
        </div>
        <div>
          {time.hours}:{time.minutes}:{time.seconds}
        </div>
      </Card>
    </>
  );
};

export default DashboardHeader;
