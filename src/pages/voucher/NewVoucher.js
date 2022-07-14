import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps as Uploaded } from 'antd';
import { message, Upload } from 'antd';
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
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { Container as BsContainer, Row as BsRow, Col as BsCol } from 'react-bootstrap';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function NewVoucher() {
  const [valueDate, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
  const expireOptions = ['Day', 'Month', 'Year'];
  const { Dragger } = Upload;

  const props: Uploaded = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

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
        <BsContainer fluid>
          <BsRow>
            <span className="d-flex align-items-center" style={{ marginBottom: 18 }}>
              <span style={{ fontSize: 18 }} className="m-2">
                Voucher Code:
              </span>
              <TextField style={{ width: 500, marginRight: 10 }} size="small" label="Voucher Code" disabled />
              <Button
                style={{ width: 156 }}
                variant="contained"
                component={RouterLink}
                to="#"
                // startIcon={<Iconify icon="mdi:content-save" />}
              >
                Generate
              </Button>
            </span>
          </BsRow>
          <BsRow>
            <TextField
              style={{ width: 800, marginBottom: 18 }}
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
                  label="Voucher Expiration Date"
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
            <span className="d-flex align-items-center" style={{ marginBottom: 18 }}>
              <span style={{ fontSize: 18 }} className="m-2">
                Expiration Period:
              </span>
              <TextField style={{ width: 220, marginRight: 8 }} size="large" label="Amount" type="number" required />
              <span style={{ fontSize: 18 }} className="m-2">
                Expiration Period Unit:
              </span>
              <Autocomplete
                size="large"
                className="mx-1"
                options={expireOptions}
                renderInput={(params) => (
                  <TextField
                    style={{ width: 220 }}
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
              Partial Redeemable:
              <span>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <FormControlLabel value="isActive" control={<Radio />} label="Yes" />
                  <FormControlLabel value="isActive" control={<Radio />} label="No" />
                </RadioGroup>
              </span>
            </span>
          </BsRow>
          <BsRow>
            <span>
              <span style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Voucher Images</span>
              <Dragger {...props}>
                <span className="ant-upload-drag-icon" style={{ height: 200, width: 200 }}>
                  <InboxOutlined />
                </span>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
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
              required
              multiline
            />
          </BsRow>
        </BsContainer>
      </Container>
    </Page>
  );
}
