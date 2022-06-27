import React, {useEffect, useState, useRef} from 'react'
import Card from 'react-bootstrap/Card'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import './styles/klabber.css';
import klabberLogo from '../images/klabber-logo.png';

function Home(props) {
    let navigate = useNavigate()
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

    return (
    <div id="home-content">
        <div id="mainbox1">
            <h1>Welcome {first_name}!</h1>
            <Card id="profileCard">
                <Card.Body>
                    <Card.Title>{first_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">@{username}</Card.Subtitle>
                    <Card.Text>Hellooooo</Card.Text>
                    <Card.Link onClick={() => navigate('../settings',{state:{username,first_name,email}})}>Settings</Card.Link>
                </Card.Body>
            </Card>
            <div className='divider' />
            <Box id="notificationsBox">
                <Stack spacing={2}>
                    <h1>Notification 1</h1>
                    <h1>Notification 2</h1>
                    <h1>Notification 3</h1>
                </Stack>
                </Box>
            <div className='divider' />
            <Card id="friendsCard">
                <Card.Body>
                    <Card.Title>Friends</Card.Title>
                </Card.Body>
            </Card>
            <div className='divider' />
            
            <button onClick={() => navigate('../friends',{state:{username,first_name,email}})}>Friends</button>
            <div className='divider' />
        </div>
    </div>
    )
}

export default Home