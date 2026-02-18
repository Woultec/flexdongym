import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonText,
  IonCard,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeComponents/Layout/Header";
import "./Member.css";

interface Member {
  id: string;
  name: string;
  membershipType: string;
  status: 'active' | 'expired' | 'expiring-soon';
  expiryDate: string;
}

const MemberList: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  useEffect(() => {
    // Mock member data - replace with actual API call
    const mockMembers: Member[] = [
      {
        id: "M001",
        name: "Juan Dela Cruz",
        membershipType: "Premium Monthly",
        status: "active",
        expiryDate: "2024-12-31",
      },
      {
        id: "M002",
        name: "Maria Santos",
        membershipType: "Basic Monthly",
        status: "active",
        expiryDate: "2024-11-30",
      },
      {
        id: "M003",
        name: "Pedro Rodriguez",
        membershipType: "Premium Yearly",
        status: "expiring-soon",
        expiryDate: "2024-10-15",
      },
      {
        id: "M004",
        name: "Ana Garcia",
        membershipType: "Basic Monthly",
        status: "expired",
        expiryDate: "2024-09-30",
      },
      {
        id: "M005",
        name: "Carlos Martinez",
        membershipType: "Premium Monthly",
        status: "active",
        expiryDate: "2024-12-25",
      },
    ];

    setMembers(mockMembers);
    setFilteredMembers(mockMembers);
  }, []);

  useEffect(() => {
    // Filter members based on search text
    if (searchText.trim() === "") {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchText.toLowerCase()) ||
          member.id.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [searchText, members]);

  const handleMemberClick = (memberId: string) => {
    history.push(`/employee/member-profile/${memberId}`);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "status-badge-active";
      case "expiring-soon":
        return "status-badge-warning";
      case "expired":
        return "status-badge-expired";
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "expiring-soon":
        return "Expiring Soon";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  return (
    <IonPage>
      <EmployeeHeader title="Members" />
      <IonContent fullscreen className="member-list-content">
        <div className="member-list-container">
          {/* Search Bar */}
          <div className="search-section">
            <IonSearchbar
              value={searchText}
              onIonInput={(e) => setSearchText(e.detail.value!)}
              placeholder="Search by name or ID"
              className="member-searchbar"
              animated={true}
            />
          </div>

          {/* Member List */}
          {filteredMembers.length > 0 ? (
            <IonCard className="members-card">
              <IonList className="members-list">
                {filteredMembers.map((member) => (
                  <IonItem
                    key={member.id}
                    button
                    onClick={() => handleMemberClick(member.id)}
                    className="member-item"
                    lines="full"
                  >
                    <IonLabel>
                      <h2 className="member-item-name">{member.name}</h2>
                      <p className="member-item-type">{member.membershipType}</p>
                      <p className="member-item-id">ID: {member.id}</p>
                    </IonLabel>
                    <IonBadge
                      slot="end"
                      className={`status-badge ${getStatusBadgeClass(member.status)}`}
                    >
                      {getStatusText(member.status)}
                    </IonBadge>
                  </IonItem>
                ))}
              </IonList>
            </IonCard>
          ) : (
            <IonCard className="empty-members-card">
              <div className="empty-members-state">
                <IonText className="empty-members-text">
                  {searchText
                    ? "No members found matching your search."
                    : "No members registered yet."}
                </IonText>
              </div>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MemberList;
