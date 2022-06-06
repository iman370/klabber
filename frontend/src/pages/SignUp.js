import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import './styles/SignUp.css';
import klabberLogo from '../images/klabber-logo.png';

function SignUp(props) {
    let navigate = useNavigate()
    const location = useLocation();

    const isFirstRender = useRef(true)

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

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

    useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        navigate(`../home`,{state:{username, email}})
      }, [username,email])
      
    const signUp = (email, username, password) => {
        var url = 'http://127.0.0.1:8000/api/signup/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'email':email,'username': username, 'password': password})
        }).then((res) => {
            console.log(res)
            if (res.ok) {
                return res.json()
            }
            else {
            }
        }).then((data) => {
            setUsername(data.username)
            setEmail(data.email)
        })
    }

    return (
        <>
        <div className='navbar'>
            <div className='navbar_logo'>
                <img className='klabber-logo' src={klabberLogo} onClick={() => navigate('../')}/>
            </div>
            <div className='navbar_links'>
                <button onClick={() => navigate('../sign-in')}>Sign In</button>
                <p>Contact</p>
                <p>About us</p>
            </div>
        </div>

        <div id="content">
            <h2>Create an Account</h2>
            <input type="text" className="Email" placeholder="Email" id="email"></input><br></br>
            <input type="text" className="Username" placeholder="Username" id="username"></input><br></br>
            <input type="password" className="Password" placeholder="Password" id="password"></input><br></br>

            <button onClick={() => {signUp(document.getElementById('email').value,document.getElementById('username').value,document.getElementById('password').value)}}>Register</button>

        </div>
        <Footer />
        </>
    )

}

export default SignUp