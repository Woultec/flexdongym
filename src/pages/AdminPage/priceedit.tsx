import React, { useState } from "react";
import {
  IonIcon,
  IonContent,
  IonPage,
} from "@ionic/react";
import {
  pricetagOutline,
  saveOutline,
  refreshOutline,
  homeOutline,
    peopleOutline,
    cubeOutline,
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

interface PricingItem {
  id: number;
  name: string;
  category: string;
  currentPrice: number;
  newPrice: number;
  lastUpdated: string;
  status: "unchanged" | "increased" | "decreased";
}

const PriceEdit: React.FC = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("pricing");

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
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([
    {
      id: 1,
      name: "Basic Membership",
      category: "Memberships",
      currentPrice: 29.99,
      newPrice: 29.99,
      lastUpdated: "2024-01-15",
      status: "unchanged",
    },
    {
      id: 2,
      name: "Premium Membership",
      category: "Memberships",
      currentPrice: 49.99,
      newPrice: 54.99,
      lastUpdated: "2024-01-15",
      status: "increased",
    },
    {
      id: 3,
      name: "Personal Training Session",
      category: "Services",
      currentPrice: 75.00,
      newPrice: 80.00,
      lastUpdated: "2024-01-15",
      status: "increased",
    },
    {
      id: 4,
      name: "Protein Powder",
      category: "Products",
      currentPrice: 49.99,
      newPrice: 45.99,
      lastUpdated: "2024-01-15",
      status: "decreased",
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

  const handlePriceChange = (id: number, newPrice: number) => {
    setPricingItems(items =>
      items.map(item => {
        if (item.id === id) {
          const status = newPrice > item.currentPrice ? "increased" :
                        newPrice < item.currentPrice ? "decreased" : "unchanged";
          return { ...item, newPrice, status };
        }
        return item;
      })
    );
  };

  const handleSaveChanges = () => {
    // Here you would typically save to backend
    alert("Price changes saved successfully!");
  };

  const handleResetChanges = () => {
    setPricingItems(items =>
      items.map(item => ({
        ...item,
        newPrice: item.currentPrice,
        status: "unchanged" as const,
      }))
    );
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "increased":
        return "status-increased";
      case "decreased":
        return "status-decreased";
      case "unchanged":
        return "status-unchanged";
      default:
        return "";
    }
  };

  return (
    <IonPage>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} title="Price Edit" />

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
                  <IonIcon icon={pricetagOutline} className="page-icon" />
                  <div>
                    <h1>Price Management</h1>
                    <p>Update pricing for memberships, services, and products</p>
                  </div>
                </div>
                <div className="header-actions">
                  <button className="btn-secondary" onClick={handleResetChanges}>
                    <IonIcon icon={refreshOutline} />
                    Reset Changes
                  </button>
                  <button className="btn-primary" onClick={handleSaveChanges}>
                    <IonIcon icon={saveOutline} />
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Pricing Table */}
              <div className="content-section">
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Current Price</th>
                        <th>New Price</th>
                        <th>Change</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>${item.currentPrice.toFixed(2)}</td>
                          <td>
                            <input
                              type="number"
                              step="0.01"
                              value={item.newPrice}
                              onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                              className="price-input"
                            />
                          </td>
                          <td>
                            {item.newPrice !== item.currentPrice && (
                              <span className={`price-change ${item.newPrice > item.currentPrice ? 'positive' : 'negative'}`}>
                                {item.newPrice > item.currentPrice ? '+' : ''}
                                ${(item.newPrice - item.currentPrice).toFixed(2)}
                              </span>
                            )}
                          </td>
                          <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-badge ${getStatusColor(item.status)}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="pricing-summary">
                  <h3>Price Change Summary</h3>
                  <div className="summary-stats">
                    <div className="summary-item">
                      <span className="summary-label">Items Increased:</span>
                      <span className="summary-value increased">
                        {pricingItems.filter(item => item.status === "increased").length}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Items Decreased:</span>
                      <span className="summary-value decreased">
                        {pricingItems.filter(item => item.status === "decreased").length}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Items Unchanged:</span>
                      <span className="summary-value unchanged">
                        {pricingItems.filter(item => item.status === "unchanged").length}
                      </span>
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

export default PriceEdit;
