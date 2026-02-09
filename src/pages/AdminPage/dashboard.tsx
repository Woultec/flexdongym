import React, { useState } from "react";
import {
  IonIcon,
  IonContent,
  IonPage,
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
import SideNavBar from "../../components/admincomponents/widgets/sidenavbar";
import Footer from "../../components/admincomponents/widgets/footer";
import "./dashboard.css";

interface DashboardStats {
  totalMembers: number;
  activeTodayMembers: number;
  totalEmployees: number;
  monthlyRevenue: number;
}

interface DashboardItem {
  id: number;
  name: string;
  status: "active" | "inactive" | "pending";
  type: "member" | "employee";
  joinDate?: string;
  email?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  // Menu items configuration
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

  // Mock data - replace with API calls
  const [stats] = useState<DashboardStats>({
    totalMembers: 156,
    activeTodayMembers: 42,
    totalEmployees: 8,
    monthlyRevenue: 12500,
  });



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
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} title="Admin Dashboard" />

      <IonContent>
        <div className="dashboard-layout">
          <SideNavBar
            menuOpen={menuOpen}
            activeMenuItem={activeMenuItem}
            handleNavigate={handleNavigate}
            menuItems={menuItems}
            toggleMenu={toggleMenu}
          />

          {/* Main Content */}
          <main className="dashboard-main">
            <div className="dashboard-container">
              {/* Welcome Banner */}
              <div className="welcome-banner">
                <div className="welcome-content">
                  <h2>Welcome back, Admin!</h2>
                  <p>Here's what's happening with your gym today.</p>
                </div>
                <div className="banner-decoration"></div>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card card-primary">
                  <div className="stat-icon-wrapper">
                    <IonIcon icon={peopleOutline} className="stat-icon" />
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">Total Members</p>
                    <h3 className="stat-number">{stats.totalMembers}</h3>
                    <span className="stat-change positive">+12% from last month</span>
                  </div>
                </div>

                <div className="stat-card card-success">
                  <div className="stat-icon-wrapper">
                    <IonIcon icon={statsChartOutline} className="stat-icon" />
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">Active Today</p>
                    <h3 className="stat-number">{stats.activeTodayMembers}</h3>
                    <span className="stat-change positive">+5% from yesterday</span>
                  </div>
                </div>

                <div className="stat-card card-info">
                  <div className="stat-icon-wrapper">
                    <IonIcon icon={personOutline} className="stat-icon" />
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">Total Employees</p>
                    <h3 className="stat-number">{stats.totalEmployees}</h3>
                    <span className="stat-change neutral">No change</span>
                  </div>
                </div>

                <div className="stat-card card-warning">
                  <div className="stat-icon-wrapper">
                    <span className="stat-icon">💰</span>
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">Monthly Revenue</p>
                    <h3 className="stat-number">${stats.monthlyRevenue.toLocaleString()}</h3>
                    <span className="stat-change positive">+8% from last month</span>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="content-section">
                <div className="overview-section">
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <div className="metric-header">
                        <h3>Gym Utilization</h3>
                        <span className="metric-badge">Live</span>
                      </div>
                      <div className="metric-value">68%</div>
                      <div className="metric-chart">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: "68%" }}></div>
                        </div>
                      </div>
                      <p className="metric-description">Current capacity usage</p>
                    </div>

                    <div className="metric-card">
                      <div className="metric-header">
                        <h3>Avg. Daily Visits</h3>
                      </div>
                      <div className="metric-value">42</div>
                      <div className="metric-trend">
                        <span className="trend-up">↑ 15%</span> vs last week
                      </div>
                      <p className="metric-description">Check-ins per day</p>
                    </div>

                    <div className="metric-card">
                      <div className="metric-header">
                        <h3>Growth Rate</h3>
                      </div>
                      <div className="metric-value">+12%</div>
                      <div className="metric-trend">
                        <span className="trend-up">↑ 3%</span> from last month
                      </div>
                      <p className="metric-description">Membership growth this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Dashboard;