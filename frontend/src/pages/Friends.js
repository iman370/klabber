import React, {useEffect, useState, useRef} from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import './styles/Friends.css';
import klabberLogo from '../images/klabber-logo.png';

function Friends(props) {
    let navigate = useNavigate()
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

    //All users
    const [userList, setUserList] = useState(['There are no other users.'])

    //Friends
    const [friendList, setFriendList] = useState(['You have no friends.'])

    useEffect(() => {
        setUserList(["USER 1","USER 2"])
      })

    return (
        <>
        <div className='navbar'>
            <div className='navbar_logo'>
                <img className='klabber-logo' src={klabberLogo} onClick={() => navigate('../home',{state:{username,first_name,email}})}/>
            </div>
            <div className='navbar_links'>
                <button onClick={() => navigate('../my-profile',{state:{username,first_name,email}})}>My Profile</button>
                <p>Privacy</p>
                <p>Terms</p>
                <p>Contact</p>
                <p>What is klabber?</p>
            </div>
        </div>

        <div id="content">
            <h1>Other Users</h1>
                <div id="post-wrapper"> 
                    {userList.map(function(user, index){
                        return(
                            <div key={index} className="post-wrapper flex-wrapper">
                                <span>
                                    <Card className={"test"}>
                                        {user}
                                    </Card>
                                    <div className = "divider" />
                                </span>
                            </div>
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