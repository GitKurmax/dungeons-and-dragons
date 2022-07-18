import React from 'react';
import SpellsTable from './SpellsTable'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import * as fetchDataModule from '../../utils'

describe('SpellsTable', () => {
    const f = jest.spyOn(fetchDataModule, 'fetchData')
    const details = {
        _id: "62cc8c3daa61186cf1c76c25",
        attack_type: "ranged",
        casting_time: "1 action",
        classes: [{
            index: "wizard",
            name: "Wizard",
            url: "/api/classes/wizard"
        }],
        components: ["V", "S", "M"],
        concentration: false,
        damage: {
            damage_type: {
                index: "acid",
                name: "Acid",
                url: "/api/damage-types/acid"
            }, damage_at_slot_level: {}
        },
        desc: ["A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn."],
        duration: "Instantaneous",
        higher_level: ["When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd."],
        index: "acid-arrow",
        level: '2',
        material: "Powdered rhubarb leaf and an adder's stomach.",
        name: "Acid Arrow",
        range: "90 feet",
        ritual: false,
        school: {index: "evocation", name: "Evocation", url: "/api/magic-schools/evocation"},
        subclasses: [{
            index: "lore",
            name: "Lore",
            url: "/api/subclasses/lore"
        }, {
            index: "land",
            name: "Land",
            url: "/api/subclasses/land"
        }],
        url: "/api/spells/acid-arrow",
    }


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

    afterEach(() => {
        jest.clearAllMocks();
    });

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
        f.mockImplementationOnce(() => Promise.resolve({
            ...details
        }))
        render(<SpellsTable data={data}/>);
        fireEvent.click(screen.getAllByTestId("ExpandMoreIcon")[0])

        await waitFor(() => {
            expect(screen.getByText('View all details')).toBeInTheDocument()
        })
    });

    test('renders modal', async () => {
        f.mockImplementationOnce(() => Promise.resolve({
            ...details
        }))
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