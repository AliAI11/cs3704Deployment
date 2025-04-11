/**
 
Button that handles going back to the upload screen*/
import './BackButton.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import BackArrow from '@mui/icons-material/ArrowLeftTwoTone';

const BackButton = (props) => {
    return (
        <Button 
            variant="outlined" 
            color="primary"
            startIcon={<BackArrow/>} 
            onClick={props.onClick}
        >
            Back
        </Button>
    );
}

export default BackButton;