import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import './styles/Landing.css';
import klabberLogo from '../images/klabber-logo.png';

function Landing(props) {
    let navigate = useNavigate()
    const location = useLocation();

    return (
        <>
        <div className='navbar'>
            <div className='navbar_logo'>
                <img className='klabber-logo' src={klabberLogo} onClick={() => navigate('./')}/>
            </div>
            <div className='navbar_links'>
                <button>Sign in</button>
                <button>Sign up</button>
                <p>Contact</p>
                <p>About us</p>
            </div>
        </div>

        <div id="content">
            <h2>welcome to klabber</h2>
        </div>
        <Footer />
        </>

    )
}

export default Landing