import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Spells from './Spells'
import * as fetchDataModule from "../utils"

describe('Spells', () => {
    const f = jest.spyOn(fetchDataModule, 'fetchData')

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders error", async () => {
        f.mockImplementationOnce(() => Promise.resolve({error: 'error'}))
        render(<Spells/>)

        await waitFor(() => {
            expect(screen.getByText("error")).toBeInTheDocument();
        })
    })

    test("renders table", async () => {
        f.mockImplementationOnce(() => Promise.resolve({results: ['1']}))
        render(<Spells/>)

        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();
        })
    })
})

