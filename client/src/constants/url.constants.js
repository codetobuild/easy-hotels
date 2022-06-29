const BASE_URL = process.env.REACT_APP_BASE_URL;

// USERS URL
export const createUserURL = `${BASE_URL}/auth/register`;

export const loginUserURL = `${BASE_URL}/auth/login`;

export const logoutUserURL = `${BASE_URL}/auth/logout`;

export const updateUserURL = `${BASE_URL}/users`;

export const deleteUserURL = `${BASE_URL}/users`;

export const getUserURL = `${BASE_URL}/users`;

export const getAllUserURL = `${BASE_URL}/users`;

// HOTEL URL
export const createHotelURL = `${BASE_URL}/hotels`;

export const updateHotelURL = `${BASE_URL}/hotels`;

export const deleteHotelURL = `${BASE_URL}/hotels`;

export const getHotelURL = `${BASE_URL}/hotels/find`;

export const getAllHotelURL = `${BASE_URL}/hotels`;

export const countByCityURL = `${BASE_URL}/hotels/countByCity`;

export const countByTypeURL = `${BASE_URL}/hotels/countByType`;

export const getHotelRoomURL = `${BASE_URL}/hotels/room`;

// HOTEL ROOM
export const createRoomURL = `${BASE_URL}/rooms`;

export const getRoomURL = `${BASE_URL}/rooms`;

export const getALLRoomURL = `${BASE_URL}/rooms`;

export const updateRoomAvailabilityURL = `${BASE_URL}/rooms/availability`;

export const deleteRoomURL = `${BASE_URL}/rooms`;
