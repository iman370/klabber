import React, {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ShowStatusCard from './ShowStatusCard';

function StatusBox({username}) {
    const [alert, setAlert] = useState(false);
    const [statuses, setStatuses] = useState(['Nothing to show.']);

    const [defaultValue, setDefaultValue] = useState('');
    const handleChange = (event) => {
        setDefaultValue(event.target.value);
      };

    useEffect(() => {
        let mounted = true;
        setStatuses([])
        getStatuses()
        return () => mounted = false;
    }, [])

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

    const postStatus = (text) => {
        var url = '/api/post-status/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username':username, 'text': text})
        }).then((res) => {
            if (res.ok) {
                setDefaultValue('')
                setStatuses([])
                getStatuses()
                return res.json()
            }
        })
    }

    const getStatuses = () => {
        fetch('/api/get-statuses/', {
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
                setStatuses(['Nothing to show.'])
            } else {
                setStatuses(data)
            }
        }, [statuses])
    }

    return ( //Button is outside statusBox. Have fun with this when you start frontend design :)
        <>
        <div id="statusTab">
            <TextField
                id="statusBox"
                label="Your status"
                multiline
                rows={4}
                placeholder="Say something!"
                value={defaultValue}
                onChange={handleChange}
                focused />
            <Button onClick={() => postStatus(document.getElementById('statusBox').value)}>Post</Button>
            <div className='divider' />
            <Box id="otherStatusBox">
                <h1>Status</h1>
                <div id="statusList">
                    {statuses.map(function(userStatus){
                        if (userStatus == 'Nothing to show.') {
                            return(
                                <h3>Nothing to show.</h3>
                            )
                        }
                        return(
                            <><ShowStatusCard status={userStatus} />
                            <div className='divider' /></>
                        )
                        })}
                </div>
            </Box>
        </div>
        </>
      );
}
export default StatusBox;