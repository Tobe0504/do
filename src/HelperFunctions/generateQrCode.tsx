import QRCode from "qrcode";

export const generateTaskQRCode = async () => {
  try {
    const encryptedData = localStorage.getItem("do-todos");

    const base64Data = btoa(encryptedData as string);

    const qrCodeDataURL = await QRCode.toDataURL(base64Data);
    return qrCodeDataURL;
  } catch (error) {
    alert(`Error generating QR code: ${error}`);
    return null;
  }
};
