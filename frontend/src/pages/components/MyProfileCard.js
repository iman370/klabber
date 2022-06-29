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

function myProfileCard({nickname, username}) {
    return (
        <Card id="profileCard">
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
        </Card>
      );
}
export default myProfileCard;