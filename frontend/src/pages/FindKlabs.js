import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JoinKlab from './components/JoinKlab';

function FindKlab() {
    const location = useLocation();
    let username = location.state.username

    const [klabs, setKlabs] = useState(['No klabs available.']);

    useEffect(() => {
        let mounted = true;
        setKlabs([])
        getAllKlabs()
        return () => mounted = false;
      }, [])

    const getAllKlabs = () => {
        fetch('/api/get-all-klabs?username='+username, {
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
            <h1>Find Klabs</h1>
            <div id="klabs-container">
                {klabs.map(function(klab){
                    if (klab == 'No klabs available.') {
                        return(
                            <h1>No klabs available.</h1>
                        )
                    }
                    return(
                        <JoinKlab klab={klab} myUser={username} />
                    )
                })}
            </div>
        </div>
    )

}

export default FindKlab