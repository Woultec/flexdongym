export interface MemberInfo {
  id: string;
  name: string;
  membershipStatus: "active" | "expired" | "unknown";
  expiryDate?: string;
}

// Placeholder QR service. Replace with real API calls.
export const qrService = {
  async getMemberByQr(qrText: string): Promise<MemberInfo> {
    // TODO: parse QR and call backend
    return {
      id: qrText,
      name: "Unknown Member",
      membershipStatus: "unknown",
    };
  },
};
