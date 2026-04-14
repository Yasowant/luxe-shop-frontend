import api from "@/lib/axios";
import {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  GetUsersResponse,
  User,
} from "@/types/auth";

// ✅ REGISTER
export const registerUser = async (
  data: RegisterPayload,
): Promise<RegisterResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// ✅ LOGIN
export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// ✅ LOGOUT
export const logoutUser = async (): Promise<{ msg: string }> => {
  const res = await api.post("/auth/logout");
  return res.data;
};

// ✅ GET CURRENT USER
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

// ✅ GET ALL USERS (ADMIN)
export const getAllUsers = async (): Promise<GetUsersResponse> => {
  const res = await api.get("/auth/users");
  return res.data;
};

// ✅ UPDATE USER ROLE (ADMIN)
export const updateUserRole = async (
  userId: string,
  role: string,
): Promise<{ message: string; user: User }> => {
  const res = await api.put(`/auth/user-role/${userId}`, { role });
  return res.data;
};

// ✅ UPDATE PROFILE
export const updateProfile = async (data: {
  name?: string;
  email?: string;
}) => {
  const res = await api.put("/auth/update", data);
  return res.data;
};
