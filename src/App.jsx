import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import QRScanner from "./QRScanner";
import { QRCode } from "react-qr-code";
import "./App.css";

const QRGenerator = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [qrVisible, setVisible] = useState(false);

  const history = useHistory();

  const generateQrCodeHandler = () => {
    if (!firstName || !lastName || !age) {
      alert("Complete All Fields");
      return;
    }
    const formatted = `000001DonGym${firstName}${lastName}${age}`;
    setQrValue(formatted);
    setVisible(true);
  };

  return (
    <div className="container">
      <h1>Gym QR Code Generator 💪🏋️‍♂️</h1>

      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

      <button onClick={generateQrCodeHandler}>Generate QR Code</button>

      {qrVisible && (
        <div className="qr-code-container">
          <QRCode value={qrValue} size={300} />
          <p>Generated Code: <b>{qrValue}</b></p>
        </div>
      )}

      <button style={{ marginTop: "20px" }} onClick={() => history.push("/scanner")}>
        Go to QR Scanner
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Switch>
      <Route path="/generator" component={QRGenerator} />
      <Route path="/scanner" component={QRScanner} />
      <Redirect to="/generator" />
    </Switch>
  );
};

export default App;