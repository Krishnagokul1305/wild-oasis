import { API_BASE_URL } from "../../config/config";

const API_AUTH = `${API_BASE_URL}/auth`;

const API_USER = `${API_BASE_URL}/users`;

export const login = async (userData) => {
  try {
    const res = await fetch(`${API_AUTH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserData=()=>JSON.parse(localStorage.getItem("user"))

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
  
    if (!token || !userId) return null;

    const res = await fetch(`${API_USER}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("something went wrong");

    const data = await res.json();
    return { user: data.data, token: token };
  } catch (error) {
    console.log(error);
  }
};

// export const signup = async (userData) => {
//   try {
//     const res = await fetch(`${API_AUTH}/sign-up`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });
//     if(!res.ok) throw new Error("something went wrong")

//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateUserPassword = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_USER}/updatePassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error("something went wrong");

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_USER}/updateUser`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: userData,
    });

    if (!res.ok) throw new Error("something went wrong");

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_USER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("something went wrong");
    const data = res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};
