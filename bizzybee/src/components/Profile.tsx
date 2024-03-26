import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function UserProfile() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography gutterBottom>
              Name: John Doe
            </Typography>
            <Typography gutterBottom>
              Email: john@example.com
            </Typography>
            <Typography gutterBottom>
              Address: 123 Main St, City, Country
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <Typography gutterBottom>
              Change Password
            </Typography>
            <Typography gutterBottom>
              Email Notifications
            </Typography>
            <Typography gutterBottom>
              Privacy Settings
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;
