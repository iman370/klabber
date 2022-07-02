import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './styles/klabber.css';
import MyProfileCard from './components/MyProfileCard.js';
import HomePageFriends from './components/HomePageFriends';
import NotificationsCard from './components/NotificationsCard';

function Home() {
    let navigate = useNavigate()
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

    return (
    <div id="home-content">
        <div id="mainbox1">
            <div id="column1">
                <MyProfileCard nickname={first_name} username={username} email={email} />
                <div className='divider' />
                <NotificationsCard username={username} />
                <div className='divider' />
                <div onClick={() => navigate('../friends',{state:{username,first_name,email}})}>
                    <HomePageFriends username={username} />
                </div>
            </div>
            <div id="column2">
                <TextField
                    id="statusBox"
                    label="Your status"
                    multiline
                    rows={4}
                    placeholder="Say something!"
                    focused
                />
                <div className='divider' />
                <Box id="klabsBox">
                    <Stack spacing={2}>
                        <h1>klabs</h1>
                        <h1>klab 1</h1>
                        <h1>klab 2</h1>
                    </Stack>
                </Box>
            </div>
            <div id="column3">
                <div id="eventsButtonBox">
                    <Button>Create Event</Button>
                    <Button>Find Event</Button>
                </div>
                <div className='divider'/>
                <Box id="upcomingEventsBox">
                    <h1>Upcoming Events</h1>
                </Box>
                <div className='divider'/>
                <Box id="pastEventsBox">
                    <h1>Past Events</h1>
                </Box>
            </div>

            <div className='divider' />
        </div>
    </div>
    )
}

export default Home