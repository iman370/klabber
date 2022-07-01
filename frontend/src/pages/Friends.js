import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import OtherUserCard from './components/OtherUserCard';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import './styles/klabber.css';
import klabberLogo from '../images/klabber-logo.png';

function Friends(props) {
    let navigate = useNavigate()
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

    //All users
    const [userList, setUserList] = useState(['There are no other users.'])

    // true = show friends
    // false = show all users
    const [showFriends, setShowFriends] = useState(true); // KEEP TRUE

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

    // When the user presses the "friends" or "find friends" buttons
    useEffect(() => {
        let mounted = true;
        if (showFriends) {
            getAllFriends()
        } else {
            getAllUsers()
        }
        return () => mounted = false;
      }, [showFriends])

    const getAllUsers = () => {
        fetch('http://127.0.0.1:8000/api/get-all-users/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify()
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then((data) => {
            setUserList(data)
        }, [userList])
    }

    
    const getAllFriends = () => {
        fetch('http://127.0.0.1:8000/api/get-all-friends?username='+username, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify()
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then((data) => {
            setUserList(data)
        }, [userList])
    }

    return (
        <>
        <div id="friends-content">
            <div className="divider"/>
            <div id="buttonsbox">
                <ButtonGroup variant="text" aria-label="text button group" color='inherit'>
                    <Button onClick={() => setShowFriends(true)}>Friends</Button>
                    <Button onClick={() => setShowFriends(false)}>Find Friends</Button>
                </ButtonGroup>
            </div>
            <div className="divider"/>
                <div id="users-container"> 
                    {userList.map(function(user, index){
                        if (user[0] == username) {
                            return(null)
                        }
                        return(
                            <OtherUserCard user={user} myUser={username} />
                        )
                    })}
                </div>
            <div className='divider' />
        </div>
        <Footer />
        </>  
    )
}

export default Friends