import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

function HomePageFriends({username}) {
    return (
        <Card id="friendsCard">
          <CardHeader
            title="Friends"
          />
          <CardContent sx={{display:'flex',}}>
            <Avatar sx={{ bgcolor: 'black' }} aria-label="user">
                K
            </Avatar>
            <div className='friends-card-divider' />
            <Avatar sx={{ bgcolor: 'black' }} aria-label="user">
                K
            </Avatar>
            <div className='friends-card-divider' />
            <Avatar sx={{ bgcolor: 'black' }} aria-label="user">
                K
            </Avatar>
            <div className='friends-card-divider' />
            <Avatar sx={{ bgcolor: 'black' }} aria-label="user">
                K
            </Avatar>
          </CardContent>
        </Card>
      );
}
export default HomePageFriends;