import axios from "axios";
import {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
} from "@/types/auth";

const API_URL = import.meta.env.VITE_API_URL;

// ✅ REGISTER
export const registerUser = async (
  data: RegisterPayload,
): Promise<RegisterResponse> => {
  const res = await axios.post(`${API_URL}/auth/register`, data, {
    withCredentials: true,
  });
  return res.data;
};

// ✅ LOGIN
export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/auth/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const logoutUser = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );

  return res.data;
};
