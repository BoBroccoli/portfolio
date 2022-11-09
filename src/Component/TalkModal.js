import React from 'react'
import { Box, Modal, Fade, Backdrop, Typography, TextField, Button, Grid, TextareaAutosize } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const reasonOptions = [
    'Car related questions',
    'Coding, algorithm, website questions',
    'Other',
];
const calendarStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: `2px solid primary.main`,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px'
};
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const TalkModal = (props) => {
    const calendarOpen = props.open
    const setCalendar = props.setCalendar
    const day = props.day
    const reasons=props.reasons
    const firstName=props.firstName
    const lastName=props.lastName
    const description=props.description
    const setDay=props.setDay
    const setReasons=props.setReasons
    const setFirstName=props.setFirstName
    const setLastName=props.setLastName
    const setDescription=props.setDescription
    const addTalk=props.addTalk
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={calendarOpen}
            onClose={() => { setCalendar(false) }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={calendarOpen}>
                <Box sx={calendarStyle}>
                    <Typography padding='10px' variant='h5' color='secondary'>
                        Schedual a time to talk...
                    </Typography>
                    <Grid
                        flexGrow={1}
                        container
                        columnSpacing={{ xs: 1 }}
                        rowSpacing={{ xs: 1 }}
                    >
                        <Grid display='flex' justifyContent='flex-end' item xs={6}>
                            <TextField required value={firstName} onChange={(e) => { setFirstName(e.target.value) }} label="First Name" placeholder='Enter first Name' id="name1" variant='outlined' color='secondary' />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required value={lastName} onChange={(e) => { setLastName(e.target.value) }} label="Last Name" placeholder='Enter last Name' id="name2" variant='outlined' color='secondary' />
                        </Grid>
                        <Grid display='flex' justifyContent='flex-end' item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Date"
                                    required
                                    minDate={dayjs()}
                                    inputFormat="MM/DD/YYYY"
                                    value={day}
                                    onChange={(newDay) => { setDay(newDay) }}
                                    renderInput={(params) => <TextField color='secondary' {...params} helperText={params.error ? "Please put a future date" : ""}  {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    minTime={dayjs("09:00:00", "HH:mm:ss")}
                                    maxTime={dayjs("21:00:00", "HH:mm:ss")}
                                    label="Time"
                                    required
                                    ampm={false}
                                    value={day}
                                    onChange={(newDay) => { setDay(newDay) }}
                                    renderInput={(params) => <TextField color='secondary' helperText={params.error ? "Please arrage between 9:00 am and 6:00 pm" : ""}  {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid display='flex' justifyContent='center' item xs={12}>
                            <FormControl sx={{ m: 1, width: 400 }}>
                                <InputLabel required color='secondary' id="demo-multiple-checkbox-label">Reason</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={reasons}
                                    onChange={(event) => {
                                        const {
                                            target: { value },
                                        } = event;
                                        if (value.includes('Other')) {
                                            setReasons(['Other'])
                                        }
                                        else {
                                            setReasons(
                                                typeof value === 'string' ? value.split(';') : value
                                            )
                                        }
                                    }}
                                    input={<OutlinedInput label="Reason" />}
                                    renderValue={(selected) => selected.join('; ')}
                                    MenuProps={MenuProps}
                                >
                                    {reasonOptions.map((reason) => (
                                        <MenuItem key={reason} value={reason}>
                                            <Checkbox color='secondary' checked={reasons.indexOf(reason) > -1} />
                                            <ListItemText primary={reason} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {
                            reasons.length === 1 && reasons[0] === 'Other' ?
                                <Grid item columnGap={2} xs={12} display='flex' justifyContent={'center'} alignItems='center'>
                                    <Typography variant='h7'>
                                        Brief description
                                    </Typography>
                                    <TextareaAutosize
                                        maxRows={10}
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                        style={{ width: 400, height: 50 }}
                                    />
                                </Grid> : null
                        }
                        <Grid display='flex' item xs={12} justifyContent='center'>
                            <Grid item padding={'10px'}>
                                <Button color="secondary" onClick={() => { setCalendar(false) }}>Cancel</Button>
                            </Grid>
                            <Grid item padding={'10px'}>
                                <Button onClick={addTalk} disabled={firstName === '' || lastName === '' || dayjs(day).isBefore(dayjs()) || dayjs(day).hour() < 9 || dayjs(day).hour() > 21} variant="contained" color="success">Submit</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    )
}

export default TalkModal