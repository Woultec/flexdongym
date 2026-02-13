import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
} from "@ionic/react";
import {
  homeOutline,
  peopleOutline,
  cubeOutline,
  pricetagOutline,
  settingsOutline,
  statsChartOutline,
  personOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

import Header from "../../components/admincomponents/widgets/header";
import Footer from "../../components/admincomponents/widgets/footer";
import MenuNavBar from "../../components/admincomponents/widgets/menunavbar";
import SideNavBar from "../../components/admincomponents/widgets/sidenavbar";

import "./admindashboard.css";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ 
  children, 
  title = "Admin Dashboard" 
}) => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [activeTab, setActiveTab] = useState<"overview" | "members" | "employees">("overview");

  // Menu items configuration for SideNavBar
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: homeOutline, path: "/dashboard" },
    { id: "members", label: "Members", icon: peopleOutline, path: "/admin-page/members" },
    { id: "employees", label: "Employees", icon: personOutline, path: "/admin-page/employees" },
    { id: "products", label: "Products", icon: cubeOutline, path: "/admin-page/products" },
    { id: "customers", label: "Customers", icon: statsChartOutline, path: "/admin-page/customers" },
    { id: "equipment", label: "Equipment", icon: settingsOutline, path: "/admin-page/equipment" },
    { id: "pricing", label: "Price Edit", icon: pricetagOutline, path: "/admin-page/priceedit" },
    { id: "profile", label: "Profile", icon: personOutline, path: "/admin-page/profile" },
  ];

  const handleNavigate = (path: string, itemId: string) => {
    setActiveMenuItem(itemId);
    setMenuOpen(false);
    history.push(path);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <IonPage>
      <Header 
        menuOpen={menuOpen} 
        toggleMenu={toggleMenu} 
        title={title} 
      />

      <IonContent>
        <div className="admin-dashboard-layout">
          {/* Side Navigation Bar */}
          <SideNavBar
            menuOpen={menuOpen}
            activeMenuItem={activeMenuItem}
            handleNavigate={handleNavigate}
            menuItems={menuItems}
            toggleMenu={toggleMenu}
          />

          {/* Main Content Area */}
          <main className="admin-main-content">
            {/* Menu Navigation Bar (Tabs) */}
            <MenuNavBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Page Content */}
            <div className="admin-page-content">
              {children}
            </div>
          </main>
        </div>
      </IonContent>

      <div className="admin-footer-wrapper">
        <Footer />
      </div>
    </IonPage>
  );
};

export default AdminDashboardLayout;
