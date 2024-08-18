import { API_BASE_URL, RES_PER_PAGE } from "../../config/config";

const BOOKINGS_URL = `${API_BASE_URL}/bookings`;

export const getBookings = async (currentPage) => {
  try {
    const res = await fetch(
      `${BOOKINGS_URL}?page=${currentPage}&limit=${RES_PER_PAGE}`
    );

    // Check if the response status is OK (status code 200-299)
    if (!res.ok) {
      throw new Error(`Failed to fetch bookings: ${res.status} ${res.statusText}`);
    }

    const { data, results } = await res.json();
    return { data, results };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { data: [], results: 0 }; // Return a default response
  }
};

export const getBooking = async (id) => {
  try {
    const res = await fetch(`${BOOKINGS_URL}/${id}`);

    // Check if the response status is OK (status code 200-299)
    if (!res.ok) {
      throw new Error(`Failed to fetch booking with ID ${id}: ${res.status} ${res.statusText}`);
    }

    const { data } = await res.json();
    return  data 
  } catch (error) {
    console.error(`Error fetching booking with ID ${id}:`, error);
    return null; // Return null or a default value in case of error
  }
};
