import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

function JoinKlab({klab, myUser}) {
    const [host, setHost] = useState(klab[0]);
    const [klabDate, setDate] = useState(klab[1]);
    const [klabTime, setTime] = useState(klab[2]);
    const [place, setPlace] = useState(klab[3]);
    const [description, setDescription] = useState(klab[4]);
    const [maxSpaces, setMaxSpaces] = useState(klab[5]);

    const [joinButton, setJoinButton] = useState("Join");

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

    return (
        <Card sx={{
            width: 345,
            bgcolor: '#58A4B0',
            ":hover":{
              transform: "scale3d(1.15, 1.15, 1)"
            },
            display: 'flex',
            }}>
            <CardHeader
              sx={{
                color:'azure',
              }}
              title={description}
              subheader={"Date: "+{klabDate}+"   Time: "+{klabTime}}
            />
            <Button sx={{
              display: 'inline',
              alignSelf: 'center',
              borderRadius: '20px',
              bgcolor: '#1B1B1E',
              color: '#D8DBE2',
            }}>{joinButton}</Button>
          </Card>
    )
    
}

export default JoinKlab