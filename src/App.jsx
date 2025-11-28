import React from "react";
import "./App.css"
import { QRCode } from "react-qr-code";
import { useState } from "react";

function App() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [qrVisible, setVisible] = useState(false);

  const generateQrCodeHandler = () => {

    if(!firstName || !lastName || !age) {
      alert("Complete All Fields");
      return;
    }

    const formatted = `000001DonGym${firstName}${lastName}${age}`;
    setQrValue(formatted);
    setVisible(true);
  }

  return (
    <div className="container">
      <h1>Gym QR Code Generator💪🏋️‍♂️</h1>
      <input
        type="text"
        placeholder="Enter First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={generateQrCodeHandler}>Generate QR Code</button>

      {qrVisible &&
        <div className="qr-code-container">
        <QRCode value={qrValue} size={300}/>
        <p>Generated Code: <b>{qrValue}</b></p>
        </div>}
    </div>
  )
}

export default App;