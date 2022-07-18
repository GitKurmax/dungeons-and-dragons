import React, { useState } from 'react'
import { Button, IconButton, Paper, Typography } from '@mui/material'
import { Details, SpellWithDescription } from "../../types/types"
import Box from "@mui/material/Box"
import CloseIcon from '@mui/icons-material/Close'
import { fetchData } from "../../utils"

type SpellDetailsProps = {
    state: Details, closeModal: () => void
}

const styles = {
    paper: {
        position: 'relative',
        maxWidth: 1040,
        padding: '30px',
    },
    itemTitle: {
        fontWeight: '600',
        marginRight: '10px'
    },
    close: {
        position: 'absolute',
        top: '5px',
        right: '5px'
    }
}

const SpellDetails = ({ state, closeModal }: SpellDetailsProps) => {
    const [schoolDesc, setSchoolDesc] = useState<string>('')
    const [subClassDesc, setSubClassDesc] = useState<string>('')

    const fetchDetailsData = async (url: string, index: string) => {
        const res: SpellWithDescription = await fetchData(url)

        switch (index) {
            case 'school':
                setSchoolDesc(res.desc)
                return
            case 'subClasses':
                setSubClassDesc(res.desc)
                return

        }
    }

    return (
        <Paper sx={styles.paper} elevation={3}>
            <IconButton sx={styles.close} onClick={closeModal}>
                <CloseIcon color={'secondary'}/>
            </IconButton>
            <Typography color={'secondary'} align={'center'} fontSize={36} fontWeight={600}>{state.name}</Typography>
            <Typography align={'justify'} fontSize={12} fontWeight={400} mb={2}>{state.desc}</Typography>
            <Typography align={'justify'} fontSize={12} fontWeight={400} mb={2}>{state.higher_level}</Typography>
            <Typography align={'left'} fontSize={12} fontWeight={400} mb={2}>
                <Box component='span' sx={styles.itemTitle}>
                    Range:
                </Box>
                {state.range}
            </Typography>
            <Typography align={'left'} fontSize={12} fontWeight={400} mb={2}>
                <Box component='span' sx={styles.itemTitle}>
                    Components:
                </Box>
                {state.components.join('-')}
            </Typography>
            <Typography align={'left'} fontSize={12} fontWeight={400} mb={2}>
                <Box component='span' sx={styles.itemTitle}>Material:</Box>
                {state.material}
            </Typography>
            <Typography align={'left'} fontSize={12} fontWeight={400} mb={2}>
                <Box component='span' sx={styles.itemTitle}>Duration:</Box>
                {state.duration}
            </Typography>
            <Typography align={'left'} fontSize={12} fontWeight={400} mb={2}>
                <Box component='span' sx={styles.itemTitle}>Casting time:</Box>
                {state.casting_time}
            </Typography>
            <Typography align={'left'} fontSize={12} fontWeight={400} mb={2}>
                <Box component='span' sx={styles.itemTitle}>Level:</Box>
                {state.level}
            </Typography>
            {state.attack_type && <Typography align={'left'} fontSize={12} fontWeight={400} mb={2}>
                <Box component='span' sx={styles.itemTitle}>Attack type:</Box>
                {state.attack_type}
            </Typography>}
            {state.damage?.damage_type && <Typography
                align={'left'}
                fontSize={12}
                fontWeight={400} mb={2}
            >
                <Box component='span' sx={styles.itemTitle}>Damage:</Box>
                {state.damage?.damage_type.name}
            </Typography>}
            {state.damage?.damage_at_slot_level && <Typography
                align={'left'}
                fontSize={12}
                fontWeight={400}
                mb={2}>
                <Box component='span' sx={styles.itemTitle}>Damage at slot level:</Box>
                {state.damage?.damage_at_slot_level?.toString()}
            </Typography>}
            {state.school && <Typography component={'div'} align={'left'} fontSize={12} fontWeight={400}>
                <Box
                    component='span'
                    sx={styles.itemTitle}>
                    School:
                </Box>
                <Button
                    color={'secondary'}
                    onClick={() => fetchDetailsData(state.school.url, 'school')
                    }>
                    {state.school.name}
                </Button>
                <Box>
                    {schoolDesc}
                </Box>
            </Typography>}
            {state.classes && <Typography align={'left'} fontSize={12} fontWeight={400}>
                <Box component='span' sx={styles.itemTitle}>Classes: </Box>
                {state.classes.map(item => (
                    <Box key={item.index} component={'span'}>
                        {item.name}
                    </Box>
                ))}
            </Typography>}
            {state.subclasses && <Typography component={'div'} align={'left'} fontSize={12} fontWeight={400}>
                <Box component='span' sx={styles.itemTitle}>Subclasses: </Box>
                {state.subclasses.map(item => (
                    <Button key={item.index} color={'secondary'}
                            onClick={() => fetchDetailsData(item.url, 'subClasses')}>
                        {item.name}
                    </Button>
                ))}
                <Box>
                    {subClassDesc}
                </Box>
            </Typography>}
        </Paper>
    )
}

export default SpellDetails