import React from 'react';
import { Box, Button } from '@mui/material';
import { Check } from '@mui/icons-material';
import './index.css';

function WorkflowApprovals() {
  return (
    <>
      <h2>Approvals</h2>
      <Box sx={{ my: 2 }}>A NAVMC 11537 form is awaiting your approval.</Box>
      <Button
        id="approveBtn"
        aria-label="delete"
        variant="contained"
        startIcon={<Check />}
        className="approve-btn-width"
      >
        Approve
      </Button>
    </>
  );
}

export default WorkflowApprovals;
