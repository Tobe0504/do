import QRCode from "qrcode";
import { getLocalStorage } from "./decryptData";

export const generateTaskQRCode = async () => {
  try {
    const encryptedData = getLocalStorage("do-todos", "tasks");
    const base64Data = btoa(encryptedData);

    const qrCodeDataURL = await QRCode.toDataURL(base64Data);
    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
};
