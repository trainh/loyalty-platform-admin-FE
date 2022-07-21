import React, { useState, useCallback, useEffect } from 'react';

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
  IconButton,
} from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Container as BsContainer, Row as BsRow, Col as BsCol } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';

import Iconify from '../../components/Iconify';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function NewCondition() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: '100%' },
  ];

  const navigate = useNavigate();

  const [productList, setProdcutList] = useState([]);

  const [groups, setGroups] = useState([]);

  const [tiers, setTiers] = useState([]);

  const [tier, setTier] = useState();

  const [conditionGroup, setConditionGroup] = useState();

  const [productListSelected, setProductListSelected] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [readyToDrop, setReadyToDrop] = useState(false);
  const [optionsEnd, setOptionsEnd] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selectionModel, setSelectionModel] = useState([]);
  const containerHeight = 350;

  const [minOrderAmount, setMinOrderAmount] = useState();
  const [nextOrderAmount, setNextOrderAmount] = useState();
  const [orderTotalAmountGainPoint, setOrderTotalAmountGainPoint] = useState();
  const [orderTotalAmountAfterDiscount, setOrderTotalAmountAfterDiscount] = useState();
  const [nextOrderTotalAmountAfterDiscont, setNextOrderTotalAmountAfterDiscont] = useState();
  const [orderTotalAmountAfterDiscountGainPoint, setOrderTotalAmountAfterDiscountGainPoint] = useState();

  const [quantity, setQuantity] = useState();

  const [productId, setProductId] = useState();

  const [nextQuantity, setNextQuantity] = useState();

  const [quantityGainPoint, setQuantityGainPoint] = useState();

  const [status, setStatus] = useState();
  const [description, setDescription] = useState();

  const statusList = [
    { label: 'Enable', id: 1 },
    { label: 'Disable', id: 2 },
  ];

  const orderAmountCondition = {
    conditionGroupId: conditionGroup,
    tierSequenceNumber: tier,
    nextOrderTotalAmount: nextOrderAmount,
    minOrderAmount,
    orderTotalAmountGainPoint,
    orderTotalAmountAfterDiscount,
    nextOrderTotalAmountAfterDiscont,
    orderTotalAmountAfterDiscountGainPoint,
    status,
    description,
  };

  const orderItemCondition = {
    conditionGroupId: conditionGroup,
    tierSequenceNumber: tier,
    quantity,
    nextQuantity,
    quantityGainPoint,
    status,
    description,
    productId,
  };

  const [found, setFound] = useState(1);

  async function f(test) {
    try {
      const response = await axios.get(
        'https://13.232.213.53/api/v1/condition-groups/find-all',

        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setGroups(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function fTier() {
    try {
      await axios
        .get(
          'https://13.232.213.53/api/v1/tiers/program/1',

          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        )
        .then((response) => setTiers(response.data));
    } catch (e) {
      console.log(e);
    }
  }

  async function fProduct() {
    try {
      await axios
        .get(
          'https://13.232.213.53/api/v1/product',

          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        )
        .then((response) => setProdcutList(response.data));
    } catch (e) {
      console.log(e);
    }
  }

  async function addOrderAmount() {
    try {
      await axios
        .post('https://13.232.213.53/api/v1/order-amount-conditions', orderAmountCondition, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .catch((reason) => {
          if (reason.response.headers.status === 200) {
            navigate('/condition/conditions');
          } else if (reason.response.status === 400) {
            console.log(reason.data);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function addOrderItem() {
    try {
      await axios
        .post('https://13.232.213.53/api/v1/order-item-conditions', orderItemCondition, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .catch((reason) => {
          if (reason.response.status === 200) {
            navigate('/condition/conditions');
          } else if (reason.response.status === 400) {
            console.log(reason.data);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  const onSave = () => {
    if (optionsEnd.find((oe) => oe.value === 0)) {
      addOrderAmount();
    }
    if (optionsEnd.find((oe) => oe.value === 1)) {
      console.log('this found is 1');
    }
    optionsEnd[0].selectList.forEach((item) => {
      orderItemCondition.productId = item;
      addOrderItem();
    });
    // console.log(conditionGroup);
    // console.log(tier);
  };

  const [optionsGroup, setOptionsGroup] = useState([
    { value: 0, label: 'Order Amount Condition', isExpand: false },
    { value: 1, label: 'Order Item Condition', isExpand: false },
  ]);

  const optionsStart = [
    { value: 0, label: 'Total Amount', group: 0 },
    { value: 1, label: 'Quantity', group: 1, selectList: [] },
  ];

  useEffect(() => {
    f();
    fProduct();
    fTier();
  }, []);

  //   console.log(rule`s);

  const handleClickOpen = (index) => {
    setEditingIndex(index);
    setSelectionModel(optionsEnd[index].selectList);
    selectionModel.map((item) => console.log(item));
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
          <div>
            <div className="d-flex align-items-center">
              <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }} className="mr-1">
                Before Discount:
              </span>
              <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
                Min Amount:
              </span>
              <TextField
                style={{ width: 100 }}
                size="small"
                id="outlined-number"
                onChange={(event) => setMinOrderAmount(event.target.value)}
                label="Amount"
                type="number"
                required
              />
              <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
                Next Amount:
              </span>
              <TextField
                style={{ width: 100 }}
                size="small"
                id="outlined-number"
                onChange={(event) => setNextOrderAmount(event.target.value)}
                label="Amount"
                type="number"
                required
              />
              <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
                Total Point:
              </span>
              <TextField
                style={{ width: 100 }}
                size="small"
                id="outlined-number"
                onChange={(event) => setOrderTotalAmountGainPoint(event.target.value)}
                label="Point"
                type="number"
                required
              />
            </div>
            <br />
            <div className="d-flex align-items-center">
              <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }} className="mr-1">
                After Discount:
              </span>
              <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
                Min Amount:
              </span>
              <TextField
                style={{ width: 100 }}
                size="small"
                id="outlined-number"
                onChange={(event) => setOrderTotalAmountAfterDiscount(event.target.value)}
                label="Amount"
                type="number"
                required
              />
              <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
                Next Amount:
              </span>
              <TextField
                style={{ width: 100 }}
                size="small"
                id="outlined-number"
                onChange={(event) => setNextOrderTotalAmountAfterDiscont(event.target.value)}
                label="Amount"
                type="number"
                required
              />
              <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
                Total Point:
              </span>
              <TextField
                style={{ width: 100 }}
                size="small"
                onChange={(event) => setOrderTotalAmountAfterDiscountGainPoint(event.target.value)}
                id="outlined-number"
                label="Point"
                type="number"
                required
              />
            </div>
          </div>
        );

        break;

      case 1:
        result = (
          <div div className="d-flex align-items-center">
            <span style={{ color: 'black', fontSize: 14, marginBottom: 1 }}>Each product in </span>
            <Button onClick={() => handleClickOpen(index)}>selection list ({item.selectList.length})</Button>
            <span style={{ color: 'black', fontSize: 14 }}> has quantity </span>
            {/* <Autocomplete
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
            /> */}
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Min Quantity:
            </span>
            <TextField
              style={{ width: 100 }}
              size="small"
              onChange={(event) => setQuantity(event.target.value)}
              id="outlined-number"
              label="Quantity"
              type="number"
              required
            />
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Next Quantity:
            </span>
            <TextField
              style={{ width: 100 }}
              size="small"
              id="outlined-number"
              onChange={(event) => setNextQuantity(event.target.value)}
              label="Quantity"
              type="number"
              required
            />
            <span style={{ color: '#1266F1', fontSize: 14 }} className="m-1">
              Total Point:
            </span>
            <TextField
              style={{ width: 100 }}
              size="small"
              id="outlined-number"
              label="Point"
              onChange={(event) => setQuantityGainPoint(event.target.value)}
              type="number"
              required
            />
          </div>
        );

        // item.selectList.map((item) => setProductListSelected((oldarray) => [...oldarray, item]));
        break;

      default:
        break;
    }
    // item.selectList.map((item) => console.log(item));
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
              if (!optionsEnd.find((oe) => oe.value === v.value)) {
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
    <Page title="New Condition">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Condition
          </Typography>
          <Button
            variant="contained"
            // component={RouterLink}
            // to="/condition/new-condition-rule"
            startIcon={<Iconify icon="mdi:content-save" />}
            onClick={onSave}
          >
            Save
          </Button>
        </Stack>
        <BsContainer fluid>
          <BsRow style={{ ml: 1 }}>
            <BsCol lg={3}>
              <Autocomplete
                // value={valueable}
                // onChange={(event, valueable) => {
                //   setValue(valueable);
                // }}
                // size="small"
                style={{ marginBottom: 15, mt: 10 }}
                // className="mx-1"
                options={groups}
                getOptionLabel={(option) => option.name || ''}
                onChange={(event, value) => {
                  setConditionGroup(value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    style={{ width: '100%' }}
                    {...params}
                    label="Condition Group"
                    variant="outlined"
                    required
                  />
                )}
              />
            </BsCol>
            <BsCol>
              <Autocomplete
                // value={valueable}
                // onChange={(event, valueable) => {
                //   setValue(valueable);
                // }}
                // size="small"
                style={{ marginBottom: 15, mt: 10 }}
                // className="mx-1"
                options={tiers}
                getOptionLabel={(option) => option.name || ''}
                onChange={(event, value) => {
                  setTier(value.id);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: 300 }} {...params} label="Tier" variant="outlined" required />
                )}
              />
            </BsCol>
          </BsRow>
          <BsRow style={{ ml: 1 }}>
            <BsCol sm={3}>
              <span style={{ fontSize: 19, fontWeight: 500 }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={statusList}
                  //   value={ruleStatus}
                  onChange={(event, value) => setStatus(value.id)}
                  sx={{ width: '100%', mt: 2 }}
                  renderInput={(params) => <TextField {...params} label="Status" />}
                />
              </span>
            </BsCol>
            <BsCol>
              <TextField
                style={{ width: 800, marginBottom: 25, mt: 10 }}
                inputProps={{
                  style: {
                    height: 100,
                  },
                }}
                id="outlined-basic"
                label="Description"
                variant="outlined"
                onChange={(event) => setDescription(event.target.value)}
                required
                multiline
              />
            </BsCol>
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
                rows={productList}
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
