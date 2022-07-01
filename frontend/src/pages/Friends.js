import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import OtherUserCard from './components/OtherUserCard';
import { useLocation } from 'react-router-dom';
import './styles/klabber.css';

function Friends(props) {
    const location = useLocation();
    let username = location.state.username

    //All users
    const [userList, setUserList] = useState(['There are no other users.'])

    // true = show friends
    // false = show all users
    const [showFriends, setShowFriends] = useState(true);

    // When the user presses the "friends" or "find friends" buttons
    useEffect(() => {
        let mounted = true;
        if (showFriends) {
            setUserList([])
            getAllFriends()
        } else {
            setUserList([])
            getAllUsers()
        }
        return () => mounted = false;
      }, [showFriends])

    const getAllUsers = () => {
        fetch('http://127.0.0.1:8000/api/get-other-users?username='+username, {
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
            if (data.length === 0) {
                setUserList(['There are no other users.'])
            } else {
                setUserList(data)
            }
            console.log(userList) //////
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
            if (data.length === 0) {
                setUserList(['You have no friends.'])
            } else {
                setUserList(data)
            }
            console.log(userList) //////
        }, [userList])
    }

    return (
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
                    {userList.map(function(user){
                        if (user == 'There are no other users.') {
                            return(
                                <h1>There are no other users.</h1>
                            )
                        }
                        if (user == 'You have no friends.') {
                            return(
                                <h1>You have no friends.</h1>
                            )
                        }
                        console.log(user[0])
                        return(
                            <OtherUserCard user={user} myUser={username} />
                        )
                    })}
                </div>
            <div className='divider' />
        </div>
    )
}

export default Friends