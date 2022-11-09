import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { MenuItem } from '@mui/material'
import { Box, Modal, Fade, Backdrop, Typography, TextField, Button, Grid, TextareaAutosize } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ContentCard from '../Component/ContentCard';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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


const TalkPage = (props) => {
  const talks = props.talks;
  const updateTalksHook = props.updateTalksHook;
  const [edit, setEdit] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [day, setDay] = useState(dayjs())
  const [reasons, setReasons] = useState([])
  const [description, setDescription] = useState('')
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [talks])
  const updateTalks = () => {
    let updatedTalk = {
      firstName: firstName,
      lastName: lastName,
      day: day,
      reasons: reasons,
      description: description
    }
    let updatedTalks = talks.map(talk => {
      if (talk === talks[parseInt(edit)])
        return { ...updatedTalk };
      return talk
    })
    setEdit('')
    updateTalksHook([...updatedTalks])
    setShowAlert(true);
  }
  const menuUpdate = (index) => {
    let talk = { ...talks[index] };
    setEdit('' + index);
    setFirstName(talk.firstName);
    setLastName(talk.lastName);
    setDay(talk.day);
    setReasons(talk.reasons);
    setDescription(talk.description)
  }
  return (
    <Box display={'flex'} flexWrap='wrap'>
      {
        talks.map((talk, index) => {
          return <ContentCard key={index} talk={talk} index={index} menuUpdate={menuUpdate} />
        })
      }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={Boolean(edit)}
        onClose={() => { setEdit('') }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Boolean(edit)}>
          <Box sx={calendarStyle}>
            <Typography padding='10px' variant='h5' color='secondary'>
              Update the talk to another time
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
                  <Button color="secondary" onClick={() => { setEdit('') }}>Cancel</Button>
                </Grid>
                <Grid item padding={'10px'}>
                  <Button disabled={firstName === '' || lastName === '' || dayjs(day).isBefore(dayjs()) || dayjs(day).hour() < 9 || dayjs(day).hour() > 21}
                    variant="contained"
                    color="success"
                    onClick={() => { updateTalks() }}
                  >Update</Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
      <Fade in={showAlert} timeout={1000}><Alert
        sx={{ position: 'fixed', bottom: 50, right: 50 }}
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        Talk has been updated with Bo
      </Alert></Fade>
    </Box>
  )
}

export default TalkPage