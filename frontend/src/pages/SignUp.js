import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import FlashMessage from './components/FlashMessage';
import klabberLogo from '../images/klabber-logo.png';

function SignUp() {
    let navigate = useNavigate()

    const isFirstRender = useRef(true)

    const [username, setUsername] = useState('');
    const [first_name, setFirstname] = useState('');
    const [email, setEmail] = useState('');

    const [showFlashMessage, setShowFlashMessage] = React.useState(false)
    const [flashMessageSuccess, setFlashMessageSuccess] = React.useState(false)
    const [flashMessageText, setFlashMessageText] = React.useState('')

    const displayFlashMessage = (showGreen, text) => {
        setFlashMessageSuccess(showGreen)
        setFlashMessageText(text)
        setShowFlashMessage(true)
        window.scrollTo({top: 0, behavior: 'smooth'})
        setTimeout(() => {setShowFlashMessage(false)}, 2000)
    }

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
        navigate(`../home`,{state:{username, first_name, email}})
      }, [username,first_name, email])
      
    const signUp = (email, username, first_name, password, password1) => {
        var url = 'http://127.0.0.1:8000/api/signup/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'email':email,'username': username, 'first_name':first_name, 'password': password, 'password1':password1})
        }).then((res) => {
            console.log(res)
            if (res.ok) {
                return res.json()
            }
            else {
                res.json().then(data => {
                    if (data == 'email-exists') displayFlashMessage(false, 'Error. Email is already in use.')
                    if (data == 'username-exists') displayFlashMessage(false, 'Error. Username is already taken.')
                    if (data == 'empty-field') displayFlashMessage(false, 'Error. Missing data.')
                    if (data == 'passwords-dont-match') displayFlashMessage(false, 'Error. Passwords don\'t match.')
                })
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
                <button onClick={() => navigate('../sign-in')}>Sign In</button>
                <p>Privacy</p>
                <p>Terms</p>
                <p>Contact</p>
                <p>What is klabber?</p>
            </div>
        </div>

        <div id="signup-content">
        {showFlashMessage ? <FlashMessage sendData={[showFlashMessage, flashMessageSuccess, flashMessageText]}/>:<FlashMessage sendData={[showFlashMessage, flashMessageSuccess, flashMessageText]}/> }
            <div id='mainbox1'>
                <h2>Don't have an account?</h2>
                <h1>Sign up.</h1>
                <input type="text" className="Username" placeholder="Username" id="username"></input><br></br>
                <div className = "divider_small" />
                <input type="text" className="Nickname" placeholder="Nickname" id="nickname"></input><br></br>
                <div className = "divider_small" />
                <input type="text" className="Email" placeholder="Email" id="email"></input><br></br>
                <div className = "divider_small" />
                <input type="password" className="Password" placeholder="Password" id="password"></input><br></br>
                <input type="password" className="Password1" placeholder="Re-type Password" id="password1"></input><br></br>
                <a href='../sign-in'>Already have an account? Sign in!</a>
                <div className = "divider" />

                <button onClick={() => {signUp(document.getElementById('email').value,document.getElementById('username').value,document.getElementById('nickname').value,document.getElementById('password').value,document.getElementById('password1').value)}}>Sign up</button>

            </div>
        </div>
        <Footer />
        </>
    )

}

export default SignUp