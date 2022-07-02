import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import '../styles/klabber.css';

function myProfileCard({nickname, username, email}) {
    return (
        <Card id="profileCard">
          <div id="cardContent">          
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
          </div>
        </Card>
      );
}
export default myProfileCard;