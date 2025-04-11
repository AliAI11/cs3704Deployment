/**
 
Component that is used to capture the link that the user submits*/
import './LinkUpload.css';
import * as React from 'react';
import { Box } from '@mui/system';
import { Button, TextField, Tooltip } from '@mui/material';

const LinkUpload = (props) => {
    const[input, setInput] = React.useState("");

    const handleSubmit = () => {
        props.handleLinkUpload();
        setInput("");
    }

    //Ensures link is valid to use
    function isValidLink(string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    return (
        <Box 
            sx={{
                minWidth: '75%'
            }}
        >
            <TextField 
                id="link-upload"
                label="Paste Link Here"
                variant="outlined"
                value={input}
                fullWidth
                multiline
                autoComplete="off"
                onChange={
                    (e) => {
                        setInput(e.target.value);
                        props.handleLinkSetting(e.target.value);
                    }
                }
            />
            <Button
                variant="contained"
                sx={{ display: 'block' }}
                onClick={handleSubmit}
                disabled={!isValidLink(input)} //Won't work if there is no link or invalid link
            >
                Submit
            </Button>
        </Box>
    );
}

export default LinkUpload;