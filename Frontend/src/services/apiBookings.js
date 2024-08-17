import { API_BASE_URL, RES_PER_PAGE } from "../../config/config";

const BOOKINGS_Url = `${API_BASE_URL}/bookings`;

export const getBookings = async (currentPage) => {
  const res = await fetch(
    `${BOOKINGS_Url}?page=${currentPage}&limit=${RES_PER_PAGE}`
  );

  const { data, results } = await res.json();

  return { data,results} ;
};
