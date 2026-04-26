import API from "./api";

/* LOGIN USER */

export const loginUser = async (loginData) => {
  const res = await API.post("/auth/login", loginData);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};


/* REGISTER USER */

export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};


/* LOGOUT */

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};