import React, { useState } from "react";
import {
  IonIcon,
  IonContent,
  IonPage,
} from "@ionic/react";
import {
  peopleOutline,
  addOutline,
  searchOutline,
  filterOutline,
  eyeOutline,
  createOutline,
  trashOutline,
  homeOutline,
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
import "./members.css";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  status: "active" | "inactive" | "expired";
  joinDate: string;
  expiryDate: string;
  emergencyContact?: string;
  medicalInfo?: string;
}

const Members: React.FC = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("members");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

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
  const [members] = useState<Member[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      membershipType: "Premium",
      status: "active",
      joinDate: "2024-01-15",
      expiryDate: "2024-07-15",
      emergencyContact: "Jane Doe - +1 (555) 987-6543",
      medicalInfo: "No known allergies",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 234-5678",
      membershipType: "Basic",
      status: "active",
      joinDate: "2024-02-01",
      expiryDate: "2024-08-01",
      emergencyContact: "Mike Johnson - +1 (555) 876-5432",
      medicalInfo: "Asthma - carries inhaler",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "+1 (555) 345-6789",
      membershipType: "Premium",
      status: "inactive",
      joinDate: "2023-12-10",
      expiryDate: "2024-06-10",
      emergencyContact: "Lisa Wilson - +1 (555) 765-4321",
      medicalInfo: "None",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "+1 (555) 456-7890",
      membershipType: "Student",
      status: "expired",
      joinDate: "2023-09-01",
      expiryDate: "2024-01-01",
      emergencyContact: "Robert Davis - +1 (555) 654-3210",
      medicalInfo: "Latex allergy",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex.brown@email.com",
      phone: "+1 (555) 567-8901",
      membershipType: "Basic",
      status: "active",
      joinDate: "2024-01-20",
      expiryDate: "2024-07-20",
      emergencyContact: "Maria Brown - +1 (555) 543-2109",
      medicalInfo: "None",
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
      case "expired":
        return "status-expired";
      default:
        return "";
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the form data to backend
    alert("Member added successfully!");
    setShowAddForm(false);
  };

  const handleViewMember = (member: Member) => {
    // Navigate to member detail page or show modal
    alert(`Viewing details for ${member.name}`);
  };

  const handleEditMember = (member: Member) => {
    // Navigate to edit page or show edit modal
    alert(`Editing ${member.name}`);
  };

  const handleDeleteMember = (member: Member) => {
    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      // Here you would typically call delete API
      alert(`Member ${member.name} deleted successfully!`);
    }
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
                  <IonIcon icon={peopleOutline} className="page-icon" />
                  <div>
                    <h1>Member Management</h1>
                    <p>Manage gym members and their memberships</p>
                  </div>
                </div>
                <button className="btn-primary" onClick={() => setShowAddForm(true)}>
                  <IonIcon icon={addOutline} />
                  Add Member
                </button>
              </div>

              {/* Stats Cards */}
              <div className="content-section">
                <div className="stats-grid">
                  <div className="stat-card card-primary">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={peopleOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Total Members</p>
                      <h3 className="stat-number">{members.length}</h3>
                    </div>
                  </div>

                  <div className="stat-card card-success">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={peopleOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Active Members</p>
                      <h3 className="stat-number">
                        {members.filter(m => m.status === "active").length}
                      </h3>
                    </div>
                  </div>

                  <div className="stat-card card-warning">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={peopleOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">New This Month</p>
                      <h3 className="stat-number">
                        {members.filter(m => new Date(m.joinDate) > new Date('2024-01-01')).length}
                      </h3>
                    </div>
                  </div>

                  <div className="stat-card card-danger">
                    <div className="stat-icon-wrapper">
                      <IonIcon icon={peopleOutline} className="stat-icon" />
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">Expiring Soon</p>
                      <h3 className="stat-number">
                        {members.filter(m => new Date(m.expiryDate) < new Date('2024-02-15')).length}
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
                      placeholder="Search members..."
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

                {/* Members Table */}
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Membership</th>
                        <th>Status</th>
                        <th>Join Date</th>
                        <th>Expiry Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map((member) => (
                        <tr key={member.id}>
                          <td>
                            <div className="member-info">
                              <div className="member-avatar">
                                {member.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span>{member.name}</span>
                            </div>
                          </td>
                          <td>{member.email}</td>
                          <td>{member.phone}</td>
                          <td>{member.membershipType}</td>
                          <td>
                            <span className={`status-badge ${getStatusColor(member.status)}`}>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </span>
                          </td>
                          <td>{new Date(member.joinDate).toLocaleDateString()}</td>
                          <td>{new Date(member.expiryDate).toLocaleDateString()}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-icon"
                                onClick={() => handleViewMember(member)}
                                title="View Details"
                              >
                                <IonIcon icon={eyeOutline} />
                              </button>
                              <button
                                className="btn-icon"
                                onClick={() => handleEditMember(member)}
                                title="Edit Member"
                              >
                                <IonIcon icon={createOutline} />
                              </button>
                              <button
                                className="btn-icon"
                                onClick={() => handleDeleteMember(member)}
                                title="Delete Member"
                              >
                                <IonIcon icon={trashOutline} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Add Member Modal */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Add New Member</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowAddForm(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleAddMember} className="member-form">
                <div className="form-section">
                  <h4>Personal Information</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        required
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        className="form-input"
                        required
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        className="form-input"
                        required
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Membership Details</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Membership Type *</label>
                      <select className="form-select" required>
                        <option value="">Select membership type</option>
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                        <option value="student">Student</option>
                        <option value="senior">Senior</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Start Date *</label>
                      <input
                        type="date"
                        className="form-input"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Duration (months) *</label>
                      <select className="form-select" required>
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">12 Months</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Payment Method</label>
                      <select className="form-select">
                        <option value="cash">Cash</option>
                        <option value="card">Credit Card</option>
                        <option value="bank">Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Emergency Contact</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Emergency contact name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact Phone</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="Emergency contact phone"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Medical Information</h4>
                  <div className="form-group">
                    <label>Medical Conditions/Allergies</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Any medical conditions, allergies, or special requirements..."
                      rows={3}
                    ></textarea>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Member
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

export default Members;
