import React from 'react';
import { Typography, Box } from '@mui/material';

const PageTitle = ({ title, actions }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'space-between',
      alignItems: { xs: 'flex-start', sm: 'center' },
      gap: 2,
      mb: 3
    }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'medium' }}>
        {title}
      </Typography>
      {actions && <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>{actions}</Box>}
    </Box>
  );
};

export default PageTitle; 