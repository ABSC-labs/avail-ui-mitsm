import React from 'react';
import Box from '@mui/material/Box';
import AppLogo from '@crema/core/AppLayout/components/AppLogo';
import AuthWrapper from '../AuthWrapper';

function Signup() {
  return (
    <AuthWrapper>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AppLogo />
          </Box>
        </Box>
      </Box>
    </AuthWrapper>
  );
}

export default Signup;
