import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


function OtherUserCard({user}) {
  const [username, setUsername] = useState(user[0]);
  const [nickname, setNickname] = useState(user[1]);

  return (
    <Card sx={{
      width: 345,
      bgcolor: '#751919'
      }}>
      <CardHeader
        title={nickname}
        subheader={username}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Testinggg
        </Typography>
      </CardContent>
    </Card>
  );
}
export default OtherUserCard;