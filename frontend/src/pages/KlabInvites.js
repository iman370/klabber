import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import JoinReqCard from './components/JoinReqCard';

// Join requests = when people ask to be in your klab
// Invite requests = when someone invites you to their klab

function KlabInvites() {
    let navigate = useNavigate();
    const location = useLocation();
    let username = location.state.username

    const [requests, setRequests] = useState(['No Requests.']);

    // 0 = show join requests
    // 1 = show invite requests
    const [showInvites, setShowInvites] = useState(0);

    useEffect(() => {
        let mounted = true;
        if (showInvites === 0) {
            setRequests([])
            getJoinRequests()
        } else if (showInvites === 1) {
            setRequests([])
            getInviteRequests()
        }
        return () => mounted = false;
    }, [showInvites])

    const getJoinRequests = () => {
        fetch('/api/get-join-requests?username='+username, {
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
                setRequests(['No Requests.'])
            } else {
                setRequests(data)
            }
        }, [requests])
    }

    const getInviteRequests = () => {
        fetch('/api/get-invite-requests?username='+username, {
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
                setRequests(['No Requests.'])
            } else {
                setRequests(data)
            }
        }, [requests])
    }
      
    return (
        <div id="KlabInvites-content">
            <div id="buttonsbox">
                <ButtonGroup variant="text" aria-label="text button group" color='inherit'>
                    <Button onClick={() => setShowInvites(0)}>Incoming Join Requests</Button>
                    <Button onClick={() => setShowInvites(1)}>Incoming Invite Requests</Button>
                </ButtonGroup>
            </div>
            <div className="divider"/>
            <div id="klabs-container">
                {requests.map(function(item){
                    if (item == 'No Requests.') {
                        return(
                            <h1>No Requests.</h1>
                        )
                    }
                    if (showInvites === 0) {
                        return(
                            <JoinReqCard klab={item} myUser={username}/>
                        )
                    } else {
                        return (
                            <><h1>Invite Requests</h1><h1>Nothing available yet.</h1></>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default KlabInvites