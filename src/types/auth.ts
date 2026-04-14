// ✅ REGISTER
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

// ✅ LOGIN
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export interface GetUsersResponse {
  message: string;
  count: number;
  users: User[];
}
