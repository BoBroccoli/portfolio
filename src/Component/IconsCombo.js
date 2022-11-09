import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box, Container, IconButton, Modal, Fade, Backdrop, Typography, Input, TextField, Button, Grid, TextareaAutosize, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import TalkModal from './TalkModal';
const searchStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: `2px solid primary.main`,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '10px'
};
const reasonOptions = [
    'Car related questions',
    'Coding, algorithm, website questions',
    'Other',
];

const IconsCombo = (props) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [calendarOpen, setCalendar] = useState(false);
    const [day, setDay] = useState(dayjs())
    const [reasons, setReasons] = useState([])
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('')

    const { talks, updateTalks } = props
    const addTalk = () => {
        const newTalk = {
            firstName: firstName,
            lastName: lastName,
            day: day,
            reasons: reasons,
            description: description
        }
        updateTalks([...talks, newTalk])
        setCalendar(false);
    };

    return (
        <Container sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton onClick={() => { setSearchOpen(true) }}>
                <SearchIcon />
            </IconButton>
            <IconButton onClick={() => setCalendar(true)}>
                <CalendarTodayIcon />
            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={searchOpen}
                onClose={() => { setSearchOpen(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={searchOpen}>
                    <Box sx={searchStyle}>
                        <SearchIcon />
                        <Input sx={{ width: '100%' }} placeholder="Search" />
                    </Box>
                </Fade>
            </Modal>
            <TalkModal
                open={calendarOpen}
                setCalendar={setCalendar}
                BackdropComponent={Backdrop} 
                day={day}
                reasons={reasons}
                firstName={firstName}
                lastName={lastName}
                description={description}
                setDay={setDay}
                setReasons={setReasons}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setDescription={setDescription}
                talks={talks}
                addTalk={addTalk}
            />
        </Container>
    )
}

export default IconsCombo