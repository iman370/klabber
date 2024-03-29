import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MyProfileCard from './components/MyProfileCard.js';
import HomePageFriends from './components/HomePageFriends';
import NotificationsCard from './components/NotificationsCard';
import StatusBox from './components/StatusBox';

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
                <div onClick={() => navigate('../settings',{state:{username,first_name,email}})}>
                    <MyProfileCard nickname={first_name} username={username} email={email} />
                </div>
                <div className='divider' />
                <NotificationsCard username={username} />
                <div className='divider' />
                <div onClick={() => navigate('../friends',{state:{username,first_name,email}})}>
                    <HomePageFriends username={username} />
                </div>
            </div>
            <div id="column2">
                <StatusBox username={username} />
            </div>
            <div id="column3">
                <div id="klabsButtonBox">
                    <Button onClick={() => navigate('../create-klab',{state:{username,first_name,email}})}>Create Klab</Button>
                    <Button onClick={() => navigate('../find-klabs',{state:{username,first_name,email}})}>Find Klab</Button>
                    <Button onClick={() => navigate('../my-klabs',{state:{username,first_name,email}})}>My Klabs</Button>
                    <Button onClick={() => navigate('../klab-invites',{state:{username,first_name,email}})}>Invites and Requests</Button>
                </div>
                <div className='divider'/>
                <Box id="upcomingKlabsBox">
                    <h1>Upcoming Klabs</h1>
                </Box>
                <div className='divider'/>
                <Box id="pastKlabsBox">
                    <h1>Past klabs</h1>
                </Box>
            </div>

            <div className='divider' />
        </div>
    </div>
    )
}

export default Home