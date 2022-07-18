import React from 'react'
import Box from '@mui/material/Box'
import { Details } from '../../types/types'
import { Button } from '@mui/material'

type RowDetailsProps = {
    details: Details
    openModal: (open: boolean) => void
}

const styles = {
    item: {
        flex: '1',
        '& > div:first-of-type': {
            fontSize: 16,
            fontWeight: 600,
            '@media screen and (max-width: 450px)': {
                fontSize: 14,
            }
        },
        '& > div:last-child': {
            padding: '5px 0 10px',
            '@media screen and (max-width: 450px)': {
                fontSize: 10,
            }
        }
    },
    sectionWrapper: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left',
    },
    description: {
        textAlign: 'justify'
    },
    button: {
        margin: '10px 10px 10px 0',
    }
}

function RowDetails(props: RowDetailsProps): JSX.Element {
    const { details, openModal } = props

    const handleViewDetails = () => {
        openModal(true)
    }

    return (
        <>
            <Box sx={styles.sectionWrapper}>
                <Box sx={styles.item}>
                    <Box>Level</Box>
                    <Box>{details.level}</Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>Duration</Box>
                    <Box>{details.duration}</Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>Casting time</Box>
                    <Box>{details.casting_time}</Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>School</Box>
                    <Box>{details.school.name}</Box>
                </Box>
            </Box>
            <Box sx={styles.sectionWrapper}>
                <Box sx={styles.item}>
                    <Box>School</Box>
                    <Box>{details.school.name}</Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>Range</Box>
                    <Box>{details.range}</Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>Attack</Box>
                    <Box>{details.attack_type || 'N/A'}</Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>Components</Box>
                    <Box>
                        {details.components.map((c: string, index: number) => (
                            <span key={index}>{c}</span>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={styles.description}>{details.desc}</Box>
            <Button
                color={'secondary'}
                sx={styles.button}
                variant={'contained'}
                onClick={handleViewDetails}
            >View all details</Button>
        </>
    )
}

export default RowDetails