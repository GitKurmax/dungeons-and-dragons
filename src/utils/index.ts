export const fetchData =  async (route: string) => {
    try {
        const data = await fetch(`${process.env.REACT_APP_API_URL}${route}`)
        return data.json()
    } catch (e) {
        return { error: (e as Error).message }
    }
}