import React from 'react'
import {fetchData} from "./index"


describe('fetch data', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("returns data", async () => {
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => Promise.resolve({results: []})}))
        const res = await fetchData('/api/spells')

        expect(res.results).toStrictEqual([])
    })

    test("returns error", async () => {
        global.fetch = jest.fn().mockImplementation(() => Promise.reject({message: 'error'}))
        const res = await fetchData('/api/spells')

        expect(res.error).toBe('error')
    })
})

