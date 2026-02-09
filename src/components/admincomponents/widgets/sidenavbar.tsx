import React from "react";
import { IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import "./sidenavbar.css";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface SideNavBarProps {
  menuOpen: boolean;
  activeMenuItem: string;
  handleNavigate: (path: string, itemId: string) => void;
  menuItems: MenuItem[];
  toggleMenu: () => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({
  menuOpen,
  activeMenuItem,
  handleNavigate,
  menuItems,
}) => {
  return (
    <>
      {/* Sidebar Menu */}
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">💪</div>
            <span className="logo-text">Gym Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeMenuItem === item.id ? "active" : ""}`}
              onClick={() => handleNavigate(item.path, item.id)}
            >
              <IonIcon icon={item.icon} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn">
            <IonIcon icon={logOutOutline} className="nav-icon" />
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {menuOpen && <div className="sidebar-overlay"></div>}
    </>
  );
};

export default SideNavBar;
