import React, { useState } from 'react';

import { Container, Button, TextField, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { Container as BsContainer, Row as BsRow, Col as BsCol, Form as BsForm } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function NewCondition() {
  const [valueDate, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
  // const options = ['Active', 'Non-Active'];

  const [isDragging, setIsDragging] = useState(false);
  const [readyToDrop, setReadyToDrop] = useState(false);
  const [optionsEnd, setOptionsEnd] = useState([]);
  const isUnitItem = false;
  const containerHeight = 600;

  const optionsOrderAmount = [
    { value: 0, label: 'Discount' },
    { value: 1, label: 'After Discount' },
  ];

  // const optionsStart = [
  //   { value: 0, label: 'Total Amount' },
  //   { value: 1, label: 'Point' },
  //   { value: 2, label: 'Redeemable Redemption' },
  //   { value: 3, label: 'Redeemable Points' },
  //   { value: 4, label: 'Redeemable Amounts' },
  //   { value: 5, label: 'Status' },
  // ];

  const itemEnd = (value) => {
    let result = null;

    switch (value) {
      case 0:
        result = (
          <>
            <div>
              <BsForm.Label style={{ color: 'black', fontSize: 19 }}>Discount</BsForm.Label>
            </div>
            <div>
              <BsForm.Label style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Min Amount:</BsForm.Label>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp; <BsForm.Label style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Next Amount:</BsForm.Label>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp;
              <BsForm.Label style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Total Point:</BsForm.Label>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
            </div>
          </>
        );
        break;

      case 1:
        result = (
          <>
            <div>
              <BsForm.Label style={{ color: 'black', fontSize: 19 }}>After Discount</BsForm.Label>
            </div>
            <div>
              <BsForm.Label style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Min Amount:</BsForm.Label>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp; <BsForm.Label style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Next Amount:</BsForm.Label>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp;
              <BsForm.Label style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Total Point:</BsForm.Label>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
            </div>
          </>
        );
        break;

      default:
        break;
    }
    return result;
  };

  const renderListStart = () =>
    optionsOrderAmount.map((v) => (
      <div
        key={v.label}
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
    ));

  const renderListEnd = () =>
    optionsEnd.map((v, i) => (
      <div key={`${i}-${v.label}`} className="position-relative">
        <div style={{ cursor: 'pointer', userSelect: 'none', width: 'calc(100% - 32px)' }} className="p-1 mb-1">
          {itemEnd(v.value)}
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
          {/* <TextField
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
          /> */}
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
              <BsForm.Label style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Conditions</BsForm.Label>
              <div>
                <BsForm.Label style={{ color: 'black', fontSize: 19 }}>Order Amount Condition</BsForm.Label>
                {renderListStart()}
              </div>
              {/* <div>
                <BsForm.Label style={{ color: 'black', fontSize: 20 }}>Order Item Condition</BsForm.Label>
                {renderListStart()}
              </div> */}
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
    </Page>
  );
}
