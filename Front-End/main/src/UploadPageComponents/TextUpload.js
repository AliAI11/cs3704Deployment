import './TextUpload.css'
import * as React from 'react';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';

const TextUpload = (props) => {
    const [input, setInput] = React.useState("");

    return (
        <Box 
            sx={{
                minWidth: '75%'
            }}
        >
            <TextField
                id="text-upload"
                label="Type Article Text Here"
                value={input}
                multiline
                fullWidth
                autoComplete="off"
                slotProps={{ style: { resize: "both" } }}
                onChange={
                    (e) => {
                        setInput(e.target.value);
                        props.handleTextSetting(e.target.value);
                    }
                }
            />
            <Button
                variant="contained"
                sx={{ display: 'block' }}
                onClick={props.handleSubmitText}
            >
                Submit
            </Button>
        </Box>
    );
}

export default TextUpload;