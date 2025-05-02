import { fetcher } from "../../../shared/services/fetch"

const {
    REACT_APP_ACOMMODATIONS_ENDPOINT
} = process.env

export const getAccomodations = async (id, options) => {
    const result = await fetcher(`${REACT_APP_ACOMMODATIONS_ENDPOINT}${id}`, options)

    return result.accomodations
}