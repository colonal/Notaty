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
  token: string;
  user: User;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
}

export interface UpdateNoteRequest {
  _id: string;
  title?: string;
  content?: string;
}

// API functions
export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<BaseResponse<LoginResponse>>(
      "/users/login",
      credentials
    );
    UserManagementService.saveToken(data.data.token);
    return data.data;
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
    const { data } = await api.post<BaseResponse<RegisterResponse>>(
      "/users/register",
      credentials
    );
    UserManagementService.saveToken(data.data.token);
    return data.data;
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

export const createNote = async (
  note: CreateNoteRequest
): Promise<BaseResponse<Note>> => {
  try {
    const { data } = await api.post<BaseResponse<Note>>("/notes", note);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to create note";
      console.error("Note creation error:", error.response?.data);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const updateNote = async (
  note: UpdateNoteRequest
): Promise<BaseResponse<Note>> => {
  try {
    const { data } = await api.put<BaseResponse<Note>>(`/notes`, note);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update note";
      console.error("Note update error:", error.response?.data);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const deleteNote = async (
  noteId: string
): Promise<BaseResponse<null>> => {
  try {
    const { data } = await api.delete<BaseResponse<null>>(`/notes/${noteId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete note";
      console.error("Note deletion error:", error.response?.data);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const getNote = async (noteId: string): Promise<BaseResponse<Note>> => {
  try {
    const { data } = await api.get<BaseResponse<Note>>(`/notes/${noteId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch note";
      console.error("Note fetch error:", error.response?.data);
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const getNotes = async (): Promise<BaseResponse<Note[]>> => {
  try {
    const { data } = await api.get<BaseResponse<Note[]>>("/notes");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch notes";
      console.error("Notes fetch error:", error.response?.data);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
