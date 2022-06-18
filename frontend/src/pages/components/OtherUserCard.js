import React from 'react';
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

  return (
    <Card sx={{
      width: 345,
      bgcolor: '#751919'
      }}>
      <CardHeader
        title={user}
        subheader={user}
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