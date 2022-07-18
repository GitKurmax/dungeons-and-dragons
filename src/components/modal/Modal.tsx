import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import SpellDetails from "../spellDetails/SpellDetails"
import { Details } from "../../types/types"

type ModalProps = {
    open: boolean,
    handleOpen: (state: boolean)=> void,
    detailsObj: Details
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    maxHeight: '90%',
    overflow: 'auto',
    bgcolor: 'rgba(255,255,255,0.6)',
    opacity: '0.5',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
}

export default function TransitionsModal({ open, handleOpen, detailsObj }: ModalProps) {
    const handleClose = () => {
        handleOpen(false)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <SpellDetails state={detailsObj} closeModal={handleClose}/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}