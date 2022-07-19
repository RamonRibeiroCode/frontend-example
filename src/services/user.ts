import api from "./api";

interface LoginResponse {
  token: string;
  user: User;
}

interface User {
  name: string;
  email: string;
}

export async function login(email: string, password: string) {
  const response = await api.post<LoginResponse>("/sessions", {
    email: email,
    password: password,
  });

  const token = response.data.token;
  const user = response.data.user;

  api.defaults.headers.common.authorization = `Bearer ${token}`;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);

  return user;
}

export async function register(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  age: number
) {
  await api.post("/users/create", {
    email,
    firstName,
    lastName,
    password,
    age,
  });
}
