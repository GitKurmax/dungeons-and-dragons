import React from 'react';
import Box from "@mui/material/Box";
import {Details} from "../types/types";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type RowDetailsProps = {
    details: Details
}

const styles = {
    item: {
        flex: '1',
        '& > div:first-of-type': {
            fontSize: 16,
            fontWeight: 600
        },
        '& > div:last-child': {
           padding: '5px 0 10px'
        }
    }
}

function RowDetails(props: RowDetailsProps): JSX.Element {
    const {details} = props
    const navigate = useNavigate();

    const handleViewDetails = (index: string) => {
        navigate(`/spells/${index}`, { state: details })
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'left'
            }}>
                <Box sx={styles.item}>
                    <Box>
                        Level
                    </Box>
                    <Box>
                        {details.level}
                    </Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>
                        Duration
                    </Box>
                    <Box>
                        {details.duration}
                    </Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>
                        Casting time
                    </Box>
                    <Box>
                        {details.casting_time}
                    </Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>
                        School
                    </Box>
                    <Box>
                        {details.school.name}
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'left'
            }}>
                <Box sx={styles.item}>
                    <Box>
                        School
                    </Box>
                    <Box>
                        {details.school.name}
                    </Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>
                        Range
                    </Box>
                    <Box>
                        {details.range}
                    </Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>
                        Attack
                    </Box>
                    <Box>
                        {details.attack_type || 'N/A'}
                    </Box>
                </Box>
                <Box sx={styles.item}>
                    <Box>
                        Components
                    </Box>
                    <Box>
                        {details.components.map((c: string, index: number) => (
                            <span key={index}>{c}</span>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{textAlign: 'justify'}}>
                {details.desc}
            </Box>
            <Button
                sx={{
                    margin: '10px 10px 10px 0',
                }}
                variant={'contained'}
                onClick={() => handleViewDetails(details.index)}
            >View all details</Button>
        </>

    )
}

export default RowDetails;