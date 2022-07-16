import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MyKlabsCard from './components/MyKlabsCard';

function MyKlabs() {
    let navigate = useNavigate();
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name //remove
    let email = location.state.email //remove

    const [klabs, setKlabs] = useState(['No klabs available.']);

    useEffect(() => {
        let mounted = true;
        setKlabs([])
        getMyKlabs()
        return () => mounted = false;
      }, [])

    const getMyKlabs = () => {
        fetch('http://127.0.0.1:8000/api/get-my-klabs?username='+username, {
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
        <div id="FindKlabs-content">
            <h1>My Klabs</h1>
            <div id="klabs-container">
                {klabs.map(function(klab){
                    if (klab == 'No klabs available.') {
                        return(
                            <h1>No klabs available.</h1>
                        )
                    }
                    return(
                        <MyKlabsCard klab={klab}/>
                    )
                })}
            </div>
        </div>
    )

}

export default MyKlabs