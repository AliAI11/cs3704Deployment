import './Title.css'
import * as React from 'react';
import { TextField } from '@mui/material';

const Title = (props) => {

    return (
        <TextField
            id="title"
            value={props.articleName}
            label={props.link.length !== 0 ? "Article Link" : "File Name"}
            fullWidth
            slotProps={{
                input: {
                    readOnly: true,
                },
            }}
        />
    );
}

export default Title;