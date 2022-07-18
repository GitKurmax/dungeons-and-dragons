export enum Routes {
    SPELLS = '/api/spells'
}

export type Details = {
    _id: string
    attack_type: string
    casting_time: string
    classes: Spell[]
    components: string[]
    concentration: boolean
    damage: {
        damage_at_slot_level: {
            [key: string]: string
        }
        damage_type: Spell
    }
    desc: string[]
    duration: string
    higher_level: string[]
    index: string
    level: string
    material: string
    name: string
    range: string
    ritual: boolean
    school: {
        name: string
        url: string
    }
    subclasses: Spell[]
    url: string
}

export type Spell = {
    index: string,
    name: string,
    url: string
}

export interface SpellWithDescription extends Spell{
    desc: string
}

export type SpellsResponse = {
    count: number,
    results: Spell[]
}

export type errorResponse = {
    error: string
}

export type fetchResponse = SpellsResponse | errorResponse

