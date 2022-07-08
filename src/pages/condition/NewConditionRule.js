import React, { useState } from 'react';

import {
  Container,
  Button,
  TextField,
  Typography,
  Stack,
  Autocomplete,
  Dialog,
  Toolbar,
  AppBar,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { Container as BsContainer, Row as BsRow, Col as BsCol } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';

import Iconify from '../../components/Iconify';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function NewCondition() {
  const [valueDate, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
  // const options = ['Active', 'Non-Active'];
  const compare = ['>', '>=', '=', '<', '<='];

  const [isDragging, setIsDragging] = useState(false);
  const [readyToDrop, setReadyToDrop] = useState(false);
  const [optionsEnd, setOptionsEnd] = useState([]);
  const [open, setOpen] = useState(false);
  const isUnitItem = false;
  const containerHeight = 600;

  const [optionsGroup, setOptionsGroup] = useState([
    { value: 0, label: 'Order Amount Condition', isExpand: false },
    { value: 1, label: 'Order Item Condition', isExpand: false },
  ]);

  const optionsStart = [
    { value: 0, label: 'Discount', group: 0 },
    { value: 1, label: 'After Discount', group: 0 },
    { value: 2, label: 'Quantity', group: 1 },
    { value: 3, label: 'Tier Sequence Number', group: 1 },
    { value: 4, label: 'Quantity Gain Point', group: 1 },
    { value: 5, label: 'Next Quantity', group: 1 },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const orderAmountEnd = (value) => {
    let result = null;

    switch (value) {
      case 0:
        result = (
          <>
            <div>
              <span style={{ color: 'black', fontSize: 19 }}>Discount</span>
            </div>
            <div>
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Min Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp; <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Next Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp;
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Total Point:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
            </div>
          </>
        );
        break;

      case 1:
        result = (
          <>
            <div>
              <span style={{ color: 'black', fontSize: 19 }}>After Discount</span>
            </div>
            <div>
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Min Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp; <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Next Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp;
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Total Point:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
            </div>
          </>
        );
        break;

      case 2:
        result = (
          <>
            <div>
              <span style={{ color: 'black', fontSize: 19 }}>each product in </span>
              <Button onClick={handleClickOpen}>selection list</Button>
              <span style={{ color: 'black', fontSize: 19 }}> has quantity </span>
            </div>
            <div>
              <Autocomplete
                // value={valueable}
                // onChange={(event, valueable) => {
                //   setValue(valueable);
                // }}
                options={compare}
                renderInput={(params) => <TextField style={{ width: 95 }} {...params} variant="outlined" required />}
              />
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
            </div>
            {/* <div>
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Min Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp; <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Next Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp;
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Total Point:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
            </div> */}
          </>
        );
        break;

      case 3:
        result = (
          <>
            <div>
              <span style={{ color: 'black', fontSize: 19 }}>Tier Sequence Number</span>
            </div>
            {/* <div>
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Min Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp; <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Next Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp;
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Total Point:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
            </div> */}
          </>
        );
        break;

      case 4:
        result = (
          <>
            <div>
              <span style={{ color: 'black', fontSize: 19 }}>Quantity Gain Point</span>
            </div>
            {/* <div>
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Min Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp; <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Next Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp;
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Total Point:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
            </div> */}
          </>
        );
        break;

      case 5:
        result = (
          <>
            <div>
              <span style={{ color: 'black', fontSize: 19 }}>Next Quantity</span>
            </div>
            {/* <div>
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Min Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp; <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Next Amount:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp;
              <span style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Total Point:</span>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
            </div> */}
          </>
        );
        break;

      default:
        break;
    }
    return result;
  };

  const renderListStart = () => {
    let renderingGroup = null;

    return optionsStart.map((v) => {
      const groupObj = optionsGroup.find((og) => og.value === v.group);
      const groupValue = groupObj && groupObj.value;

      const group = (
        <div>
          <Button
            style={{ cursor: 'pointer', fontSize: 17 }}
            onClick={() => {
              if (groupObj) {
                const newOptionsGroup = optionsGroup.map((og) =>
                  og.value === groupValue ? { ...og, isExpand: !og.isExpand } : og
                );

                setOptionsGroup(newOptionsGroup);
              }
            }}
          >
            {groupObj && groupObj.label}
          </Button>
        </div>
      );

      const item = (
        <div
          style={{ cursor: 'pointer', userSelect: 'none', borderRadius: 10, width: 250 }}
          className="border p-2 mb-2"
          draggable
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            if (readyToDrop) {
              if (!isUnitItem || (isUnitItem && !optionsEnd.find((oe) => oe.value === v.value))) {
                setOptionsEnd([...optionsEnd, v]);
              }
            }

            setReadyToDrop(false);
            setIsDragging(false);
          }}
        >
          {v.label}
        </div>
      );

      const result = (
        <div key={v.label}>
          {renderingGroup !== groupValue && group}
          {groupObj.isExpand && item}
        </div>
      );

      renderingGroup = groupObj && groupObj.value;

      return result;
    });
  };

  const renderListEnd = () =>
    optionsEnd.map((v, i) => (
      <div key={`${i}-${v.label}`} className="position-relative">
        <div style={{ cursor: 'pointer', userSelect: 'none', width: 'calc(100% - 32px)' }} className="p-1 mb-1">
          {orderAmountEnd(v.value)}
          {i < optionsEnd.length - 1 ? <div>Or</div> : null}
        </div>
        <ClearIcon
          className="position-absolute"
          style={{ top: 5, right: 0, cursor: 'pointer' }}
          onClick={() => {
            const result = optionsEnd.filter((_, opIndex) => opIndex !== i);
            setOptionsEnd(result);
          }}
        />
      </div>
    ));

  return (
    <Page title="Condition Rule">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Condition Rule
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/condition/new-condition-group"
            startIcon={<Iconify icon="mdi:arrow-right-thin" />}
          >
            Next
          </Button>
        </Stack>
        <div>
          <TextField
            sx={{
              mb: 2,
              mr: 2,
              width: { sm: 300 },
            }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            required
          />
          <TextField
            sx={{
              mb: 2,
              mr: 2,
              width: { sm: 750 },
            }}
            inputProps={{
              style: {
                height: 100,
              },
            }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            required
            multiline
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDateTimePicker
                label="Start Date"
                value={valueDate}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      width: { sm: 250 },
                    }}
                    {...params}
                    required
                  />
                )}
              />
              <DesktopDateTimePicker
                label="End Date"
                value={valueDate}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    inputProps={{
                      style: {
                        height: 100,
                      },
                    }}
                    sx={{
                      mb: 2,
                      mr: 2,
                      width: { sm: 250 },
                    }}
                    {...params}
                    required
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </div>
      </Container>
      <BsContainer fluid style={{ height: 400, marginTop: 15 }}>
        <BsRow>
          <BsCol sm={4} style={{ height: containerHeight, overflow: 'auto' }}>
            <div className="p-4 border">
              <span style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Conditions</span>
              <div>{renderListStart()}</div>
            </div>
          </BsCol>
          <BsCol
            className={`position-relative border${readyToDrop ? ' bg-white' : ''}`}
            style={{ height: containerHeight, overflow: 'auto' }}
          >
            <div
              className="position-absolute"
              style={{ inset: 0, zIndex: isDragging ? 1 : 0 }}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setReadyToDrop(true)}
              onDragLeave={() => setReadyToDrop(false)}
            />
            {<div className="p-4">{renderListEnd()}</div>}
          </BsCol>
        </BsRow>
      </BsContainer>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <ClearIcon />
            </IconButton>
            <Button autoFocus color="inherit">
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog>
    </Page>
  );
}
