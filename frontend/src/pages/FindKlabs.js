import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function FindKlab() {
    let navigate = useNavigate();
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

    return (
        <h1>AAAA</h1>
    )

}

export default FindKlab