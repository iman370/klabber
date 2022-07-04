import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function CreateKlab() {
    let navigate = useNavigate();
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

    

    return (
        <div id="create-klab-content">
            <h1>username</h1>
            <div className='divider' />
            <h1>date</h1>
            <div className='divider' />
            <h1>time</h1>
            <div className='divider' />
            <h1>place</h1>
            <div className='divider' />
            <h1>description</h1>
            <div className='divider' />
            <h1>max spaces</h1>
            <div className='divider' />
            <Button onClick={() => navigate('../home',{state:{username,first_name,email}})}>Back</Button>
        </div>
    )
}

export default CreateKlab