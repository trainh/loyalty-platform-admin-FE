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
  // Divider,
  List,
  // ListItem,
  // ListItemText,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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

  const [valueDate, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
  const compare = ['>', '>=', '=', '<', '<='];

  const [isDragging, setIsDragging] = useState(false);
  const [readyToDrop, setReadyToDrop] = useState(false);
  const [optionsEnd, setOptionsEnd] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selectionModel, setSelectionModel] = useState([]);
  const isUnitItem = false;
  const containerHeight = 400;

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
    </Page>
  );
}
