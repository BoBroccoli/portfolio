import { Avatar, Toolbar, MenuItem, Typography, Menu, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react'
import IconsCombo from './IconsCombo';
import { styled, useTheme } from '@mui/material/styles';
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function MyAppBar(props) {
  const [avatarOpen, setAvatarOpen] = useState(null);
  const drawerOpen = props.drawerOpen
  const openDrawerHook = props.openDrawerHook
  const handleClose = () => {
    setAvatarOpen(null);
  };
  return (
    <AppBar position='fixed' open={drawerOpen}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={openDrawerHook}
          edge="start"
          sx={{
            ...(drawerOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={{ width: '100%' }} variant="h5" component="div" align='center'>
          Welcome to My Portforlio
        </Typography>
        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={(e) => setAvatarOpen(e.currentTarget)}>
            <Avatar alt='Bo Wen' src='photo.jpg' />
          </IconButton>
          <Menu
            open={Boolean(avatarOpen)}
            anchorEl={avatarOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Container>
            <IconsCombo {...props}/>
          </Container>
        </Box> */}
      </Toolbar>
    </AppBar>
  )
}
