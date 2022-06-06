import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import './styles/SignUp.css';
import klabberLogo from '../images/klabber-logo.png';

function SignIn(props) {
    const [userId, setUserId] = useState(-1)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')
    const isFirstRender = useRef(true)

    let navigate = useNavigate()

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
        navigate(`../home`,{state:{userId, username}})
      }, [username])

    const login = (username,password) => {
        var url = 'http://127.0.0.1:8000/api/login/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username, 'email':null,'password': password})
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            else {
                setFlashMessageSuccess(false)
                setFlashMessageText('Error. Check username/password details are correct')
                setShowFlashMessage(true)
                window.scrollTo({top: 0, behavior: 'smooth'})
                setTimeout(() => {setShowFlashMessage(false)}, 2000)
            }
        }).then((data) => {
            setUserId(data.id)
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
                <button onClick={() => navigate('../sign-up')}>Sign Up</button>
                <p>Contact</p>
                <p>About us</p>
            </div>
        </div>

        <div id="content">
            <h2>Already have an account?</h2>
            <h1>Sign in.</h1>
            <input type="text" className="Username" placeholder="Username" id="username"></input><br></br>
            <input type="password" className="Password" placeholder="Password" id="password"></input><br></br><br></br>
            
            <button onClick={() => login(document.getElementById('username').value, document.getElementById('password').value)}>Sign In</button>

        </div>
        <Footer />
        </>   
    )

}

export default SignIn