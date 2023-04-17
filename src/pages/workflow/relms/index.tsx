import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  tableCellClasses,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import './index.css';
import axios from 'axios';
import { Marine } from 'types/models/mitsm/Marine';

const startWorkflowURL = 'https://absc-dev.kinops.io/app/kapps/services/webApis/start-approval?timeout=10';

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value?: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  return (
    <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" open={open} {...other}>
      <DialogTitle>Initiate RELM Workflow?</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to start a RELM workflow for <strong>{value}</strong>?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

function WorkflowRELMs() {
  const [marines, setMarines] = useState([]);
  const [open, setOpen] = useState(false);
  const [marineId, setMarineId] = useState(0);
  const [marineName, setMarineName] = useState('');

  useEffect(() => {
    axios.get('https://api.absc-labs.com/marines/').then((response) => {
      setMarines(response.data.slice(0, 22));
    });
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic YmVuLnBhcnJpc2hAYWJzYy11cy5jb206VUVZKmp0ZSF4cXI4bXFyNHF2cA==',
    },
  };

  const startWorkflow = (id: number) => {
    axios.post(startWorkflowURL, config).then((response) => {
      console.log(id, response);
    });
  };

  const handleClickListItem = (id: number, name: string) => {
    setMarineId(id);
    setMarineName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    startWorkflow(marineId);
  };

  return (
    <>
      <h2>Initiate RELM</h2>
      <Box sx={{ my: 2 }}>
        <TableContainer sx={{ maxWidth: 400 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marines.map((m: Marine) => {
                return (
                  <StyledTableRow key={m.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell scope="row">{`${m.first} ${m.last}`}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        id="approveBtn"
                        aria-label="delete"
                        variant="contained"
                        color="success"
                        startIcon={<Check />}
                        className="approve-btn-width"
                        onClick={() => {
                          handleClickListItem(m.id, `${m.first} ${m.last}`);
                        }}
                      >
                        Start
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ConfirmationDialogRaw
        id="confirm-workflow-start"
        keepMounted
        open={open}
        onClose={handleClose}
        value={marineName}
      />
    </>
  );
}

export default WorkflowRELMs;
