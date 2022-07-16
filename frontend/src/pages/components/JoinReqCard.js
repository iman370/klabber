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

export default JoinReqCard