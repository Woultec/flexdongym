import React from "react";
import { IonIcon } from "@ionic/react";
import { homeOutline, peopleOutline, personOutline } from "ionicons/icons";
import "./menunavbar.css";

interface MenuNavBarProps {
  activeTab: "overview" | "members" | "employees";
  setActiveTab: (tab: "overview" | "members" | "employees") => void;
}

const MenuNavBar: React.FC<MenuNavBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="dashboard-tabs">
      <button
        className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
        onClick={() => setActiveTab("overview")}
      >
        <IonIcon icon={homeOutline} />
        Overview
      </button>
      <button
        className={`tab-button ${activeTab === "members" ? "active" : ""}`}
        onClick={() => setActiveTab("members")}
      >
        <IonIcon icon={peopleOutline} />
        Recent Members
      </button>
      <button
        className={`tab-button ${activeTab === "employees" ? "active" : ""}`}
        onClick={() => setActiveTab("employees")}
      >
        <IonIcon icon={personOutline} />
        Team
      </button>
    </div>
  );
};

export default MenuNavBar;
