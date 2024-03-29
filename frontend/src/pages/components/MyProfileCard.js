import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

function myProfileCard({nickname, username, email}) {
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