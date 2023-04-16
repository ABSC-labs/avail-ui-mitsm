import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Block, Check } from '@mui/icons-material';
import './index.css';

function WorkflowApprovalsNAVMC11537() {
  return (
    <>
      <h2>NAVMC 11537</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ my: 2 }}>A NAVMC 11537 form is awaiting your approval.</Box>
        </Grid>
        <Grid item xs={2}>
          <Button id="approveBtn" aria-label="approve" variant="contained" startIcon={<Check />}>
            Approve
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button id="DisapproveBtn" aria-label="disapprove" variant="outlined" color="error" startIcon={<Block />}>
            Dispprove
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default WorkflowApprovalsNAVMC11537;
