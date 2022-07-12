import React, { useState } from 'react';

import {
  Container,
  Button,
  TextField,
  Typography,
  Stack,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Container as BsContainer, Row as BsRow, Col as BsCol } from 'react-bootstrap';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import ClearIcon from '@mui/icons-material/Clear';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function NewRule() {
  const [valueDate, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));

  const [isDragging, setIsDragging] = useState(false);
  const [readyToDrop, setReadyToDrop] = useState(false);
  const [optionsEnd, setOptionsEnd] = useState([]);
  const isUnitItem = false;
  const containerHeight = 400;

  const options = ['Active', 'Non-Active'];

  const [optionsGroup, setOptionsGroup] = useState([
    { value: 0, label: 'Rule Sub-menu 1', isExpand: false },
    { value: 1, label: 'Rule Sub-menu 2', isExpand: false },
  ]);

  const optionsStart = [
    { value: 0, label: 'Min Points For Redemption', group: 0 },
    { value: 1, label: 'Min Redeemable Points', group: 0 },
    { value: 2, label: 'Min Redeemable Amount', group: 0 },
    { value: 3, label: 'Item Rule 1', group: 1 },
  ];

  const itemEnd = (value) => {
    let result = null;

    switch (value) {
      case 0:
        result = (
          <span className="d-flex align-items-center">
            <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }} className="mr-1">
              Min Points For Redemption:
            </span>
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Point:
            </span>
            <TextField style={{ width: 100 }} size="small" id="outlined-number" label="Point" type="number" required />
          </span>
        );
        break;

      case 1:
        result = (
          <span className="d-flex align-items-center">
            <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }} className="mr-1">
              Min Redeemable Points:
            </span>
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Point:
            </span>
            <TextField style={{ width: 100 }} size="small" id="outlined-number" label="Point" type="number" required />
          </span>
        );
        break;

      case 2:
        result = (
          <span className="d-flex align-items-center">
            <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }} className="mr-1">
              Min Redeemable Amount:
            </span>
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Point:
            </span>
            <TextField style={{ width: 100 }} size="small" id="outlined-number" label="Point" type="number" required />
          </span>
        );
        break;

      case 3:
        result = (
          <div div className="d-flex align-items-center">
            <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }}>Each Rule </span>
            {/* <Button onClick={() => handleClickOpen(index)}>selection list ({item.selectList.length})</Button>
            <span style={{ color: 'black', fontSize: 14 }}> has quantity </span> */}
            <Autocomplete
              // value={valueable}
              // onChange={(event, valueable) => {
              //   setValue(valueable);
              // }}
              size="small"
              className="mx-1"
              options={options}
              renderInput={(params) => <TextField style={{ width: 162 }} {...params} variant="outlined" required />}
            />
            <TextField
              style={{ width: 100 }}
              className="mx-1"
              size="small"
              id="outlined-number"
              label="Point"
              type="number"
              required
            />
          </div>
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
    <Page title="New Rule">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rule
          </Typography>
          <span>
            <Button
              style={{ marginRight: 5 }}
              variant="contained"
              component={RouterLink}
              to="/dashboard/rule"
              startIcon={<Iconify icon="mdi:arrow-left-thin" />}
            >
              Back
            </Button>
            <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="mdi:content-save" />}>
              Save
            </Button>
          </span>
        </Stack>
        <BsContainer fluid>
          <BsRow>
            <TextField
              style={{ width: 800, marginBottom: 15 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
            />
          </BsRow>
          <BsRow>
            <TextField
              style={{ width: 800, marginBottom: 25 }}
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
          </BsRow>
          <BsRow style={{ marginBottom: 25 }}>
            <BsCol sm={2.5}>
              <TextField
                style={{ width: 394 }}
                id="outlined-number"
                label="Max Points"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </BsCol>
            <BsCol>
              <TextField
                style={{ width: 394 }}
                label="Spending Value"
                type="number"
                id="outlined-start-adornment"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                required
              />
            </BsCol>
          </BsRow>
          <BsRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <BsCol sm={2.5}>
                <DesktopDateTimePicker
                  label="Start Date"
                  value={valueDate}
                  minDate={new Date('2017-01-01')}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField style={{ width: 394 }} disabled id="outlined-disabled" {...params} required />
                  )}
                />
              </BsCol>
              <BsCol>
                <DesktopDateTimePicker
                  label="End Date"
                  value={valueDate}
                  minDate={new Date('2017-01-01')}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        mb: 1,
                        width: { sm: 394 },
                      }}
                      {...params}
                      required
                    />
                  )}
                />
              </BsCol>
            </LocalizationProvider>
          </BsRow>
          <BsRow>
            <span style={{ fontSize: 19, fontWeight: 500 }}>
              Active
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="isActive" control={<Radio />} label="Active" />
                <FormControlLabel value="isActive" control={<Radio />} label="Non-Active" />
              </RadioGroup>
            </span>
          </BsRow>
          <BsRow>
            <span style={{ fontSize: 19, fontWeight: 500 }}>
              Status
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="status" control={<Radio />} label="Status 1" />
                <FormControlLabel value="status" control={<Radio />} label="Status 2" />
              </RadioGroup>
            </span>
          </BsRow>
        </BsContainer>
        <BsContainer fluid style={{ height: 400, marginTop: 15 }}>
          <BsRow>
            <BsCol sm={3} style={{ height: containerHeight, overflow: 'auto' }}>
              <div className="p-2 border">
                <span style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Rule Menu</span>
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
      </Container>
    </Page>
  );
}
