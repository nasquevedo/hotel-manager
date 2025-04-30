import { fetcher } from "../../../shared/services/fetch"

export const getHotels = async (options) => {
    const result = await fetcher('http://localhost:8000/api/v1/hotels', options)

    return result.hotels
}

export const getHotel = async (id, options) => {
    const result = await fetcher(`http://localhost:8000/api/v1/hotels/${id}`, options)

    return result.hotel
}

export const deleteHotel = async (id, options) => {
    const result = await fetcher(`http://localhost:8000/api/v1/hotels/delete/${id}`, options)
    
    return result.message
}

export const createHotel = async (url, options) => {
    const result = await fetcher(url, options)

    return result.message
}