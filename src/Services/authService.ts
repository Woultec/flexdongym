export type UserRole = "admin" | "employee";

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
}

// Placeholder auth service. Replace with real API calls.
export const authService = {
  async login(username: string, password: string, role: UserRole): Promise<AuthUser> {
    // TODO: connect to backend
    return { id: "local", username, role };
  },

  async logout(): Promise<void> {
    return;
  },
};
