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
    console.log(data.data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const res = await fetch(`${API_USER}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    console.log(data);
    return data.data;
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
//   } catch (error) {
//     console.log(error);
//   }
// };
