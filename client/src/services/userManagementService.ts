import Cookies from "js-cookie";
import { User } from "./api";

export class UserManagementService {
  private static readonly TOKEN_KEY = "token";
  private static readonly TOKEN_EXPIRY_DAYS = 7;

  /**
   * Save the authentication token and user data
   * @param token The JWT token to save
   * @param user The user data to save
   */
  static saveToken(token: string): void {
    Cookies.set(this.TOKEN_KEY, token, {
      expires: this.TOKEN_EXPIRY_DAYS,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  /**
   * Get the current authentication token
   * @returns The JWT token or null if not found
   */
  static getToken(): string | null {
    return Cookies.get(this.TOKEN_KEY) || null;
  }

  /**
   * Remove the authentication token and user data
   */
  static removeToken(): void {
    Cookies.remove(this.TOKEN_KEY);
  }

  /**
   * Check if the user is logged in
   * @returns true if the user has a valid token, false otherwise
   */
  static isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    return true;
  }

  /**
   * Log out the current user
   */
  static logout(): void {
    this.removeToken();
  }

  /**
   * Get the authorization header for API requests
   * @returns Object containing the Authorization header if token exists, empty object otherwise
   */
  static getAuthHeader(): { Authorization?: string } {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Get the current user data
   * @returns The user object or null if not logged in
   */
  static getCurrentUser(): User | null {
    try {
      const token = this.getToken();
      if (!token) return null;

      // Verify token structure
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) return null;

      // Parse and validate payload
      const payload = JSON.parse(atob(tokenParts[1])) as User;

      // Validate required fields
      if (!payload.id || !payload.email) return null;

      return payload;
    } catch {
      return null;
    }
  }
}
