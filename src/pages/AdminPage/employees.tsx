import React, { useState } from "react";
import {
  IonIcon,
  IonContent,
  IonPage,
} from "@ionic/react";
import {
  personOutline,
  addOutline,
  searchOutline,
  filterOutline,
    homeOutline,
    peopleOutline,
    cubeOutline,
    pricetagOutline,
    settingsOutline,
    statsChartOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Header from "../../components/admincomponents/widgets/header";
import SideNavBar from "../../components/admincomponents/widgets/sidenavbar";
import Footer from "../../components/admincomponents/widgets/footer";
import "./dashboard.css";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  hireDate: string;
  status: "active" | "inactive";
}

const Employees: React.FC = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("employees");
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
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 234 567 8904",
      role: "Trainer",
      department: "Fitness",
      hireDate: "2023-06-15",
      status: "active",
    },
    {
      id: 2,
      name: "Alex Brown",
      email: "alex@example.com",
      phone: "+1 234 567 8905",
      role: "Receptionist",
      department: "Front Desk",
      hireDate: "2023-08-20",
      status: "active",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1 234 567 8906",
      role: "Manager",
      department: "Operations",
      hireDate: "2022-03-10",
      status: "active",
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
      default:
        return "";
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <IonIcon icon={personOutline} className="page-icon" />
                  <div>
                    <h1>Employees Management</h1>
                    <p>Manage gym staff and their roles</p>
                  </div>
                </div>
                <button className="btn-primary">
                  <IonIcon icon={addOutline} />
                  Add New Employee
                </button>
              </div>

              {/* Search and Filters */}
              <div className="content-section">
                <div className="search-filter-bar">
                  <div className="search-input-wrapper">
                    <IonIcon icon={searchOutline} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search employees..."
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

                {/* Employees Table */}
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Hire Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                          <td>
                            <div className="member-info">
                              <div className="member-avatar employee-avatar">
                                {employee.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span>{employee.name}</span>
                            </div>
                          </td>
                          <td>{employee.email}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.role}</td>
                          <td>{employee.department}</td>
                          <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-badge ${getStatusColor(employee.status)}`}>
                              {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-icon">👁️</button>
                              <button className="btn-icon">✏️</button>
                              <button className="btn-icon">🗑️</button>
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
                  <span className="pagination-info">Page 1 of 3</span>
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

export default Employees;
