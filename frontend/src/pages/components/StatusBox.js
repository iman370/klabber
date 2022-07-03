import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import '../styles/klabber.css';

function StatusBox({username}) {

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
        var url = 'http://127.0.0.1:8000/api/post-status/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'username':username, 'text': text})
        }).then((res) => {
            console.log(res)
            if (res.ok) {
                return res.json()
            }
        })
      }

    return ( //Button is outside statusBox. Have fun with this when you start frontend design :)
        <>
        <TextField
            id="statusBox"
            label="Your status"
            multiline
            rows={4}
            placeholder="Say something!"
            focused />
        <Button onClick={() => postStatus(document.getElementById('statusBox').value)}>Post</Button>
        <div className='divider' />
        <Box id="otherStatusBox">
            <Stack spacing={2}>
                <h1>Status</h1>
                <h1>Status 1</h1>
                <h1>Status 2</h1>
            </Stack>
        </Box>
        </>
      );
}
export default StatusBox;