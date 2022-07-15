import {api_url, url} from '../api'

export const fetchData =  async (route: string, withApi: boolean = false) => {
    let data;
    try {
        data = await fetch(`${withApi ? url : api_url}${route}`)
        return data.json()
    } catch (e: any) {
        return { error: e.message}
    }
}