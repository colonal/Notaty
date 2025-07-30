import axios, { InternalAxiosRequestConfig } from "axios";
import { UserManagementService } from "./userManagementService";

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Add auth header if token exists
  const headers = UserManagementService.getAuthHeader();
  config.headers.set("Authorization", headers.Authorization);
  return config;
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      UserManagementService.logout();
      // Redirect to login page if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = `/login?callbackUrl=${window.location.pathname}`;
      }
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
    user: User;
  };
}

export interface RegisterResponse {
  data: {
    token: string;
    user: User;
  };
}

// API functions
export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>("/users/login", credentials);
    UserManagementService.saveToken(data.data.token);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Login failed";
      console.error("Login error:", error.response?.data);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<RegisterResponse> => {
  try {
    const { data } = await api.post<RegisterResponse>(
      "/users/register",
      credentials
    );
    UserManagementService.saveToken(data.data.token);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      console.error("Registration error:", error.response?.data);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
