import './FileUpload.css';
import * as React from 'react';
import { Button, styled, Tooltip } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = (props) => {

    //Allows for file uploads
    const HiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Tooltip title="Supported formats: PDF, DOCX">
            <Button
                component="label"
                variant="contained"
                startIcon={<UploadIcon/>}
                sx={{ display: "flex" }}
            >
                Upload Article
                <HiddenInput
                    type="file"
                    accept=".pdf, .docx"
                    onChange={(e) => props.fileUploadHandler(e.target.value)}
                />
            </Button>
        </Tooltip>
    );
}

export default FileUpload;