import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

function JoinReqCard({klab, myUser}) {
  const [user, setUser] = useState(klab[0]);
  const [klabId, setKlabId] = useState(klab[1]);
  const [klabDate, setDate] = useState(klab[2]);
  const [klabTime, setTime] = useState(klab[3]);
  const [place, setPlace] = useState(klab[4]);
  const [description, setDescription] = useState(klab[5]);
  const [maxSpaces, setMaxSpaces] = useState(klab[6]);
  const [takenSpaces, setTakenSpaces] = useState(klab[7]);

  const [multipleButtons, setMultipleButtons] = useState(true);

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

  const acceptJoinReq = () => {
    var url = 'http://127.0.0.1:8000/api/accept-join-req/'
    var csrftoken = getCookie('csrftoken')
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({'klabId':klabId, 'hostId': myUser, 'username':user})
    }).then((res) => {
        console.log(res)
        if (res.ok) {
            return res.json()
        }
    }).then((data) => {
      setMultipleButtons(false)
  }, [multipleButtons])
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
              title={"Join Request from: "+user}
              subheader={"Date: "+klabDate+"\nTime: "+klabTime}
            />
            <Button sx={{
              display: 'inline',
              alignSelf: 'center',
              borderRadius: '20px',
              bgcolor: '#1B1B1E',
              color: '#D8DBE2',
            }} onClick={() => {acceptJoinReq()}}>Accept</Button>
          </Card>
    )
    
}

export default JoinReqCard