import axios from "axios";

export const reserveRoom = async ({ selectedRooms, reserveDates }) => {
  try {
    // console.log({ selectedRooms, reserveDates });
    await Promise.all(
      selectedRooms.map((roomId) => {
        const url = `${process.env.REACT_APP_BASE_URL}/rooms/availability/${roomId}`;
        const res = axios.put(url, {
          dates: reserveDates,
        });
        return res.data;
      })
    );
  } catch (err) {
    throw err;
  }
};
