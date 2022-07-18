import React from 'react';
import * as fetchDataModule from "../utils";
import Modal from './Modal'
import {fireEvent, render, screen} from '@testing-library/react'

describe('Modal', () => {
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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('calls handleOpen function', async () => {
        const handleOpen = jest.fn()

        render(<Modal open={true} handleOpen={handleOpen} detailsObj={details}/>);

        fireEvent.click(screen.getByTestId("CloseIcon"))

        expect(handleOpen).toHaveBeenCalled();
        expect(handleOpen).toHaveBeenCalledWith(false);
    });
})


