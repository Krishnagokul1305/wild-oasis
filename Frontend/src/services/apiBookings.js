import { API_BASE_URL } from "../../config/config";

const BOOKINGS_Url = `${API_BASE_URL}/bookings`;

export const getBookings = async () => {
  const res = await fetch(BOOKINGS_Url);

  const { data } = await res.json();
  console.log(data);
  return data;
};
