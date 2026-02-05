import React, { useState } from "react";
import { BackButton } from "../../components/Reusable/BackButton";
import { Button } from "../../components/Reusable/Button";
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

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<"overview" | "members" | "employees">("overview");

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
  ]);

  const handleNavigate = (path: string) => {
    history.push(path);
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <BackButton
          className="btn-back"
          type="button"
          onClick={() => handleNavigate("/admin-page")}
        >
          Back
        </BackButton>
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <Button
            className="btn btn-primary"
            onClick={() => handleNavigate("/admin-page/members")}
          >
            Manage Members
          </Button>
          <Button
            className="btn btn-secondary"
            onClick={() => handleNavigate("/admin-page/employees")}
          >
            Manage Employees
          </Button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon members-icon">👥</div>
            <div className="stat-info">
              <h3>Total Members</h3>
              <p className="stat-number">{stats.totalMembers}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon active-icon">✓</div>
            <div className="stat-info">
              <h3>Active Today</h3>
              <p className="stat-number">{stats.activeTodayMembers}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon employees-icon">👔</div>
            <div className="stat-info">
              <h3>Total Employees</h3>
              <p className="stat-number">{stats.totalEmployees}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue-icon">💰</div>
            <div className="stat-info">
              <h3>Monthly Revenue</h3>
              <p className="stat-number">${stats.monthlyRevenue}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === "members" ? "active" : ""}`}
            onClick={() => setActiveTab("members")}
          >
            Recent Members
          </button>
          <button
            className={`tab-button ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            Team
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="overview-section">
              <h2>Quick Stats</h2>
              <div className="quick-info">
                <div className="info-item">
                  <span className="info-label">Gym Utilization:</span>
                  <span className="info-value">68%</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Avg. Daily Visits:</span>
                  <span className="info-value">42</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Membership Growth:</span>
                  <span className="info-value">+12% this month</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div className="list-section">
              <h2>Recent Members</h2>
              <div className="items-list">
                {dashboardItems
                  .filter((item) => item.type === "member")
                  .map((item) => (
                    <div key={item.id} className="list-item">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>{item.email}</p>
                        {item.joinDate && (
                          <p className="join-date">Joined: {item.joinDate}</p>
                        )}
                      </div>
                      <span
                        className={`status-badge ${getStatusColor(item.status)}`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "employees" && (
            <div className="list-section">
              <h2>Team Members</h2>
              <div className="items-list">
                {dashboardItems
                  .filter((item) => item.type === "employee")
                  .map((item) => (
                    <div key={item.id} className="list-item">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>{item.email}</p>
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
  );
};

export default Dashboard;
