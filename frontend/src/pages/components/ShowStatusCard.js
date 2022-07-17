import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

function ShowStatusCard({status}) {
    const username = useState(status[0]);
    const nickname = useState(status[1]);
    const statusText = useState(status[2]);

    return (
      <Card sx={{ width: '16rem', bgcolor: '#a9bcd0',}}>
      <CardContent>
        <Typography variant="h6" component="div">
          {nickname}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          @{username}
        </Typography>
        <Typography variant="body2">
          {statusText}
        </Typography>
      </CardContent>
    </Card>
      );
}
export default ShowStatusCard;