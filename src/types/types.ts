export type Spell = {
    index: string,
    name: string,
    url: string
}

export type SpellsResponse = {
    count: number,
    results: Spell[]
}

export type errorResponse = {
    error: string
}

export type fetchResponse = SpellsResponse | errorResponse

