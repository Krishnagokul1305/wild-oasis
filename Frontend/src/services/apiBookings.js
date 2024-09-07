import { API_BASE_URL, RES_PER_PAGE } from "../../config/config";

const BOOKINGS_URL = `${API_BASE_URL}/bookings`;

export const getBookings = async (currentPage) => {
  try {
    const res = await fetch(
      `${BOOKINGS_URL}?page=${currentPage}&limit=${RES_PER_PAGE}`
    );

    // Check if the response status is OK (status code 200-299)
    if (!res.ok) {
      throw new Error(
        `Failed to fetch bookings: ${res.status} ${res.statusText}`
      );
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
      throw new Error(
        `Failed to fetch booking with ID ${id}: ${res.status} ${res.statusText}`
      );
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching booking with ID ${id}:`, error);
    return null; 
  }
};

export const getBookingStats = async () => {
  try {
    const res = await fetch(`${BOOKINGS_URL}/7Days-bookings`);
    if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};



export const getRecentStay = async () => {
  try {
    const res = await fetch(`${BOOKINGS_URL}/StaysLast7Days`);
    if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTodayActivities = async () => {
  try {
    const res = await fetch(`${BOOKINGS_URL}/todayActivities`);
    if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkIn = async ({ id, bookingData }) => {
  try {
    const res = await fetch(`${BOOKINGS_URL}/check-in/${id}`, {
      method: "PATCH",
      body: JSON.stringify(bookingData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("cannot check-in the booking");
    }

    await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const checkOut = async (id) => {
  try {
    const res = await fetch(`${BOOKINGS_URL}/check-out/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("cannot check-out the booking");
    }

    await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteBooking = async (id) => {
  try {
    const res = await fetch(`${BOOKINGS_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("cannot delete the booking");
    }

    await res.json();
  } catch (error) {
    console.log(error);
  }
};
