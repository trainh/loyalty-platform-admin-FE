import React, { useState, useCallback, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
// import type { UploadProps as Uploaded } from 'antd';
import { message, Upload } from 'antd';
import { useDropzone } from 'react-dropzone';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
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
  Grid,
  FormControl,
  FormLabel,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { format } from 'date-fns';
import { Link as RouterLink,  useNavigate } from 'react-router-dom';
import { Container as BsContainer, Row as BsRow, Col as BsCol } from 'react-bootstrap';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import { storage } from '../../fire/firebaseUploadImageVoucherDefinition';


// ----------------------------------------------------------------------

export default function NewVoucher() {
  const expireOptions = ['Day', 'Month', 'Year'];
  const { Dragger } = Upload;

  const config = {
    Headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJlbWFpbCI6ImxldHJhbmR1eWFuaDEwNDIwMDBAZ21haWwuY29tIiwianRpIjoiNzlkMGNmOWQtNjU1NS00NmFjLWJjMjMtOGNjZjdjZGFiMWJkIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjU3MjcyMTI4LCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG95YWx0eS1wbGF0Zm9ybS1kYmIwNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDk2MjIvaW5kZXguaHRtbCJ9.wSyDew5olENMVyDV7ajJlpir4NrG_zoRdo65o61bfl8',
    },
  };

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };


  const [voucherCode, setVoucherCode] = useState('Voucher Code');
  const [name, setName] = useState('');
  const [discountValue, setDiscountValue] = useState(0);
  const [point, setPoint] = useState(0);
  const [effectiveDate, setEffectiveDate] = useState(format(new Date(), 'yyyy/MM/dd'));
  const [expirationDate, setExpirationDate] = useState(format(new Date(), 'yyyy/MM/dd'));
  const [expirationPeriod, setExpirationPeriod] = useState(0);
  const [expirationPeriodUnits, setExpirationPeriodUnits] = useState('');
  const [isPartialRedeemable, setIsPartialRedeemable] = useState(true);
  const [imageUpload, setImageUpload] = useState(null);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const voucher = {
    name,
    discountValue,
    effectiveDate: format(new Date(), 'yyyy/MM/dd'),
    expirationDate: format(new Date(), 'yyyy/MM/dd'),
    voucherCode,
    status: 1,
    description,
    expirationPeriod,
    expirationPeriodUnits,
    isPartialRedeemable,
    image,
    point
  };

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
        voucher.image = url;
        saveService();
      });
    });
  };

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  const navigate = useNavigate();

  const saveService = () => {
    console.log(`5 ${voucher.image}`);
    axios
      .post('http://13.232.213.53/api/v1/vouchers', voucher, { headers })
      .then(navigate('/dashboard/voucher'))
      .catch((err) => console.log(err.response));
  };

  const save = () => {
    uploadFile();
  };

  const handleGenerateVoucherCode = () => {
    const r = (Math.random() + 1).toString(36).substring(2);
    setVoucherCode(`VOUCHERCODE${r.toUpperCase()}`);
  }

  const handleOnchange = e => {
    setName(e.target.value);
  };

  const handleOnchangeDiscountVoucher = e => {
    setDiscountValue(e.target.value);
  };

  const handleOnchangePoint = e => {
    setPoint(e.target.value);
  };

  const handleOnchangeAmount = e => {
    setExpirationPeriod(e.target.value);
  }

  const handleOnchangeDescription = e => {
    setDescription(e.target.value);
  }


  //   const props: Uploaded = {
  //     name: 'file',
  //     multiple: true,
  //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //     onChange(info) {
  //       const { status } = info.file;
  //       if (status !== 'uploading') {
  //         console.log(info.file, info.fileList);
  //       }
  //       if (status === 'done') {
  //         // message.success(`${info.file.name} file uploaded successfully.`);
  //       } else if (status === 'error') {
  //         // message.error(`${info.file.name} file upload failed.`);
  //       }
  //     },
  //     onDrop(e) {
  //       console.log('Dropped files', e.dataTransfer.files);
  //     },
  //   };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const drop = useDropzone({ onDrop });

  return (
    <Page title="Condition Rule">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Voucher
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={save}
            startIcon={
              <Iconify
                icon="mdi:content-save"
              />
            }>
            Save
          </Button>
        </Stack>
        <BsContainer fluid>
          <BsRow>
            <span className="d-flex align-items-center" style={{ marginBottom: 18 }}>
              <span style={{ fontSize: 18, fontWeight: 'bold' }} className="m-2">
                Voucher Code:
              </span>
              <TextField style={{ width: 500, marginRight: 10 }} size="small" value={voucherCode} disabled />
              <Button
                style={{ width: 156 }}
                variant="contained"
                onClick={handleGenerateVoucherCode}
              // startIcon={<Iconify icon="mdi:content-save" />}
              >
                Generate
              </Button>
            </span>
          </BsRow>
          <BsRow>
            <TextField
              style={{ width: 800, marginBottom: 18 }}
              onChange={handleOnchange}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
            />
          </BsRow>
          <BsRow style={{ marginBottom: 18 }}>
            <BsCol sm={2.5}>
              <TextField
                style={{ width: 394 }}
                id="outlined-basic"
                onChange={handleOnchangeDiscountVoucher}
                label="Discount Value "
                variant="outlined"
                type="number"
                required
              />
            </BsCol>
            <BsCol>
              <TextField
                style={{ width: 394 }}
                id="outlined-basic"
                label="Point"
                variant="outlined"
                onChange={handleOnchangePoint}
                type="number"
                required
              />
            </BsCol>
          </BsRow>
          <BsRow style={{ marginBottom: 18 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <BsCol sm={2.5}>
                <DesktopDateTimePicker
                  label="Voucher Effective Date"
                  value={effectiveDate}
                  inputFormat="dd/MM/yyyy"
                  minDate={new Date('2017-01-01')}
                  onChange={(newValue) => {
                    setEffectiveDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField style={{ width: 394 }} disabled id="outlined-disabled" {...params} required />
                  )}
                />
              </BsCol>
              <BsCol>
                <DesktopDateTimePicker
                  label="Voucher Expiration Date"
                  value={expirationDate}
                  inputFormat="dd/MM/yyyy"
                  minDate={new Date('2017-01-01')}
                  onChange={newValue => { setExpirationDate(newValue) }}
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
            <span className="d-flex align-items-center" style={{ marginBottom: 18 }}>
              <span style={{ fontSize: 18, fontWeight: 'bold' }} className="m-2">
                Exp. Period:
              </span>
              <TextField
                style={{ width: 273, marginRight: 8 }}
                size="large"
                label="Amount"
                type="number"
                onChange={handleOnchangeAmount}
                required
              />
              <span style={{ fontSize: 18, fontWeight: 'bold' }} className="m-2">
                Exp. Period Unit:
              </span>
              <Autocomplete
                size="large"
                className="mx-1"
                options={expireOptions}
                onChange={(event, newValue) => {
                  setExpirationPeriodUnits(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    style={{ width: 233 }}
                    {...params}
                    id="outlined-startAdornment"
                    label="Time type"
                    variant="outlined"
                    required
                  />
                )}
              />
            </span>
          </BsRow>
          <BsRow style={{ marginBottom: 18 }}>
            <span style={{ fontSize: 18 }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <span style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Partial Redeeme</span>
                </FormLabel>
                <RadioGroup
                  row aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(value, newValue) => setIsPartialRedeemable(newValue === 'true')}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </span>
          </BsRow>
          <BsRow>
            <span style={{ width: '54%' }}>
              <span style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Voucher Images</span>
              <Grid container direction="column">
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignContent="center"
                  sx={{ border: '1px solid grey', height: 200, bgcolor: 'grey', mb: 3, width: '100%' }}
                >
                  <Grid item>
                    <Grid item>
                      <Grid container direction="row">
                        <Grid item>
                          <CloudUploadIcon sx={{ fontSize: 30, mr: 2, color: 'grey' }} />
                        </Grid>
                        <Grid item>
                          <input
                            type="file"
                            onChange={(event) => {
                              console.log(event.target.files[0]);
                              setImageUpload(event.target.files[0]);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </span>
          </BsRow>
          <BsRow>
            <TextField
              style={{ width: 800 }}
              inputProps={{
                style: {
                  height: 100,
                },
              }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={handleOnchangeDescription}
              required
              multiline
            />
          </BsRow>
        </BsContainer>
      </Container>
    </Page>
  );
}
