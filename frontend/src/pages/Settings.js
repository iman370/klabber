import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import './styles/Settings.css';
import klabberLogo from '../images/klabber-logo.png';

function Settings(props) {
    let navigate = useNavigate()
    const location = useLocation();
    const [email, setEmail] = useState('')

    let username = location.state.username
    let first_name = location.state.first_name
    let userEmail = location.state.email

    const getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const updateEmail = (email) => {
        var url = 'http://127.0.0.1:8000/api/update-email/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username, 'email':email,'password': null})
        }).then((res) => {
            if (res.ok) {
            }
        }).then((data) => {
            setEmail(data.email)
            userEmail = data.email
        })
    }

    const updatePassword = (password, newPassword) => {
        var url = 'http://127.0.0.1:8000/api/update-password/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username,'password': password, 'newPassword': newPassword})
        }).then((res) => {
            if (res.ok) {
            }
        }).then((data) => {
        })
    }

    return (
        <>
        <div className='navbar'>
            <div className='navbar_logo'>
                <img className='klabber-logo' src={klabberLogo} onClick={() => navigate('../home')}/>
            </div>
            <div className='navbar_links'>
                <button onClick={() => navigate('../home',{state:{username,first_name,userEmail}})}>Home</button>
                <p>Privacy</p>
                <p>Terms</p>
                <p>Contact</p>
                <p>What is klabber?</p>
            </div>
        </div>

        <div id="content">
            <div id='mainbox1'>
                <h1>Username: {username}</h1>
                <div className = "divider" />

                <h2>Update Email</h2>
                <h1>Current Email: {userEmail}</h1>
                <input type="text" className="UpdateEmail" placeholder="Update Email" id="email"></input><br></br>
                <button onClick={() => updateEmail(document.getElementById('email').value)}>Update Email</button>
                <div className = "divider" />

                <h2>Update Password</h2>
                <input type="password" className="UpdatePassword" placeholder="New Password" id="newPassword"></input><br></br>
                <input type="password" className="password" placeholder="Current Password" id="password"></input><br></br>
                <button onClick={() => updatePassword(document.getElementById('password').value, document.getElementById('newPassword').value)}>Change Password</button>
                <div className = "divider" />
            </div>



        </div>
        <Footer />
        </>  
    )
}

export default Settings