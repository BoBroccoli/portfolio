import { Avatar, Button, IconButton, Paper, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grow from '@mui/material/Grow';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));
const AboutPage = () => {
    const intro = useRef(null);
    const aboutMore = useRef(null);
    const [expended, setExpended] = useState(false);
    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth',
        })
    }
    const expandMore = (elementRef) => {
        scrollToSection(elementRef);
        setExpended(true);
    }
    const closeExpand = (elementRef) => {
        scrollToSection(elementRef);
        setExpended(false);
    }
    return (
        <Box width='100%'>
            <Box ref={intro} sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center ', paddingLeft: 3, paddingRight: 3 }}>
                <DrawerHeader />
                <Paper elevation={24} sx={{ borderRadius: 100 }}>
                    <Avatar alt='Bo Wen' src='photo.jpg' elevation={24} sx={{ width: 200, height: 200 }} />
                </Paper>
                <Paper square position='absolute' top='0' sx={{ marginTop: '-100px', width: 700, height: 500 }} elevation={24}>
                    <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', backgroundColor: 'primary.main' }}>
                        <Box sx={{ height: 100 }}></Box>
                        <Typography padding={2} align='center' variant='h6'>Bo Wen</Typography>
                        <Typography padding={3} align='center' variant='h8'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                            Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit
                            laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
                            Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa
                            tincidunt. Cras tincidunt lobortis feugiat vivamus at augue.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <InstagramIcon sx={{ fontSize: 40, color: '#E4405F' }} />
                            <FacebookIcon sx={{ fontSize: 40, color: '#1877F2' }} />
                            <YouTubeIcon sx={{ fontSize: 40, color: '#CD201F' }} />
                        </Box>

                    </Box>
                </Paper>
                {!expended ? <IconButton onClick={() => expandMore(aboutMore)}>
                    <KeyboardDoubleArrowDownIcon sx={{ fontSize: '50px' }} />
                </IconButton> : <IconButton onClick={() => closeExpand(intro)}>
                    <KeyboardDoubleArrowUpIcon sx={{ fontSize: '50px' }} />
                </IconButton>}

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }} ref={aboutMore}>
                <Grow
                    in={expended}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(expended ? { timeout: 1000 } : {})}
                >
                    <Card sx={{ maxWidth: 345, elevation: 25, variant: 'outlined' }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="200"
                            image='/car.jpg'
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Car Projects
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Worked on multiple car projects, such as changing engine oil/filter,
                                brake pads, AC system diagnose, timing belt service, suspention inspect, and
                                etc.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button sx={{ color: 'secondary.main' }} size="small">Share</Button>
                            <Button sx={{ color: 'secondary.main' }} size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grow>

                <Grow
                    in={expended}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(expended ? { timeout: 1000 } : {})}
                >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="200"
                            image='/food.jpeg'
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Sports, food
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Multiple interests in different sports, basketball, snowboard, hiking. Enjoy
                                different food from different countries.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button sx={{ color: 'secondary.main' }} size="small">Share</Button>
                            <Button sx={{ color: 'secondary.main' }} size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grow>

                <Grow
                    in={expended}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(expended ? { timeout: 1000 } : {})}
                >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="200"
                            image='/coding.gif'
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Coding/CS knowledge
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Studied as computer Science major, enjoy coding, play new technologies and problem solve coding issues
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button sx={{ color: 'secondary.main' }} size="small">Share</Button>
                            <Button sx={{ color: 'secondary.main' }} size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grow>
            </Box>
        </Box>
    )
}

export default AboutPage