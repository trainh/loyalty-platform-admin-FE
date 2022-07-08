import React, { useState } from 'react';

import { Container, Button, TextField, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Container as BsContainer, Row as BsRow, Col as BsCol, Form as BsForm } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function NewVoucher() {
  const [valueDate, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));

  const [isDragging, setIsDragging] = useState(false);
  const [readyToDrop, setReadyToDrop] = useState(false);
  const [optionsEnd, setOptionsEnd] = useState([]);
  const isUnitItem = false;
  const containerHeight = 600;

  const optionsStart = [
    { value: 0, label: 'Item Voucher 1' },
    { value: 1, label: 'Item Voucher 2' },
  ];

  const itemEnd = (value) => {
    let result = null;

    switch (value) {
      case 0:
        result = (
          <>
            <div>
              <BsForm.Label style={{ color: 'black', fontSize: 19 }}>Label top</BsForm.Label>
            </div>
            <div>
              <BsForm.Label style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>
                Label next to textfield
              </BsForm.Label>
              <TextField style={{ width: 100 }} id="outlined-number" label="Point" type="number" required />
              &nbsp; <BsForm.Label style={{ color: '#1266F1', fontSize: 15, padding: 15 }}>Next Amount:</BsForm.Label>
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
    optionsStart.map((v) => (
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
            New Voucher
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="mdi:content-save" />}>
            Save
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
      </Container>
      <BsContainer fluid style={{ height: 400, marginTop: 15 }}>
        <BsRow>
          <BsCol sm={4} style={{ height: containerHeight, overflow: 'auto' }}>
            <div className="p-4 border">
              <BsForm.Label style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Label Sub-menu</BsForm.Label>
              <div>
                <BsForm.Label style={{ color: 'black', fontSize: 19 }}>Label Sub-menu</BsForm.Label>
                {renderListStart()}
              </div>
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
