import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import FlashMessage from './components/FlashMessage';
import klabberLogo from '../images/klabber-logo.png';

function SignIn(props) {
    const [username, setUsername] = useState('')
    const [first_name, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const isFirstRender = useRef(true)

    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')

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

    const displayFlashMessage = (showGreen, text) => {
        setFlashMessageSuccess(showGreen)
        setFlashMessageText(text)
        setShowFlashMessage(true)
        window.scrollTo({top: 0, behavior: 'smooth'})
        setTimeout(() => {setShowFlashMessage(false)}, 2000)
    }

    useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }
        navigate(`../home`,{state:{username, first_name, email}})
      }, [username])

    const login = (username,password) => {
        var url = '/api/login/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username': username, 'first_name':null, 'email':null,'password': password})
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            else {
                displayFlashMessage(false, 'Error. Check username/password details are correct')
            }
        }).then((data) => {
            setUsername(data.username)
            setFirstname(data.first_name)
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
                <p>Privacy</p>
                <p>Terms</p>
                <p>Contact</p>
                <p>What is klabber?</p>
            </div>
        </div>

        <div id="signin-content">
        {showFlashMessage ? <FlashMessage sendData={[showFlashMessage, flashMessageSuccess, flashMessageText]}/>:<FlashMessage sendData={[showFlashMessage, flashMessageSuccess, flashMessageText]}/> }
            <div id='mainbox1'>
                <h2>Already have an account?</h2>
                <h1>Sign in.</h1>
                <input type="text" className="Username" placeholder="Username" id="username"></input><br></br>
                <div className = "divider_small" />
                <input type="password" className="Password" placeholder="Password" id="password"></input><br></br><br></br>
                <a href='../sign-up'>Don't have an account? Sign up!</a>
                <div className = "divider" />
                <button onClick={() => login(document.getElementById('username').value, document.getElementById('password').value)}>Sign In</button>
            </div>
        </div>

        <Footer />
        </>   
    )

}

export default SignIn