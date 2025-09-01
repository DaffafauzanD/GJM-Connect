import axios from "axios";

export async function loginUser({ username, password }) {
  const response = await axios.post(
    "/api/v1/auth/login",
    { username, password },
    {
      withCredentials: true, // ensures cookies (JWT) are sent/received
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function logoutUser() {
  const response = await axios.post(
    "/api/v1/auth/logout",
    {},
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}