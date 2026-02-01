import React, { useState } from "react";
import "./MemberStatus.css";

interface Member {
  id: number;
  name: string;
  email: string;
  status: "Currently Active" | "Member" | "Casual";
  joinDate: string;
  lastActive: string;
  avatar?: string;
}

const ManageMemberMenu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      status: "Currently Active",
      joinDate: "2024-01-15",
      lastActive: "2 minutes ago",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      status: "Member",
      joinDate: "2023-11-20",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@example.com",
      status: "Currently Active",
      joinDate: "2024-02-01",
      lastActive: "5 minutes ago",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@example.com",
      status: "Casual",
      joinDate: "2024-01-05",
      lastActive: "3 weeks ago",
    },
    {
      id: 5,
      name: "James Brown",
      email: "j.brown@example.com",
      status: "Member",
      joinDate: "2023-09-10",
      lastActive: "2 hours ago",
    },
    {
      id: 6,
      name: "Olivia Martinez",
      email: "olivia.m@example.com",
      status: "Casual",
      joinDate: "2023-12-12",
      lastActive: "1 week ago",
    },
  ]);

  // Filter members based on search term and active filter
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || member.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Currently Active":
        return "status-active";
      case "Member":
        return "status-member";
      case "Casual":
        return "status-casual";
      default:
        return "";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDelete = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleEdit = (id: number) => {
    console.log("Edit member:", id);
    // Add edit logic here
  };

  return (
    <div className="status-main-container">
      <div className="status-header">
        <h1>Manage Members</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="carousel-filter">
        {["Currently Active", "Member", "Casual", "All"].map((filter) => (
          <li
            key={filter}
            className={`carousel-list ${
              activeFilter === filter ? "active" : ""
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </li>
        ))}
      </div>
      <div className="main-container">
        {filteredMembers.length === 0 ? (
          <div className="no-results">
            <p>No members found</p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div key={member.id} className="status-card">
              <div className="card-header">
                <div className="avatar">{getInitials(member.name)}</div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="email">{member.email}</p>
                </div>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <span className="label">Status:</span>
                  <span
                    className={`status-badge ${getStatusColor(member.status)}`}
                  >
                    {member.status}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Join Date:</span>
                  <span>{new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="info-row">
                  <span className="label">Last Active:</span>
                  <span>{member.lastActive}</span>
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn-primary"
                  onClick={() => handleEdit(member.id)}
                >
                  Edit
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => handleDelete(member.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageMemberMenu;
