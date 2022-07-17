import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import klabberLogo from '../images/klabber-logo.png';

function Settings() {
    let navigate = useNavigate()
    const location = useLocation();

    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

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

    const updateNickname = (nickname) => {
        var url = 'http://127.0.0.1:8000/api/update-nickname/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username, 'first_name':nickname,'password': null})
        }).then((res) => {
            if (res.ok) {
            }
        }).then((data) => {
            first_name = data.first_name
        })
    }

    const updateEmail = (newEmail) => {
        var url = 'http://127.0.0.1:8000/api/update-email/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username, 'email':newEmail,'password': null})
        }).then((res) => {
            if (res.ok) {
            }
        }).then((data) => {
            email = data.email
        })
    }

    const updatePassword = (password, newPassword, newPassword1) => {
        var url = 'http://127.0.0.1:8000/api/update-password/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username,'password': password, 'newPassword': newPassword, 'newPassword1':newPassword1})
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
                <img className='klabber-logo' src={klabberLogo} onClick={() => navigate('../home',{state:{username,first_name,email}})}/>
            </div>
            <div className='navbar_links'>
                <button onClick={() => navigate('../home',{state:{username,first_name,email}})}>Home</button>
                <p>Privacy</p>
                <p>Terms</p>
                <p>Contact</p>
                <p>What is klabber?</p>
            </div>
        </div>

        <div id="settings-content">
            <div id='mainbox1'>
                <h1>Username: {username}</h1>
                <div className = "divider" />

                <h1>Update Nickname</h1>
                <h2>Current Nickname: {first_name}</h2>
                <input type="text" className="UpdateNickname" placeholder="Update Nickname" id="nickname"></input><br></br>
                <button onClick={() => updateNickname(document.getElementById('nickname').value)}>Update Nickname</button>
                <div className = "divider" />

                <h1>Update Email</h1>
                <h2>Current Email: {email}</h2>
                <input type="text" className="UpdateEmail" placeholder="Update Email" id="email"></input><br></br>
                <button onClick={() => updateEmail(document.getElementById('email').value)}>Update Email</button>
                <div className = "divider" />

                <h1>Update Password</h1>
                <input type="password" className="UpdatePassword" placeholder="New Password" id="newPassword"></input><br></br>
                <input type="password" className="UpdatePassword1" placeholder="Re-type Password" id="newPassword1"></input><br></br>
                <input type="password" className="password" placeholder="Current Password" id="password"></input><br></br>
                <button onClick={() => updatePassword(document.getElementById('password').value, document.getElementById('newPassword').value, document.getElementById('newPassword1').value)}>Change Password</button>
                <div className = "divider" />
            </div>



        </div>
        <Footer />
        </>  
    )
}

export default Settings