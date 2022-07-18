import React from 'react';
import SpellsTable from './SpellsTable'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'

describe('SpellsTable', () => {
    const data = [
        {
            index: "acid-arrow",
            name: "Acid Arrow",
            url: "/api/spells/acid-arrow"
        },
        {
            index: "acid-splash",
            name: "Acid Splash",
            url: "/api/spells/acid-splash"
        },
        {
            index: "aid",
            name: "Aid",
            url: "/api/spells/aid"
        }
    ]
    // beforeEach(() => {
    //     jest.clearAllMocks();
    // });
    //
    // afterEach(() => {
    //     jest.clearAllMocks();
    // });

    test('renders data', async () => {
        render(<SpellsTable data={data}/>);
        expect(screen.getByText('Acid Arrow')).toBeInTheDocument()
        expect(screen.getByText('Acid Splash')).toBeInTheDocument()
        expect(screen.getByText('Aid')).toBeInTheDocument()
    });

    test('renders filled favorite icon', async () => {
        render(<SpellsTable data={data}/>);
        fireEvent.click(screen.getAllByTestId("FavoriteBorderIcon")[0])

        await waitFor(() => {
            expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument()
            fireEvent.click(screen.getAllByTestId("FavoriteIcon")[0])
        })
    });

    test('renders details', async () => {
        render(<SpellsTable data={data}/>);
        fireEvent.click(screen.getAllByTestId("ExpandMoreIcon")[0])

        await waitFor(() => {
            expect(screen.getByText('View all details')).toBeInTheDocument()
        })
    });

    test('renders modal', async () => {
        render(<SpellsTable data={data}/>);

        fireEvent.click(screen.getAllByTestId("ExpandMoreIcon")[0])

        await screen.findByText('View all details')

        fireEvent.click(screen.getAllByText('View all details')[0])

        await waitFor(() => {
            expect(screen.getByRole('presentation')).toBeInTheDocument()
        })
    });

    test('renders only favorites', async () => {
        const {container} = render(<SpellsTable data={data}/>);

        fireEvent.click(screen.getAllByTestId("FavoriteBorderIcon")[0])

        await screen.getByTestId('FavoriteIcon')

        fireEvent.click(container.getElementsByClassName('MuiSwitch-root')[0])

        await container.getElementsByClassName('Mui-checked')[0]

        expect(screen.getAllByTestId("FavoriteIcon").length).toBe(1)
    });
})