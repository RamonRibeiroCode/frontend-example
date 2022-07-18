import api from "./api";

interface SigninResponse {
  token: string;
  user: User;
}

interface User {
  name: string;
  email: string;
}

export async function signin(email: string, password: string) {
  const response = await api.post<SigninResponse>("/sessions", {
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
