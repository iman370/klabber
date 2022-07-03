import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import '../styles/klabber.css';

function StatusBox({username}) {



    return ( //Button is outside statusBox. Have fun with this when you start frontend design :)
        <>
        <TextField
            id="statusBox"
            label="Your status"
            multiline
            rows={4}
            placeholder="Say something!"
            focused />
        <Button onClick={() => console.log("posted")}>Post</Button>
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