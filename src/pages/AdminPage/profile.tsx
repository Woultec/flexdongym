import React, { useState } from "react";
import {
  IonIcon,
  IonContent,
  IonPage,
} from "@ionic/react";
import {
  personOutline,
  lockClosedOutline,
  mailOutline,
  callOutline,
  locationOutline,
  calendarOutline,
  saveOutline,
  keyOutline,
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
import "./members.css";

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  joinDate: string;
  role: string;
  department: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("profile");
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [isEditing, setIsEditing] = useState(false);

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

  // Mock admin profile data - replace with API calls
  const [profile, setProfile] = useState<AdminProfile>({
    id: 1,
    name: "John Smith",
    email: "john.smith@gym.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fitness Street, Health City, HC 12345",
    dateOfBirth: "1985-06-15",
    joinDate: "2020-01-15",
    role: "Gym Manager",
    department: "Administration",
  });

  // Password change form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleNavigate = (path: string, itemId: string) => {
    setActiveMenuItem(itemId);
    setMenuOpen(false);
    history.push(path);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the updated profile to backend
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    // Here you would typically submit the password change to backend
    alert("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleProfileChange = (field: keyof AdminProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChangeInput = (field: string, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <IonPage>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} title="Profile Management" />

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
                    <h1>Profile Settings</h1>
                    <p>Manage your account information and security settings</p>
                  </div>
                </div>
              </div>

              {/* Profile Tabs */}
              <div className="content-section">
                <div className="profile-tabs">
                  <button
                    className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <IonIcon icon={personOutline} />
                    Edit Profile
                  </button>
                  <button
                    className={`tab-button ${activeTab === "password" ? "active" : ""}`}
                    onClick={() => setActiveTab("password")}
                  >
                    <IonIcon icon={lockClosedOutline} />
                    Change Password
                  </button>
                </div>

                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="profile-content">
                    <div className="profile-header">
                      <div className="profile-avatar">
                        {profile.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="profile-info">
                        <h2>{profile.name}</h2>
                        <p>{profile.role} - {profile.department}</p>
                        <p>Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
                      </div>
                      {!isEditing && (
                        <button
                          className="btn-primary"
                          onClick={() => setIsEditing(true)}
                        >
                          <IonIcon icon={personOutline} />
                          Edit Profile
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleProfileUpdate} className="profile-form">
                      <div className="form-section">
                        <h3>Personal Information</h3>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Full Name</label>
                            {isEditing ? (
                              <input
                                type="text"
                                className="form-input"
                                value={profile.name}
                                onChange={(e) => handleProfileChange("name", e.target.value)}
                                required
                              />
                            ) : (
                              <div className="form-display">
                                <IonIcon icon={personOutline} />
                                {profile.name}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label>Email Address</label>
                            {isEditing ? (
                              <input
                                type="email"
                                className="form-input"
                                value={profile.email}
                                onChange={(e) => handleProfileChange("email", e.target.value)}
                                required
                              />
                            ) : (
                              <div className="form-display">
                                <IonIcon icon={mailOutline} />
                                {profile.email}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Phone Number</label>
                            {isEditing ? (
                              <input
                                type="tel"
                                className="form-input"
                                value={profile.phone}
                                onChange={(e) => handleProfileChange("phone", e.target.value)}
                                required
                              />
                            ) : (
                              <div className="form-display">
                                <IonIcon icon={callOutline} />
                                {profile.phone}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label>Date of Birth</label>
                            {isEditing ? (
                              <input
                                type="date"
                                className="form-input"
                                value={profile.dateOfBirth}
                                onChange={(e) => handleProfileChange("dateOfBirth", e.target.value)}
                                required
                              />
                            ) : (
                              <div className="form-display">
                                <IonIcon icon={calendarOutline} />
                                {new Date(profile.dateOfBirth).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Address</label>
                          {isEditing ? (
                            <textarea
                              className="form-textarea"
                              value={profile.address}
                              onChange={(e) => handleProfileChange("address", e.target.value)}
                              rows={3}
                              required
                            />
                          ) : (
                            <div className="form-display">
                              <IonIcon icon={locationOutline} />
                              {profile.address}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-section">
                        <h3>Work Information</h3>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Role</label>
                            <div className="form-display">
                              <IonIcon icon={personOutline} />
                              {profile.role}
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Department</label>
                            <div className="form-display">
                              <IonIcon icon={personOutline} />
                              {profile.department}
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Join Date</label>
                          <div className="form-display">
                            <IonIcon icon={calendarOutline} />
                            {new Date(profile.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="form-actions">
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </button>
                          <button type="submit" className="btn-primary">
                            <IonIcon icon={saveOutline} />
                            Save Changes
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                )}

                {/* Password Tab */}
                {activeTab === "password" && (
                  <div className="password-content">
                    <div className="password-header">
                      <IonIcon icon={keyOutline} className="password-icon" />
                      <div>
                        <h3>Change Password</h3>
                        <p>Update your account password to keep your account secure</p>
                      </div>
                    </div>

                    <form onSubmit={handlePasswordChange} className="password-form">
                      <div className="form-section">
                        <div className="form-group">
                          <label>Current Password</label>
                          <input
                            type="password"
                            className="form-input"
                            value={passwordForm.currentPassword}
                            onChange={(e) => handlePasswordChangeInput("currentPassword", e.target.value)}
                            required
                            placeholder="Enter your current password"
                          />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input
                            type="password"
                            className="form-input"
                            value={passwordForm.newPassword}
                            onChange={(e) => handlePasswordChangeInput("newPassword", e.target.value)}
                            required
                            placeholder="Enter your new password"
                            minLength={8}
                          />
                          <small className="form-hint">
                            Password must be at least 8 characters long
                          </small>
                        </div>
                        <div className="form-group">
                          <label>Confirm New Password</label>
                          <input
                            type="password"
                            className="form-input"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => handlePasswordChangeInput("confirmPassword", e.target.value)}
                            required
                            placeholder="Confirm your new password"
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="btn-primary">
                          <IonIcon icon={lockClosedOutline} />
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Profile;
