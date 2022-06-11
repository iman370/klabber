import React, {useEffect, useState, useRef} from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import './styles/Home.css';
import klabberLogo from '../images/klabber-logo.png';

function Home(props) {
    let navigate = useNavigate()
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

    return (
        <>
        <div className='navbar'>
            <div className='navbar_logo'>
                <img className='klabber-logo' src={klabberLogo} onClick={() => navigate('../home',{state:{username,first_name,email}})}/>
            </div>
            <div className='navbar_links'>
                <button onClick={() => navigate('../my-profile',{state:{username,first_name,email}})}>My Profile</button>
                <p>Privacy</p>
                <p>Terms</p>
                <p>Contact</p>
                <p>What is klabber?</p>
            </div>
        </div>

        <div id="content">
            <h1>Welcome {first_name}!</h1>
            <Card bg={'secondary'} border={"primary"} style={{ width: '18rem' }} className="profileCard">
                <Card.Body>
                    <Card.Title>{first_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{username}</Card.Subtitle>
                    <Card.Text>
                    Hellooooo
                    </Card.Text>
                    <Card.Link href="../settings">Card Link</Card.Link>
                </Card.Body>
                </Card>
            <button onClick={() => navigate('../settings',{state:{username,first_name,email}})}>Settings</button>
            <div className='divider' />


        </div>
        <Footer />
        </>  
    )
}

export default Home