import React, { useState } from "react";
import {
  IonIcon,
  IonContent,
  IonPage,
} from "@ionic/react";
import {
  cubeOutline,
  addOutline,
  searchOutline,
  filterOutline,
  homeOutline,
  peopleOutline,
  personOutline,
  statsChartOutline,
  settingsOutline,
  pricetagOutline
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Header from "../../components/admincomponents/widgets/header";
import SideNavBar from "../../components/admincomponents/widgets/sidenavbar";
import Footer from "../../components/admincomponents/widgets/footer";
import "./dashboard.css";
import "./members.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  description: string;
}

const Products: React.FC = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("products");
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
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Protein Powder",
      category: "Supplements",
      price: 49.99,
      stock: 25,
      status: "in-stock",
      description: "High-quality whey protein powder",
    },
    {
      id: 2,
      name: "Yoga Mat",
      category: "Equipment",
      price: 29.99,
      stock: 5,
      status: "low-stock",
      description: "Non-slip yoga mat for all fitness levels",
    },
    {
      id: 3,
      name: "Resistance Bands",
      category: "Equipment",
      price: 19.99,
      stock: 0,
      status: "out-of-stock",
      description: "Set of 5 resistance bands",
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
      case "in-stock":
        return "status-active";
      case "low-stock":
        return "status-warning";
      case "out-of-stock":
        return "status-inactive";
      default:
        return "";
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IonPage>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} title="Product Management" />

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
                  <IonIcon icon={cubeOutline} className="page-icon" />
                  <div>
                    <h1>Products Management</h1>
                    <p>Manage gym products and inventory</p>
                  </div>
                </div>
                <button className="btn-primary">
                  <IonIcon icon={addOutline} />
                  Add New Product
                </button>
              </div>

              {/* Search and Filters */}
              <div className="content-section">
                <div className="search-filter-bar">
                  <div className="search-input-wrapper">
                    <IonIcon icon={searchOutline} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search products..."
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

                {/* Products Grid */}
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-header">
                        <h3>{product.name}</h3>
                        <span className={`status-badge ${getStatusColor(product.status)}`}>
                          {product.status.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                      <div className="product-details">
                        <p className="product-category">{product.category}</p>
                        <p className="product-description">{product.description}</p>
                        <div className="product-meta">
                          <span className="product-price">${product.price}</span>
                          <span className="product-stock">Stock: {product.stock}</span>
                        </div>
                      </div>
                      <div className="product-actions">
                        <button className="btn-icon">👁️</button>
                        <button className="btn-icon">✏️</button>
                        <button className="btn-icon">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <button className="btn-pagination">Previous</button>
                  <span className="pagination-info">Page 1 of 4</span>
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

export default Products;
