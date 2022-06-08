import React, {useEffect, useState, useRef} from 'react'
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
                <img className='klabber-logo' src={klabberLogo} onClick={() => navigate('../')}/>
            </div>
            <div className='navbar_links'>
                <button onClick={() => navigate('../my-profile')}>My Profile</button>
                <p>Contact</p>
                <p>About us</p>
            </div>
        </div>

        <div id="content">
            <h2>Welcome {first_name}!</h2>
            <h1>Username: {username}</h1>

        </div>
        <Footer />
        </>  
    )
}

export default Home