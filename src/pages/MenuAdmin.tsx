import React, { use } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Reusable/Button";

const MenuAdminButtons: React.FC = () => {
  const history = useHistory();

  return (
    <div
      className="login-register-container"
      style={{ display: "flex", gap: "10px" }}
    >
      <div className="menu-main-container">
        <Button onClick={() => history.push("/admin")}>Admin</Button>
        <Button onClick={() => history.push("/employee")}>Employee</Button>
      </div>
    </div>
  );
};

export default MenuAdminButtons;
