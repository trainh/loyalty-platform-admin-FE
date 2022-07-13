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
  List,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';
import { dateTimePickerValueManager } from '@mui/x-date-pickers/DateTimePicker/shared';
import { Container as BsContainer, Row as BsRow, Col as BsCol } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';

import Iconify from '../../components/Iconify';
import Page from '../../components/Page';



// ----------------------------------------------------------------------

export default function NewCondition() {
  const condition = ['Condition Rule', 'Condition Rule 1'];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
  ];

  const rows = [
    { id: 1, name: 'Snow' },
    { id: 2, name: 'Lannister' },
    { id: 3, name: 'Lannister' },
    { id: 4, name: 'Stark' },
    { id: 5, name: 'Targaryen' },
    { id: 6, name: 'Melisandre' },
    { id: 7, name: 'Clifford' },
    { id: 8, name: 'Frances' },
    { id: 9, name: 'Roxie' },
  ];

  const compare = ['>', '>=', '=', '<', '<='];

  const [isDragging, setIsDragging] = useState(false);
  const [readyToDrop, setReadyToDrop] = useState(false);
  const [optionsEnd, setOptionsEnd] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selectionModel, setSelectionModel] = useState([]);
  const isUnitItem = false;
  const containerHeight = 350;

  const [optionsGroup, setOptionsGroup] = useState([
    { value: 0, label: 'Order Amount Condition', isExpand: false },
    { value: 1, label: 'Order Item Condition', isExpand: false },
  ]);

  const optionsStart = [
    { value: 0, label: 'Discount', group: 0 },
    { value: 1, label: 'After Discount', group: 0 },
    { value: 2, label: 'Quantity', group: 1, selectList: [] },
  ];

  const handleClickOpen = (index) => {
    setEditingIndex(index);
    setSelectionModel(optionsEnd[index].selectList);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingIndex(-1);
    setSelectionModel([]);
    setOpen(false);
  };

  // "v" Must be a object
  const cloneDeep = (v) => JSON.parse(JSON.stringify(v));

  const orderAmountEnd = (item, index) => {
    let result = null;

    switch (item.value) {
      case 0:
        result = (
          <span className="d-flex align-items-center">
            <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }} className="mr-1">
              Discount:
            </span>
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Min Amount:
            </span>
            <TextField style={{ width: 100 }} size="small" id="outlined-number" label="Point" type="number" required />
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Next Amount:
            </span>
            <TextField style={{ width: 100 }} size="small" id="outlined-number" label="Point" type="number" required />
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Total Point:
            </span>
            <TextField style={{ width: 100 }} size="small" id="outlined-number" label="Point" type="number" required />
          </span>
        );
        break;

      case 1:
        result = (
          <span className="d-flex align-items-center">
            <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }} className="mr-1">
              After Discount:
            </span>
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Min Amount:
            </span>
            <TextField style={{ width: 100 }} size="small" id="outlined-number" label="Point" type="number" required />
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Next Amount:
            </span>
            <TextField style={{ width: 100 }} size="small" id="outlined-number" label="Point" type="number" required />
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Total Point:
            </span>
            <TextField style={{ width: 100 }} size="small" id="outlined-number" label="Point" type="number" required />
          </span>
        );
        break;

      case 2:
        result = (
          <div div className="d-flex align-items-center">
            <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }}>Each product in </span>
            <Button onClick={() => handleClickOpen(index)}>selection list ({item.selectList.length})</Button>
            <span style={{ color: 'black', fontSize: 14 }}> has quantity </span>
            <Autocomplete
              // value={valueable}
              // onChange={(event, valueable) => {
              //   setValue(valueable);
              // }}
              size="small"
              className="mx-1"
              options={compare}
              renderInput={(params) => <TextField style={{ width: 95 }} {...params} variant="outlined" required />}
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
          {orderAmountEnd(v, i)}
          {i < optionsEnd.length - 1 ? <div>Or</div> : null}
        </div>
        <ClearIcon
          className="position-absolute"
          style={{ top: 14, right: 0, cursor: 'pointer' }}
          onClick={() => {
            const result = optionsEnd.filter((_, opIndex) => opIndex !== i);
            setOptionsEnd(result);
          }}
        />
      </div>
    ));

  return (
    <Page title="Condition Group">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Condition Group
          </Typography>
          <span>
            <Button
              style={{ marginRight: 5 }}
              variant="contained"
              component={RouterLink}
              to="/dashboard/condition"
              startIcon={<Iconify icon="mdi:arrow-left-thin" />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/condition/new-condition-rule"
              startIcon={<Iconify icon="mdi:content-save" />}
            >
              Save
            </Button>
          </span>
        </Stack>
        <BsContainer fluid>
          <BsRow>
            <Autocomplete
              // value={valueable}
              // onChange={(event, valueable) => {
              //   setValue(valueable);
              // }}
              // size="small"
              style={{ marginBottom: 15 }}
              // className="mx-1"
              options={condition}
              renderInput={(params) => <TextField style={{ width: 300 }} {...params} variant="outlined" required />}
            />
          </BsRow>
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
        <BsContainer fluid style={{ height: 350, marginTop: 15 }}>
          <BsRow>
            <BsCol sm={3} style={{ height: containerHeight, overflow: 'auto' }}>
              <div className="p-2 border">
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
              <Button
                color="inherit"
                onClick={() => {
                  const newOptionEnd = cloneDeep(optionsEnd);
                  newOptionEnd[editingIndex].selectList = selectionModel;
                  setOptionsEnd(newOptionEnd);
                  handleClose();
                }}
              >
                Select Product
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <div style={{ textAlign: 'center', marginBottom: 5 }}>
              <span style={{ fontSize: 35, fontWeight: 'bold' }}>List Product</span>
            </div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
              />
            </div>
          </List>
        </Dialog>
      </Container>
    </Page>
  );
}
