import React, { useState } from "react";
import {
  IonIcon,
  IonContent,
  IonPage,
} from "@ionic/react";
import {
  settingsOutline,
  addOutline,
  searchOutline,
  filterOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  warningOutline,
    homeOutline,
    peopleOutline,
    cubeOutline,
    pricetagOutline,
    statsChartOutline,
    personOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Header from "../../components/admincomponents/widgets/header";
import SideNavBar from "../../components/admincomponents/widgets/sidenavbar";
import Footer from "../../components/admincomponents/widgets/footer";
import "./dashboard.css";

interface Equipment {
  id: number;
  name: string;
  location: string;
  condition: "excellent" | "good" | "fair" | "poor" | "broken";
  lastChecked: string;
  nextMaintenance: string;
  status: "operational" | "maintenance" | "broken";
}

interface BrokenEquipmentReport {
  equipmentId: number;
  equipmentName: string;
  location: string;
  issue: string;
  severity: "low" | "medium" | "high" | "critical";
  reportedBy: string;
  reportedDate: string;
  description: string;
}

const Equipment: React.FC = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("equipment");
  const [searchTerm, setSearchTerm] = useState("");
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  // Menu items configuration
  const menuItems = [
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
  const [equipment] = useState<Equipment[]>([
    {
      id: 1,
      name: "Treadmill #1",
      location: "Cardio Area",
      condition: "good",
      lastChecked: "2024-01-15",
      nextMaintenance: "2024-02-15",
      status: "operational",
    },
    {
      id: 2,
      name: "Dumbbell Set",
      location: "Weight Room",
      condition: "excellent",
      lastChecked: "2024-01-10",
      nextMaintenance: "2024-04-10",
      status: "operational",
    },
    {
      id: 3,
      name: "Bench Press",
      location: "Weight Room",
      condition: "fair",
      lastChecked: "2024-01-08",
      nextMaintenance: "2024-01-25",
      status: "maintenance",
    },
    {
      id: 4,
      name: "Elliptical Machine",
      location: "Cardio Area",
      condition: "poor",
      lastChecked: "2024-01-12",
      nextMaintenance: "2024-01-20",
      status: "broken",
    },
    {
      id: 5,
      name: "Yoga Mats",
      location: "Studio",
      condition: "good",
      lastChecked: "2024-01-14",
      nextMaintenance: "2024-06-14",
      status: "operational",
    },
  ]);

  const [reports] = useState<BrokenEquipmentReport[]>([
    {
      equipmentId: 4,
      equipmentName: "Elliptical Machine",
      location: "Cardio Area",
      issue: "Display not working",
      severity: "medium",
      reportedBy: "John Smith",
      reportedDate: "2024-01-12",
      description: "The digital display is completely blank. Machine powers on but no readings shown.",
    },
    {
      equipmentId: 3,
      equipmentName: "Bench Press",
      location: "Weight Room",
      issue: "Weight plates loose",
      severity: "high",
      reportedBy: "Sarah Johnson",
      reportedDate: "2024-01-08",
      description: "Several weight plates are loose and could fall off during use. Safety hazard.",
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

  const getConditionColor = (condition: string): string => {
    switch (condition) {
      case "excellent":
        return "status-excellent";
      case "good":
        return "status-good";
      case "fair":
        return "status-fair";
      case "poor":
        return "status-poor";
      case "broken":
        return "status-broken";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "operational":
        return "status-active";
      case "maintenance":
        return "status-warning";
      case "broken":
        return "status-inactive";
      default:
        return "";
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case "low":
        return "severity-low";
      case "medium":
        return "severity-medium";
      case "high":
        return "severity-high";
      case "critical":
        return "severity-critical";
      default:
        return "";
    }
  };

  const filteredEquipment = equipment.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReportBroken = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setShowReportForm(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the report to backend
    alert("Equipment issue reported successfully!");
    setShowReportForm(false);
    setSelectedEquipment(null);
  };

  return (
    <IonPage>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />

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
              {/* Page Header */}
              <div className="page-header">
                <div className="page-title-section">
                  <IonIcon icon={settingsOutline} className="page-icon" />
                  <div>
                    <h1>Equipment Management</h1>
                    <p>Monitor equipment condition and report issues</p>
                  </div>
                </div>
                <button className="btn-primary" onClick={() => setShowReportForm(true)}>
                  <IonIcon icon={alertCircleOutline} />
                  Report Issue
                </button>
              </div>

              {/* Stats Cards */}
              <div className="content-section">
                <div className="stats-grid">
                  <div className="stat-card card-primary">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={settingsOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Total Equipment</p>
                      <h3 className="stat-number">{equipment.length}</h3>
                    </div>
                  </div>

                  <div className="stat-card card-success">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={checkmarkCircleOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Operational</p>
                      <h3 className="stat-number">
                        {equipment.filter(eq => eq.status === "operational").length}
                      </h3>
                    </div>
                  </div>

                  <div className="stat-card card-warning">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={warningOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Needs Attention</p>
                      <h3 className="stat-number">
                        {equipment.filter(eq => eq.status !== "operational").length}
                      </h3>
                    </div>
                  </div>

                  <div className="stat-card card-danger">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={alertCircleOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Broken Equipment</p>
                      <h3 className="stat-number">
                        {equipment.filter(eq => eq.status === "broken").length}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="search-filter-bar">
                  <div className="search-input-wrapper">
                    <IonIcon icon={searchOutline} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search equipment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <button className="btn-secondary">
                    <IonIcon icon={filterOutline} />
                    Filter
                  </button>
                </div>

                {/* Equipment Table */}
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Equipment</th>
                        <th>Location</th>
                        <th>Condition</th>
                        <th>Status</th>
                        <th>Last Checked</th>
                        <th>Next Maintenance</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEquipment.map((eq) => (
                        <tr key={eq.id}>
                          <td>
                            <div className="equipment-info">
                              <IonIcon icon={settingsOutline} className="equipment-icon" />
                              <span>{eq.name}</span>
                            </div>
                          </td>
                          <td>{eq.location}</td>
                          <td>
                            <span className={`status-badge ${getConditionColor(eq.condition)}`}>
                              {eq.condition.charAt(0).toUpperCase() + eq.condition.slice(1)}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${getStatusColor(eq.status)}`}>
                              {eq.status.charAt(0).toUpperCase() + eq.status.slice(1)}
                            </span>
                          </td>
                          <td>{new Date(eq.lastChecked).toLocaleDateString()}</td>
                          <td>{new Date(eq.nextMaintenance).toLocaleDateString()}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-icon">👁️</button>
                              <button className="btn-icon">✏️</button>
                              <button
                                className="btn-icon"
                                onClick={() => handleReportBroken(eq)}
                                title="Report Issue"
                              >
                                🚨
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Recent Reports */}
                <div className="reports-section">
                  <h3>Recent Equipment Reports</h3>
                  <div className="reports-list">
                    {reports.map((report, index) => (
                      <div key={index} className="report-item">
                        <div className="report-header">
                          <h4>{report.equipmentName}</h4>
                          <span className={`severity-badge ${getSeverityColor(report.severity)}`}>
                            {report.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="report-details">
                          <p><strong>Location:</strong> {report.location}</p>
                          <p><strong>Issue:</strong> {report.issue}</p>
                          <p><strong>Reported by:</strong> {report.reportedBy} on {new Date(report.reportedDate).toLocaleDateString()}</p>
                          <p><strong>Description:</strong> {report.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Report Broken Equipment Modal */}
        {showReportForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Report Broken Equipment</h3>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowReportForm(false);
                    setSelectedEquipment(null);
                  }}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmitReport} className="report-form">
                <div className="form-group">
                  <label>Equipment</label>
                  <input
                    type="text"
                    value={selectedEquipment?.name || ""}
                    readOnly
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={selectedEquipment?.location || ""}
                    readOnly
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Issue Type</label>
                  <select className="form-select" required>
                    <option value="">Select issue type</option>
                    <option value="mechanical">Mechanical Failure</option>
                    <option value="electrical">Electrical Issue</option>
                    <option value="structural">Structural Damage</option>
                    <option value="wear">Wear and Tear</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Severity</label>
                  <select className="form-select" required>
                    <option value="low">Low - Minor issue, can wait</option>
                    <option value="medium">Medium - Needs attention soon</option>
                    <option value="high">High - Safety concern</option>
                    <option value="critical">Critical - Equipment unusable</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Describe the issue in detail..."
                    required
                    rows={4}
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setShowReportForm(false);
                      setSelectedEquipment(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Equipment;
