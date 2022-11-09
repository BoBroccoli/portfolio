import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react'
import MyAppBar from '../Component/MyAppBar'
import LeftDrawer from '../Component/LeftDrawer'
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Fade from '@mui/material/Fade';
import dayjs from 'dayjs';
import TalkPage from '../Page/TalkPage';
import AboutPage from '../Page/AboutPage';
import CarPage from '../Page/CarPage';

function Home() {
  //const mobile = window.innerWidth < 900 ? true : false
  const [mobile, updateMobile] = useState(() => window.innerWidth < 900 ? true : false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [talks, updateTalks] = useState([{ day: dayjs('2022-10-30 09:30'), description: "", firstName: "Kevin", lastName: "Zhang", reasons: ['Car related questions'] },
  { day: dayjs('2022-10-30 10:30'), description: "I just want to know you...", firstName: "Josh", lastName: "Sky", reasons: ['Other'] },
  { day: dayjs('2022-10-30 09:30'), description: "", firstName: "Kevin", lastName: "Zhang", reasons: ['Car related questions'] },
  { day: dayjs('2022-10-30 10:30'), description: "I just want to know you...", firstName: "Josh", lastName: "Sky", reasons: ['Other'] },
  { day: dayjs('2022-10-30 09:30'), description: "", firstName: "Kevin", lastName: "Zhang", reasons: ['Car related questions'] },
  { day: dayjs('2022-10-30 10:30'), description: "I just want to know you...", firstName: "Josh", lastName: "Sky", reasons: ['Other'] },]);

  const [showAlert, setShowAlert] = useState(false);

  const[currentPage, setCurrentPage] = useState('Talk');

  function openDrawerHook() {
    setDrawerOpen(true);
  }
  function updateDrawerOpenHook(value) {
    setDrawerOpen(value);
  }
  function updateTalksHook(newTalks) {
    updateTalks(newTalks);
    setShowAlert(true);
  }
  useEffect(() => {
    function windowResize() {
      updateMobile(window.innerWidth < 900 ? true : false);
    }
    window.addEventListener('resize', windowResize);
    return () => { window.removeEventListener('resize', windowResize) }
  }, [mobile])
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [talks])

  function renderSwitch(page){
    switch(page) {
      case 'Talk':
        return <TalkPage talks={talks} updateTalksHook={updateTalks} />
      case 'About': 
        return <AboutPage />
      case 'Car':
        return <CarPage />
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <LeftDrawer drawerOpen={drawerOpen} updateDrawerOpenHook={updateDrawerOpenHook} setCurrentPage={setCurrentPage}/>
      <MyAppBar mobile={mobile} drawerOpen={drawerOpen} openDrawerHook={openDrawerHook} talks={talks} updateTalks={updateTalksHook} />
      {renderSwitch(currentPage)}
      <Fade in={showAlert} timeout={1000}><Alert
        sx={{ position: 'fixed', bottom: 50, right: 50 }}
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        Talk has been scheduled with Bo
      </Alert></Fade>
    </Box >
  )
}

export default Home