import React from "react";
import { UsernameInput } from "../components/Reusable/Username";
import { Button } from "../components/Reusable/Button";
import { BackButton } from "../components/Reusable/BackButton";
import { useHistory } from "react-router-dom";

const AdminMenu: React.FC = () => {
  const history = useHistory();
  return (
    <div className="member-menu-container">
      <div className="main-container">
        <div className="top-container">
          <BackButton
            className="btn-back"
            type="submit"
            onClick={() => history.push("/admin-page")}
          >
            back
          </BackButton>
          <h1>Admin</h1>
        </div>
        <div className="form-container">
          <UsernameInput className="input-username" placeholder="Username" />
          <UsernameInput className="input-username" placeholder="Password" />
        </div>
        <div className="bottom-container">
          <Button className="btn btn-submit" type="submit">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AdminMenu;
