import { fetcher } from "../../../shared/services/fetch"

const {
    REACT_APP_ROOMS_ENDPOINT
} = process.env

export const getRooms = async (options) => {
    const result = await fetcher(`${REACT_APP_ROOMS_ENDPOINT}`, options);

    return result.rooms
} 