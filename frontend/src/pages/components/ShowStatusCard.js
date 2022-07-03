import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function ShowStatusCard({status}) {
    const [username, setUsername] = useState(status[0]);
    const [nickname, setNickname] = useState(status[1]);
    const [statusText, setStatusText] = useState(status[2]);

    return (
        <h1>{statusText}</h1>
      );
}
export default ShowStatusCard;