import React from "react";
import { IonIcon, IonHeader, IonToolbar } from "@ionic/react";
import { menuOutline, closeOutline } from "ionicons/icons";
import "./header.css";

interface HeaderProps {
  menuOpen: boolean;
  toggleMenu: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ menuOpen, toggleMenu, title = "Admin Dashboard" }) => {
  return (
    <IonHeader>
      <IonToolbar className="dashboard-toolbar">
        <div className="toolbar-content">
          <h1 className="dashboard-title">{title}</h1>
          <div className="toolbar-actions">
            <div className="user-avatar">AD</div>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <IonIcon icon={menuOpen ? closeOutline : menuOutline} />
          </button>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
