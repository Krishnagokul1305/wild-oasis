import { API_BASE_URL } from "../../config/config";

const SETTINGS_Url = `${API_BASE_URL}/settings`;

export const getSettings = async () => {
  const res = await fetch(SETTINGS_Url);

  const { data } = await res.json();

  return data;
};

export const updateSettings = async (settings) => {
  try {
    const res = await fetch(SETTINGS_Url, {
      method: "POST",
      body: JSON.stringify(settings),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to update settings");
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
