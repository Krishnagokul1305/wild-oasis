import { API_BASE_URL } from "../../config/config";

const CABIN_Url = `${API_BASE_URL}/cabins`;

export const getAllCabins = async () => {
  const res = await fetch(CABIN_Url);

  const { data } = await res.json();

  return data;
};

// export const getCabin = async (id) => {};

export const createCabin = async (cabinData) => {
  try {
    const res = await fetch(CABIN_Url, {
      method: "POST",
      body: cabinData,
    });

    if (!res.ok) {
      throw new Error("Failed to create a new cabin.");
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating cabin:", error);
    throw error;
  }
};

export const updateCabin = async ({ id, data: cabinData }) => {
  try {
    console.log(id,cabinData);
    const res = await fetch(`${CABIN_Url}/${id}`, {
      method: "PATCH",
      body: cabinData,
    });

    if (!res.ok) {
      throw new Error("Failed to create a new cabin.");
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating cabin:", error);
    throw error;
  }
};

export const deleteCabin = async (id) => {
  const res = await fetch(`${CABIN_Url}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) return new Error("cabin cannot be deleted");
};
