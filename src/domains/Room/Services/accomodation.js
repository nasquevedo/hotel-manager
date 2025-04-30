import { fetcher } from "../../../shared/services/fetch"

export const getAccomodations = async (id, options) => {
    const result = await fetcher(`http://localhost:8000/api/v1/accomodations/${id}`, options)

    return result.accomodations
}