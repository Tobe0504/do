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
  return <></>;
};

export default DashboardHeader;
