import React from "react";
import { useHistory } from "react-router-dom";
import QRScanner from "../../components/Reusable/QRScannerNav";
import "./StatusMember.css";
import { Button } from "../../components/Reusable/Button";

const StatusMemberPage: React.FC = () => {
  const history = useHistory();

  return (
    <div className="manage-member-container">
      <div className="main-container">
        <div className="top-header">
          <h2>Manage Member</h2>
          <div className="search-bar">
            <input 
              className="search-input" 
              type="text" 
              placeholder="Search members..." 
              aria-label="Search members"
            />
          </div>
          <div className="nav-carousel" role="tablist" aria-label="Member filter options">
            <div className="nav-item active" role="tab" aria-selected="true" tabIndex={0}>Currently Active</div>
            <div className="nav-item" role="tab" aria-selected="false" tabIndex={0}>Member</div>
            <div className="nav-item" role="tab" aria-selected="false" tabIndex={0}>Casual</div>
            <div className="nav-item" role="tab" aria-selected="false" tabIndex={0}>All</div>
          </div>
        </div>
        <div className="cards-container" role="list" aria-label="Member list">
          <div
            className="status-card"
            onClick={() => history.push("/profile-member")}
            role="listitem"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && history.push("/profile-member")}
            aria-label="Juan, Member, 1 month remaining, Active status"
          >
            <div className="status-info">
              <div className="left-info">
                <h2 className="client-name">Juan</h2>
                <div className="client-details">
                  <p className="client-type">Member</p>
                  <p className="client-duration">1 month</p>
                </div>
              </div>
            </div>
            <div className="client-status active" aria-label="Active member">active</div>
          </div>
        </div>
        <div className="pos-container">
          <div className="stat pos-nav-container">
            <div className="pos-container">
              <h3>POS</h3>
            </div>
            <div className="stat qr-container">
              <h3 onClick={() => history.push("/qr")}>QR Scanner</h3>
            </div>
            <div className="stat status-container">
              <h3 onClick={() => history.push("/status-member")}>Status</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusMemberPage;
