import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function CreateKlab() {
    let navigate = useNavigate();
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

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

    const postKlab = (date, time, place, description, maxSpaces) => {
        var url = '/api/post-klab/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username':username,'date': date,'time':time,'place':place,'description':description,'maxSpaces':maxSpaces})
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
    }

    return (
        <div id="create-klab-container">
            <div id="create-klab-left">
                <div id="left-container">
                    <h1>What is this klab for?</h1>
                    <TextField
                        required
                        id="desc"
                        label="Description"
                        defaultValue=""
                        variant="standard"
                    />
                    <div className='divider' />
                    <h1>What date will this be?</h1>
                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        defaultValue="2022-07-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <div className='divider' />
                    <h1>Time?</h1>
                    <TextField
                        id="time"
                        label="Time"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                        sx={{ width: 150 }}
                    />
                    <div className='divider' />
                    <h1>Where will it be held?</h1>
                    <TextField
                        required
                        id="place"
                        label="Place"
                        defaultValue=""
                        variant="standard"
                    />
                    <div className='divider' />
                    <h1>How many people can join?</h1>
                    <p>(Excluding you)</p>
                    <TextField
                        required
                        id="maxspaces"
                        label="Maximum Spaces"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <div className='divider' />
                    <h1>Do you want to invite anyone specific?</h1>
                    <div className='divider' />
                </div>
            </div>
            <div id="create-klab-right">
                <div id="right-container">
                    <h1>test</h1>
                    <Button onClick={() => postKlab(document.getElementById('date').value, document.getElementById('time').value, document.getElementById('place').value, document.getElementById('desc').value, document.getElementById('maxspaces').value)}>Post</Button>
                    <div className='divider' />
                    <Button onClick={() => navigate('../home',{state:{username,first_name,email}})}>Back</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateKlab