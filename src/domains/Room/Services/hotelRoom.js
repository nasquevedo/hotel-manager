import { fetcher } from "../../../shared/services/fetch"

const {
    REACT_APP_HOTEL_ROOMS_ENDPOINT,
    REACT_APP_HOTEL_ROOM_ENDPOINT,
    REACT_APP_HOTEL_ROOM_DELETE_ENDPOINT
} = process.env

export const getHotelRooms = async (options) => {
    const result = await fetcher(`${REACT_APP_HOTEL_ROOMS_ENDPOINT}`, options)

    return result.hotel_rooms
}

export const getHotelRoom = async (id, options) => {
    const result = await fetcher(`${REACT_APP_HOTEL_ROOM_ENDPOINT}${id}`, options)

    return result.hotel_room[0]
}

export const deleteHotelRoom = async (id, options) => {
    const result = await fetcher(`${REACT_APP_HOTEL_ROOM_DELETE_ENDPOINT}${id}`, options)

    return result.message
}

export const createHotelRoom = async (url, options) => {
    const result = await fetcher(url, options)

    return result.message
}