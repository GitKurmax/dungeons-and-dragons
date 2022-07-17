import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Spells from './Spells'
import * as fetchDataModule from "../utils"

describe('Spells', () => {
    const f = jest.spyOn(fetchDataModule, 'fetchData')

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders error", async () => {
        f.mockImplementationOnce(() => Promise.resolve({error: 'error'}))
        const { getByText } = render(<Spells/>)

        await waitFor(() => {
            expect(getByText("error")).toBeInTheDocument();
        })
    })

    test("renders table", async () => {
        f.mockImplementationOnce(() => Promise.resolve({results: ['1']}))
        const { container } = render(<Spells/>)

        await waitFor(() => {
            expect(container.querySelector('table')).toBeInTheDocument();
        })
    })
})

