import {api_url} from '../api'

export const fetchData =  async (route: string) => {
    let data;
    try {
        data = await fetch(`${api_url}${route}`)
        return data.json()
    } catch (e: any) {
        return { error: e.message}
    }
}