import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MyKlabsCard from './components/MyKlabsCard';
import JoinKlab from './components/JoinKlab';

function MyKlabs() {
    const location = useLocation();
    let username = location.state.username

    const [klabs, setKlabs] = useState(['No klabs available.']);

    // 0 = show my own klabs
    // 1 = show klabs that I'm attending
    const [showMyKlabs, setShowMyKlabs] = useState(0);

    useEffect(() => {
        let mounted = true;
        if (showMyKlabs === 0) {
            setKlabs([])
            getMyKlabs()
        } else if (showMyKlabs === 1) {
            setKlabs([])
            getAttendingKlabs()
        }
        return () => mounted = false;
    }, [showMyKlabs])

    const getMyKlabs = () => {
        fetch('/api/get-my-klabs?username='+username, {
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
                setKlabs(['No klabs available.'])
            } else {
                setKlabs(data)
            }
        }, [klabs])
    }

    const getAttendingKlabs = () => {
        fetch('/api/get-klabs-im-attending?username='+username, {
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
                setKlabs(['No klabs available.'])
            } else {
                setKlabs(data)
            }
        }, [klabs])
    }

    return (
        <div id="MyKlabs-content">
            <div id="buttonsbox">
                <ButtonGroup variant="text" aria-label="text button group" color='inherit'>
                    <Button onClick={() => setShowMyKlabs(0)}>My Klabs</Button>
                    <Button onClick={() => setShowMyKlabs(1)}>Joined Klabs</Button>
                </ButtonGroup>
            </div>
            <div className="divider"/>
            <div id="klabs-container">
                {klabs.map(function(klab){
                    if (klab == 'No klabs available.') {
                        return(
                            <h1>No klabs available.</h1>
                        )
                    }
                    if (showMyKlabs === 0) {
                        return(
                            <MyKlabsCard klab={klab}/>
                        )
                    } else {
                        return (
                            <JoinKlab klab={klab} myUser={username} />
                        )
                    }
                })}
            </div>
        </div>
    )

}

export default MyKlabs