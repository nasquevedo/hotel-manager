import { fetcher } from "../../../shared/services/fetch"

export const getHotelRooms = async (options) => {
    const result = await fetcher('http://localhost:8000/api/v1/hotel/rooms', options)

    return result.hotel_rooms
}

export const getHotelRoom = async (id, options) => {
    const result = await fetcher(`http://localhost:8000/api/v1/hotel/rooms/${id}`, options)

    return result.hotel_room[0]
}

export const deleteHotelRoom = async (id, options) => {
    const result = await fetcher(`http://localhost:8000/api/v1/hotel/rooms/delete/${id}`, options)

    return result.message
}

export const createHotelRoom = async (url, options) => {
    const result = await fetcher(url, options)

    return result.message
}