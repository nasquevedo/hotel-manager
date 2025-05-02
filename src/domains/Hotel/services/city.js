import { fetcher } from "../../../shared/services/fetch"

const {
    REACT_APP_CITIES_ENDPOINT
} = process.env

export const getCities = async () => {
    console.log(REACT_APP_CITIES_ENDPOINT)
    const result = await fetcher(`${REACT_APP_CITIES_ENDPOINT}`)

    return result.cities
}