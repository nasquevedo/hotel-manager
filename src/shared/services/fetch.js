export const fetcher = async (url, options) => {
    try {
        const response = await fetch(url, options);

        if (response.ok) {
            const result = await response.json()

            return result
        }
    } catch(e) {
        console.log(e)
    }
}