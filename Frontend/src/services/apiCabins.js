import { API_BASE_URL } from "../../config/config";

const CABIN_Url = `${API_BASE_URL}/cabins`;

export const getAllCabins = async () => {
  const res = await fetch(CABIN_Url);

  const { data } = await res.json();

  return data;
};

getAllCabins();

// export const getCabin = async (id) => {};

export const createCabin = async (data) => {};

export const updateCabin = async (id, data) => {};

export const deleteCabin = async (id) => {};
