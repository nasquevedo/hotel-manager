import { fetcher } from "../../../shared/services/fetch"

export const getRooms = async (options) => {
    const result = await fetcher('http://localhost:8000/api/v1/rooms', options);

    return result.rooms
} 