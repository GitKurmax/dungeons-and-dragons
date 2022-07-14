import React, {ReactNode} from 'react'
import {useLocation} from "react-router-dom"
import {Paper, Typography} from '@mui/material'
import {Details} from "../types/types";

const SpellDetails = () => {
    const {state} = useLocation()
    console.log(state)
    return (
        <Paper sx={{
            maxWidth: 1040,
            margin: '50px auto 0',
            padding: '30px'
        }} elevation={3}>
            <Typography align={'center'} fontSize={36} fontWeight={600}>{(state as Details).name}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>{(state as Details).desc}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>{(state as Details).higher_level}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Range: {(state as Details).range}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Components: {(state as Details).components}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Material: {(state as Details).material}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Duration: {(state as Details).duration}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Casting time: {(state as Details).casting_time}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Level: {(state as Details).level}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Attack type: {(state as Details).attack_type}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Damage: {(state as Details).damage.damage_type.toString()}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Damage at slot level: {(state as Details).damage.damage_at_slot_level.toString()}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>School: {(state as Details).school.toString()}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Classes: {(state as Details).classes.toString()}</Typography>
            <Typography align={'center'} fontSize={12} fontWeight={400} mb={2}>Subclasses: {(state as Details).subclasses.toString()}</Typography>
        </Paper>
    );
};

export default SpellDetails;