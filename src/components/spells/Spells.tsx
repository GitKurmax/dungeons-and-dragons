import React, {useEffect, useState} from 'react'
import {errorResponse, fetchResponse, Spell} from '../../types/types'
import SpellsTable from '../spellsTable/SpellsTable'

import styles from './Spells.module.css'
import {Routes} from '../../utils/constants'
import {fetchData} from '../../utils'
import {CircularProgress, Typography} from '@mui/material'

const Spells = () => {
    const [spellsResponse, setSpellsResponse] = useState<Spell[] | errorResponse>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchSpells()
    }, [])

    const fetchSpells = async () => {
        const res: fetchResponse = await fetchData(Routes.SPELLS)
        if ('results' in res) setSpellsResponse(res.results)
        if ('error' in res) setSpellsResponse(res)
        setLoading(false)
    }

    return (
        <div className={styles.tableContainer}>
            <Typography fontSize={48} fontWeight={600} color={'secondary'} mb={8}
                        sx={{
                            '@media screen and (max-width: 450px)': {
                                fontSize: 36,
                                marginBottom: '32px'
                            }
                        }}
            >Dungeons and Dragons</Typography>
            {'error' in spellsResponse ? (
                <div>{spellsResponse.error}</div>
            ) : (
                loading ? <CircularProgress color={'secondary'} sx={{
                    position: 'absolute',
                    top: 'calc(50% - 25px)',
                    left: 'calc(50% - 25px)',
                    margin: 'auto'
                }}/> : <SpellsTable data={spellsResponse}/>)}
        </div>
    )
}

export default Spells