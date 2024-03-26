import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Footer() {
  return (
    
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'lightsalmon',
        minHeight: 60,
        marginTop: 'auto', 
      }}
    >
      <Typography variant="body1" color="text.primary">
        © 2024 BizzyBee. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
