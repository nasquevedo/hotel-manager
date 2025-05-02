import { fetcher } from "../../../shared/services/fetch"

const {
    REACT_APP_HOTELS_ENDPOINT,
    REACT_APP_HOTEL_ENDPOINT,
    REACT_APP_HOTEL_DELETE_ENDPOINT
} = process.env

export const getHotels = async (options) => {
    //const result = await fetcher('http://localhost:8000/api/v1/hotels', options) 
    const result = await fetcher(REACT_APP_HOTELS_ENDPOINT, options) 

    return result.hotels
}

export const getHotel = async (id, options) => {
    //const result = await fetcher(`http://localhost:8000/api/v1/hotels/${id}`, options)
    const result = await fetcher(`${REACT_APP_HOTEL_ENDPOINT}${id}`, options)

    return result.hotel
}

export const deleteHotel = async (id, options) => {
    //const result = await fetcher(`http://localhost:8000/api/v1/hotels/delete/${id}`, options)
    const result = await fetcher(`${REACT_APP_HOTEL_DELETE_ENDPOINT}${id}`, options)
    
    return result.message
}

export const createHotel = async (url, options) => {
    const result = await fetcher(url, options)

    return result.message
}