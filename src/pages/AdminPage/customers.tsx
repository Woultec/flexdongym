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
  addOutline,
  searchOutline,
    filterOutline,
    mailOutline,
    callOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Header from "../../components/admincomponents/widgets/header";
import SideNavBar from "../../components/admincomponents/widgets/sidenavbar";
import Footer from "../../components/admincomponents/widgets/footer";
import "./dashboard.css";
import "./members.css";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  joinDate: string;
  lastVisit: string;
  totalSpent: number;
  status: "active" | "inactive" | "prospect";
}

const Customers: React.FC = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");

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
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 234 567 8901",
      membershipType: "Premium",
      joinDate: "2023-01-15",
      lastVisit: "2024-01-10",
      totalSpent: 1250.00,
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 234 567 8902",
      membershipType: "Basic",
      joinDate: "2023-06-20",
      lastVisit: "2024-01-08",
      totalSpent: 450.00,
      status: "active",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@example.com",
      phone: "+1 234 567 8903",
      membershipType: "None",
      joinDate: "2024-01-05",
      lastVisit: "2024-01-05",
      totalSpent: 75.00,
      status: "prospect",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@example.com",
      phone: "+1 234 567 8904",
      membershipType: "Premium",
      joinDate: "2022-11-10",
      lastVisit: "2023-12-15",
      totalSpent: 890.00,
      status: "inactive",
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
      case "prospect":
        return "status-prospect";
      default:
        return "";
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IonPage>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} title="Customer Management" />

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
                  <IonIcon icon={statsChartOutline} className="page-icon" />
                  <div>
                    <h1>Customer Management</h1>
                    <p>Track and manage customer relationships</p>
                  </div>
                </div>
                <button className="btn-primary">
                  <IonIcon icon={addOutline} />
                  Add New Customer
                </button>
              </div>

              {/* Search and Filters */}
              <div className="content-section">
                <div className="search-filter-bar">
                  <div className="search-input-wrapper">
                    <IonIcon icon={searchOutline} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search customers..."
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

                {/* Customer Stats Cards */}
                <div className="stats-grid">
                  <div className="stat-card card-primary">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={statsChartOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Total Customers</p>
                      <h3 className="stat-number">{customers.length}</h3>
                    </div>
                  </div>

                  <div className="stat-card card-success">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={statsChartOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Active Customers</p>
                      <h3 className="stat-number">
                        {customers.filter(c => c.status === "active").length}
                      </h3>
                    </div>
                  </div>

                  <div className="stat-card card-warning">
                    <div className="stat-icon-wrapper">
                      <span className="stat-icon">💰</span>
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Total Revenue</p>
                      <h3 className="stat-number">
                        ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                      </h3>
                    </div>
                  </div>

                  <div className="stat-card card-info">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={statsChartOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">New This Month</p>
                      <h3 className="stat-number">
                        {customers.filter(c => new Date(c.joinDate).getMonth() === new Date().getMonth()).length}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Customers Table */}
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Membership</th>
                        <th>Join Date</th>
                        <th>Last Visit</th>
                        <th>Total Spent</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id}>
                          <td>
                            <div className="member-info">
                              <div className="member-avatar">
                                {customer.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span>{customer.name}</span>
                            </div>
                          </td>
                          <td>
                            <div className="contact-info">
                              <div className="contact-item">
                                <IonIcon icon={mailOutline} />
                                {customer.email}
                              </div>
                              <div className="contact-item">
                                <IonIcon icon={callOutline} />
                                {customer.phone}
                              </div>
                            </div>
                          </td>
                          <td>{customer.membershipType}</td>
                          <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
                          <td>{new Date(customer.lastVisit).toLocaleDateString()}</td>
                          <td>${customer.totalSpent.toFixed(2)}</td>
                          <td>
                            <span className={`status-badge ${getStatusColor(customer.status)}`}>
                              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-icon">👁️</button>
                              <button className="btn-icon">✏️</button>
                              <button className="btn-icon">📧</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <button className="btn-pagination">Previous</button>
                  <span className="pagination-info">Page 1 of 2</span>
                  <button className="btn-pagination">Next</button>
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

export default Customers;
