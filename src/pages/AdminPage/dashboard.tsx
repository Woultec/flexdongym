import React, { useState } from "react";
import {
  IonIcon,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import {
  menuOutline,
  closeOutline,
  homeOutline,
  peopleOutline,
  personOutline,
  cubeOutline,
  pricetagOutline,
  settingsOutline,
  logOutOutline,
  statsChartOutline,
  calendarOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
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
  const [activeTab, setActiveTab] = useState<"overview" | "members" | "employees">("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  // Menu items configuration
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: homeOutline, path: "/admin-page" },
    { id: "members", label: "Members", icon: peopleOutline, path: "/admin-page/members" },
    { id: "employees", label: "Employees", icon: personOutline, path: "/admin-page/employees" },
    { id: "products", label: "Products", icon: cubeOutline, path: "/admin-page/products" },
    { id: "customers", label: "Customers", icon: statsChartOutline, path: "/admin-page/customers" },
    { id: "equipment", label: "Equipment", icon: settingsOutline, path: "/admin-page/equipment" },
    { id: "pricing", label: "Price Edit", icon: pricetagOutline, path: "/admin-page/pricing" },
    { id: "schedule", label: "Schedule", icon: calendarOutline, path: "/admin-page/schedule" },
  ];

  // Mock data - replace with API calls
  const [stats] = useState<DashboardStats>({
    totalMembers: 156,
    activeTodayMembers: 42,
    totalEmployees: 8,
    monthlyRevenue: 12500,
  });

  const [dashboardItems] = useState<DashboardItem[]>([
    {
      id: 1,
      name: "John Doe",
      status: "active",
      type: "member",
      joinDate: "2024-01-15",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "active",
      type: "member",
      joinDate: "2024-02-20",
      email: "jane@example.com",
    },
    {
      id: 3,
      name: "Mike Johnson",
      status: "inactive",
      type: "member",
      joinDate: "2023-12-10",
      email: "mike@example.com",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      status: "active",
      type: "employee",
      email: "sarah@example.com",
    },
    {
      id: 5,
      name: "Alex Brown",
      status: "active",
      type: "member",
      joinDate: "2024-01-22",
      email: "alex@example.com",
    },
  ]);

  const handleNavigate = (path: string, itemId: string) => {
    setActiveMenuItem(itemId);
    setMenuOpen(false);
    history.push(path);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="dashboard-toolbar">
          <div className="toolbar-content">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <div className="toolbar-actions">
              <div className="user-avatar">AD</div>
            </div>
            <button className="menu-toggle" onClick={toggleMenu}>
              <IonIcon icon={menuOpen ? closeOutline : menuOutline} />
            </button>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="dashboard-layout">
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
          {menuOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}

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

              {/* Tabs */}
              <div className="content-section">
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

                {/* Tab Content */}
                <div className="tab-content">
                  {activeTab === "overview" && (
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
                  )}

                  {activeTab === "members" && (
                    <div className="list-section">
                      <div className="section-header">
                        <h2>Recent Members</h2>
                        <button className="btn-primary-small">View All</button>
                      </div>
                      <div className="items-list">
                        {dashboardItems
                          .filter((item) => item.type === "member")
                          .map((item) => (
                            <div key={item.id} className="list-item">
                              <div className="item-avatar">
                                {item.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div className="item-info">
                                <h4>{item.name}</h4>
                                <p className="item-email">{item.email}</p>
                                {item.joinDate && (
                                  <p className="item-meta">
                                    <IonIcon icon={calendarOutline} />
                                    Joined {new Date(item.joinDate).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                              <span className={`status-badge ${getStatusColor(item.status)}`}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "employees" && (
                    <div className="list-section">
                      <div className="section-header">
                        <h2>Team Members</h2>
                        <button className="btn-primary-small">Add Employee</button>
                      </div>
                      <div className="items-list">
                        {dashboardItems
                          .filter((item) => item.type === "employee")
                          .map((item) => (
                            <div key={item.id} className="list-item">
                              <div className="item-avatar employee-avatar">
                                {item.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div className="item-info">
                                <h4>{item.name}</h4>
                                <p className="item-email">{item.email}</p>
                                <p className="item-meta">
                                  <IonIcon icon={personOutline} />
                                  Staff Member
                                </p>
                              </div>
                              <span className="status-badge status-active">Active</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;