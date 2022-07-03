import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import klabberLogo from '../images/klabber-logo.png';

function Landing(props) {
    let navigate = useNavigate()
    const location = useLocation();

    return (
        <>
        <div className='navbar'>
            <div className='navbar_logo'>
                <img className='klabber-logo' src={klabberLogo} onClick={() => navigate('../')}/>
            </div>
            <div className='navbar_links'>
                <button onClick={() => navigate('../sign-in')}>Sign in</button>
                <p>Privacy</p>
                <p>Terms</p>
                <p>Contact</p>
                <p>What is klabber?</p>
            </div>
        </div>

        <div id='landing-content'>
            <div id='mainbox1'>
                <h2>welcome to klabber</h2>
                <button onClick={() => navigate('../sign-in')}>Sign In</button>
                <div className = "divider" />
                <button onClick={() => navigate('../sign-up')}>Sign Up</button>
            </div>
        </div>
        
        <Footer />
        </>

    )
}

export default Landing