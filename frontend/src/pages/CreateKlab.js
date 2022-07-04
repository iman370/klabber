import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function CreateKlab() {
    let navigate = useNavigate();
    const location = useLocation();
    let username = location.state.username
    let first_name = location.state.first_name
    let email = location.state.email

    

    return (
        <div id="create-klab-container">
            <div id="create-klab-left">
                <h1>What is this klab for?</h1>
                <div className='divider' />
                <h1>What date will this be?</h1>
                <div className='divider' />
                <h1>Time?</h1>
                <div className='divider' />
                <h1>Where will it be held?</h1>
                <div className='divider' />
                <h1>How many people can join?</h1>
                <p>(Excluding you)</p>
                <TextField
                    id="filled-number"
                    label="Maximum Spaces"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />
                <div className='divider' />
                <h1>Do you want to invite anyone specific?</h1>
                <div className='divider' />
            </div>
            <div id="create-klab-right">
                <h1>test</h1>
                <Button onClick={() => navigate('../home',{state:{username,first_name,email}})}>Back</Button>
            </div>
        </div>
    )
}

export default CreateKlab