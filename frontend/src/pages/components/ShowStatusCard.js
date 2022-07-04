import React, {useState} from 'react';

function ShowStatusCard({status}) {
    const [username, setUsername] = useState(status[0]);
    const [nickname, setNickname] = useState(status[1]);
    const [statusText, setStatusText] = useState(status[2]);

    return (
        <h1>{statusText}</h1>
      );
}
export default ShowStatusCard;