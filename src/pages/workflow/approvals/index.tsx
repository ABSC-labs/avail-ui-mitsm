import React, { useState } from 'react';
import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import './index.css';
import axios from 'axios';
import { Marine } from 'types/models/mitsm/Marine';

function WorkflowApprovals() {
  const [marines, setMarines] = useState([]);

  axios.get('http://localhost:8081/marines').then((response) => {
    console.log(response);
    setMarines(response.data);
  });
  return (
    <>
      <h2>Approvals</h2>
      <Box sx={{ my: 2 }}>
        <TableContainer sx={{ maxWidth: 400 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marines.map((m: Marine) => {
                return (
                  <TableRow key={m.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell scope="row">
                      `{m.first} {m.last}`
                    </TableCell>
                    <TableCell align="right">
                      <Link href="approvals/navmc-11537">
                        <Button
                          id="approveBtn"
                          aria-label="delete"
                          variant="contained"
                          startIcon={<Check />}
                          className="approve-btn-width"
                        >
                          Approve
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default WorkflowApprovals;
