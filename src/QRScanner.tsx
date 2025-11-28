import React, { useState, useEffect } from "react";
import { IonButton } from "@ionic/react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { Capacitor } from "@capacitor/core";
import { useHistory } from "react-router-dom";
import "./QRScanner.css";

const QRScanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [isNative, setIsNative] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const platform = Capacitor.getPlatform();
    if (platform === "android" || platform === "ios") {
      setIsNative(true);
    }
  }, []);

  const startScan = async () => {
    if (!isNative) {
      const simulatedData = prompt("Enter QR code value:", "000001DonGymTest");
      if (simulatedData) setScannedData(simulatedData);
      return;
    }

    setScanning(true);
    try {
      await BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) setScannedData(result.content);
    } catch (err) {
      alert("Scan failed: " + err);
    } finally {
      await BarcodeScanner.showBackground();
      setScanning(false);
    }
  };

  const stopScan = async () => {
    if (isNative) await BarcodeScanner.stopScan();
    setScanning(false);
  };

  return (
    <div className="scanner-container">
      <h1>QR Scanner 📷</h1>
      {scannedData && <p>Scanned Data: <b>{scannedData}</b></p>}

      {!scanning ? (
        <IonButton onClick={startScan}>{isNative ? "Start Scanning" : "Simulate Scan"}</IonButton>
      ) : (
        <IonButton color="danger" onClick={stopScan}>Stop Scanning</IonButton>
      )}

      <IonButton style={{ marginTop: "20px" }} onClick={() => history.push("/generator")}>
        Go to QR Generator
      </IonButton>
    </div>
  );
};

export default QRScanner;