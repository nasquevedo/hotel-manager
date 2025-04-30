import { fetcher } from "../../../shared/services/fetch"

export const getCities = async () => {
    const result = await fetcher('http://localhost:8000/api/v1/cities')

    return result.cities
}