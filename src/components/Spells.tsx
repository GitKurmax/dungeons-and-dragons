import React, {useEffect, useState} from 'react'
import {errorResponse, fetchResponse, Spell} from '../types/types'
import SpellsTable from './SpellsTable'

import styles from './Spells.module.css'
import {Routes} from '../api'
import {fetchData} from '../utils'

const Spells = () => {
    const [spellsResponse, setSpellsResponse] = useState<Spell[] | errorResponse>([])

    useEffect(() => {
        fetchSpells()
    }, [])

    const fetchSpells = async () => {
        const res: fetchResponse = await fetchData(Routes.SPELLS)
        if ('results' in res) setSpellsResponse(res.results)
        if ('error' in res) setSpellsResponse(res)
    }

    return (
        <div className={styles.tableContainer}>
            {'error' in spellsResponse ? (
                <div>Error</div>
            ) : (<SpellsTable data={spellsResponse}/>)}
        </div>
    )
}

export default Spells