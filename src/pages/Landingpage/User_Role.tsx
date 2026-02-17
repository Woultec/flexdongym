import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Reusable/Button";
import "./User_Role.css";

const MenuAdminButtons: React.FC = () => {
  const history = useHistory();

  return (
    <div className="login-register-container">
      <div className="menu-main-container">
        <h1>Select Your Role</h1>
        <Button onClick={() => history.push("/admin")} aria-label="Login as Admin">
          Admin
        </Button>
        <Button onClick={() => history.push("/employee")} aria-label="Login as Employee">
          Employee
        </Button>
      </div>
    </div>
  );
};

export default MenuAdminButtons;
