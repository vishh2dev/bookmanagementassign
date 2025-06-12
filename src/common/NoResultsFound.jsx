import React from 'react';
import { Box, Typography } from '@mui/material';

const NoResultsFound = ({ message = "No items found matching your criteria" }) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 200,
      bgcolor: 'grey.50',
      borderRadius: 2,
      p: 4,
    }}>
      <Typography color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default NoResultsFound; 