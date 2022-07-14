import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

function JoinKlab({klab, myUser}) {
  const [klabId, setklabId] = useState(klab[0]);
  const [host, setHost] = useState(klab[1]);
  const [klabDate, setDate] = useState(klab[2]);
  const [klabTime, setTime] = useState(klab[3]);
  const [place, setPlace] = useState(klab[4]);
  const [description, setDescription] = useState(klab[5]);
  const [maxSpaces, setMaxSpaces] = useState(klab[6]);
  const [takenSpaces, setTakenSpaces] = useState(klab[7]);
  const [joinStatus, setJoinStatus] = useState(klab[8]);

  const [joinButton, setJoinButton] = useState("Request to Join");

  useEffect(() => {
    let mounted = true;
    if (joinStatus == 0) {
      setJoinButton("Request to Join")
    } else if (joinStatus == 1) {
      setJoinButton("Joined")
    } else if (joinStatus == 2) {
      setJoinButton("Requested")
    } else if (joinStatus == 3) {
      setJoinButton("Accept Invite")
    }
    return () => mounted = false;
  }, [joinStatus])

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
            height: 250,
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
              subheader={"Date: "+klabDate+"   Time: "+klabTime}
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