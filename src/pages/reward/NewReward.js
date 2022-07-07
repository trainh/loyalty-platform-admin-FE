import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Button, TextField, Typography, Stack, Autocomplete, IconButton } from '@mui/material';
import { Container as BsContainer, Row as BsRow, Col as BsCol, Form as BsForm } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ClearIcon from '@mui/icons-material/Clear';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';

export default function NewReward() {
  const Input = styled('input')({
    display: 'none',
  });

  const options = ['Active', 'Non-Active'];

  const [isDragging, setIsDragging] = useState(false);
  const [readyToDrop, setReadyToDrop] = useState(false);
  const [optionsEnd, setOptionsEnd] = useState([]);
  const isUnitItem = false;
  const containerHeight = 400;

  const optionsStart = [
    { value: 0, label: 'Stock' },
    { value: 1, label: 'Redeemed' },
  ];

  const itemEnd = (value) => {
    let result = null;

    switch (value) {
      case 0:
        result = 'selection...';
        break;

      case 1:
        result = (
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField
                sx={{
                  width: { sm: 150 },
                  height: { sm: 50 },
                }}
                {...params}
                label="Status"
                variant="outlined"
                required
              />
            )}
          />
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
        style={{ cursor: 'pointer', userSelect: 'none', borderRadius: 10, width: 150 }}
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
    <Page title="New Reward">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Reward
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
            inputProps={{
              style: {
                height: 100,
              },
            }}
            sx={{
              width: { sm: 650 },
            }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            required
            multiline
          />
        </div>
        <div>
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField
                sx={{
                  mb: 2,
                  mr: 10,
                  width: { sm: 180 },
                }}
                {...params}
                label="Status"
                variant="outlined"
                required
              />
            )}
          />
          <BsForm.Label>
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </BsForm.Label>
        </div>
      </Container>
      <BsContainer fluid style={{ height: 400 }}>
        <BsRow>
          <BsCol sm={4} style={{ height: containerHeight, overflow: 'auto' }}>
            <div className="p-4 border">
              <BsForm.Label htmlFor="inputPassword5" style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>
                Information
              </BsForm.Label>
              {renderListStart()}
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
