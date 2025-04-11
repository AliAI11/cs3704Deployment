/**
 
Component that displays the article text and prediction result*/

import React from 'react';
import Box from '@mui/system/Box';
import { Typography } from '@mui/material';

const About = (props) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      minWidth: '100%', 
      }}> 
      <Box sx={{ 
        padding: '20px', 
        minWidth: '70%', 
        border: 1, 
        borderRadius: 4
        }}>
        <Typography
          variant='h5'
          align='center'
          sx={{
            paddingBottom: '25px'
          }}
        >
          Article Text
        </Typography>
        <Typography
          variant='body1'
        >
          {props.articleText}
        </Typography>
      </Box>
      <Box sx={{ 
        padding: '20px', 
        minWidth: '20%', 
        border: 1, 
        borderRadius: 4
        }}>
        <Typography variant='h5'>Result:</Typography>
        {props.prediction === "Real" && <img src='./assets/real.svg' style={{width: "100%"}}/>}
        {props.prediction === "Fake" && <img src='./assets/fake.svg' style={{width: "100%"}}/>}
      </Box>
    </Box>
  );
}

export default About;