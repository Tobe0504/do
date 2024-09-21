import QRCode from "qrcode";
import { getLocalStorage } from "./decryptData";

export const generateTaskQRCode = async () => {
  try {
    const encryptedData = localStorage.getItem("do-todos");

    console.log(encryptedData, "Check");

    const base64Data = btoa(encryptedData as string);

    const qrCodeDataURL = await QRCode.toDataURL(base64Data);
    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
};
