import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import dayjs from 'dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, MenuItem, Menu, IconButton } from '@mui/material'
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Box, Typography,} from '@mui/material';
import { styled } from '@mui/material/styles';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
const ContentCard = (props) => {
    const [cardMoreOpen, setCardMoreOpen] = useState(null);
    const menuUpdate = props.menuUpdate
    let talk = props.talk;
    let index = props.index;
    let title = 'Scheduled call with ' + talk.firstName + ' ' + talk.lastName
    dayjs.extend(timezone)
    dayjs.extend(utc)
    dayjs.tz.setDefault("America/New_York")
    let time = dayjs(talk.day).utc().local().format('MM-DD-YYYY HH:mm')
    let reasons = talk.reasons
    let description = talk.description
    return (
        <Box  key={time + index} sx={{ p: 3 }}>
            <DrawerHeader />
            <Card
                sx={{
                    width: 500, backgroundColor: 'primary.main', transition: "transform 0.15s ease-in-out", '&:hover': {
                        boxShadow: 20,
                        transform: "scale3d(1.05, 1.05, 1)"
                    },
                }}>

                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
                            {talk.firstName.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <div>
                            <IconButton onClick={(e) => setCardMoreOpen(e.currentTarget)} aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            <StyledEngineProvider injectFirst>
                                <Menu
                                    elevation={1}
                                    id="basic-menu"
                                    anchorEl={cardMoreOpen}
                                    open={Boolean(cardMoreOpen)}
                                    onClose={() => setCardMoreOpen(null)}
                                >
                                    <MenuItem key={index} onClick={() => { menuUpdate(index) }}>Edit</MenuItem>
                                    <MenuItem onClick={() => setCardMoreOpen(null)}>Delete</MenuItem>
                                </Menu>
                            </StyledEngineProvider>
                        </div>
                    }
                    title={title}
                    titleTypographyProps={{variant:'h6' }}
                    subheader={<Typography variant='h7'>{time}</Typography>}
                />
                <CardContent>
                    {
                        reasons.map(
                            (reason, index) => (
                                reason === 'Other' ?
                                    <Typography key={index} variant="h6">
                                        {description}
                                    </Typography> :
                                    <Typography key={index} variant="h6">
                                        {reason}
                                    </Typography>
                            )
                        )
                    }
                </CardContent>
            </Card>
        </Box>
    )
}

export default ContentCard