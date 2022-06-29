import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import '../styles/klabber.css';

function OtherUserCard({user, myUser}) {
  const [username, setUsername] = useState(user[0]);
  const [nickname, setNickname] = useState(user[1]);

  const [friendButton, setFriendButton] = useState("Add Friend");

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

const sendFriendReq = (myuser, username) => {
  var url = 'http://127.0.0.1:8000/api/friend/'
  var csrftoken = getCookie('csrftoken')
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({'sender':myuser, 'reciever': username})
  }).then((res) => {
      console.log(res)
      if (res.ok) {
          return res.json()
      }
      else {
      }
  })
}

  return (
    <Card sx={{
      width: 345,
      bgcolor: '#751919',
      ":hover":{
        transform: "scale3d(1.15, 1.15, 1)"
      },
      display: 'flex',
      }}>
      <CardHeader
        sx={{
          color:'azure',
        }}
        avatar={
          <Avatar sx={{ bgcolor: 'black' }} aria-label="user">
            K
          </Avatar>
        }
        title={nickname}
        subheader={"@"+username}
      />
      <Button sx={{
        display: 'inline',
        alignSelf: 'center',
        borderRadius: '20px',
        bgcolor: '#000000',
        color: 'azure',
      }} onClick={() => {sendFriendReq(myUser, username)}}>{friendButton}</Button>
    </Card>
  );
}
export default OtherUserCard;