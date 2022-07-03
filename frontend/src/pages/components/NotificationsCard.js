import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import OtherUserCard from './OtherUserCard';

function NotificationsCard ({username}) {
    const [notifications, setNotifications] = useState(['No notifications.']);

    useEffect(() => {
        let mounted = true;
        setNotifications([])
        getNotifications()
        return () => mounted = false;
      }, [])

    const getNotifications = () => {
        fetch('http://127.0.0.1:8000/api/get-incoming-requests?username='+username, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify()
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then((data) => {
            if (data.length === 0) {
                setNotifications(['No notifications.'])
            } else {
                setNotifications(data)
            }
        }, [notifications])
    }

    return (
        <Box id="notificationsBox">
            <h1>Notifications</h1>
            <Stack spacing={2} id="notificationsList">
                {notifications.map(function(notification){
                    if (notification == 'No notifications.') {
                        return(
                            <h3>No notifications.</h3>
                        )
                    }
                    return(
                        <OtherUserCard user={notification} myUser={username} />
                    )
                })}
            </Stack>
        </Box>
      );
}
export default NotificationsCard;