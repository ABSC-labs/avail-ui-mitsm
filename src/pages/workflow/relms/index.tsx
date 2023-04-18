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
  onCancel: () => void;
  onOk: () => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onCancel, onOk, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp, open]);

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onOk();
  };

  return (
    <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" open={open} {...other}>
      <DialogTitle className="confirm-dialog">Initiate RELM Workflow?</DialogTitle>
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

export interface SuccessDialogRawProps {
  id: string;
  keepMounted: boolean;
  value?: string;
  open: boolean;
  onOk: () => void;
}

function SuccessDialogRaw(props: SuccessDialogRawProps) {
  const { onOk, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp, open]);

  const handleOk = () => {
    onOk();
  };

  return (
    <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" open={open} {...other}>
      <DialogTitle className="success-dialog">Success!</DialogTitle>
      <DialogContent dividers>
        You successfully submitted a RELM for <strong>{value}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

function WorkflowRELMs() {
  const [marines, setMarines] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
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

  const data = JSON.stringify({
    EDIPI: '0987654321',
    Status: 'Submitted',
  });

  const startWorkflow = () => {
    axios.post(startWorkflowURL, data, config).then((response) => {
      if (response.data.submission_id) {
        setOpen(false);
        setOpenSuccess(true);
      }
    });
  };

  const handleClickListItem = (id: number, name: string) => {
    setMarineName(name);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    startWorkflow();
  };

  const handleOkSuccess = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setOpenSuccess(false);
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
                    <StyledTableCell scope="row">{`${m.rank}, ${m.last}, ${m.first}`}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        id="approveBtn"
                        aria-label="delete"
                        variant="contained"
                        color="success"
                        startIcon={<Check />}
                        className="approve-btn-width"
                        onClick={() => {
                          handleClickListItem(m.id, `${m.rank}, ${m.last}, ${m.first}`);
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
        onCancel={handleCancel}
        onOk={handleOk}
        value={marineName}
      />
      <SuccessDialogRaw
        id="success-workflow-start"
        keepMounted
        open={openSuccess}
        onOk={handleOkSuccess}
        value={marineName}
      />
    </>
  );
}

export default WorkflowRELMs;
