import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

function JoinKlab({klab, myUser}) {
    const [host, setHost] = useState(klab[0]);
    const [date, setDate] = useState(klab[1]);
    const [time, setTime] = useState(klab[2]);
    const [place, setPlace] = useState(klab[3]);
    const [description, setDescription] = useState(klab[4]);
    const [maxSpaces, setMaxSpaces] = useState(klab[5]);

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

    return (
        <>
        <h1>klab</h1>
        <h1>{host}</h1>
        <h1>{date}</h1>
        <h1>{time}</h1>
        <h1>{place}</h1>
        <h1>{description}</h1>
        <h1>{maxSpaces}</h1>
        </>
    )
    
}

export default JoinKlab