import React, { useState } from 'react';

import { Container, Button, TextField, Typography, Stack, InputAdornment, Autocomplete } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Iconify from '../../components/Iconify';

import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function NewCondition() {
  const [value, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
  const options = ['Active', 'Non-Active'];

  return (
    <Page title="Condition Rule">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New - Condition Rule
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
          <TextField
            label="Spending Value"
            id="outlined-start-adornment"
            type="number"
            sx={{
              mb: 2,
              mr: 2,
              width: { sm: 150 },
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            required
          />
          <TextField
            sx={{
              mb: 2,
              mr: 2,
              width: { sm: 150 },
            }}
            id="outlined-number"
            label="Point"
            type="number"
            required
          />
          <TextField
            sx={{
              mb: 2,
              mr: 2,
              width: { sm: 250 },
            }}
            id="outlined-number"
            label="Redeemable Redemption"
            type="number"
            required
          />
          <TextField
            sx={{
              mb: 2,
              mr: 2,
              width: { sm: 200 },
            }}
            id="outlined-number"
            label="Redeemable Points"
            type="number"
            required
          />
          <TextField
            sx={{
              mb: 2,
              mr: 2,
              width: { sm: 200 },
            }}
            id="outlined-number"
            label="Redeemable Amount"
            type="number"
            required
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDateTimePicker
                label="Start Date"
                value={value}
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
                value={value}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    inputProps={{
                      style: {
                        height: 100,
                        // padding: '0 14px',
                      },
                    }}
                    sx={{
                      // ...style,
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
        <div>
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField
                sx={{
                  // ...style,
                  // mb: 2,
                  // mr: 2,
                  mt: 3,
                  width: { sm: 250 },
                }}
                {...params}
                label="Status"
                variant="outlined"
                required
              />
            )}
          />
        </div>
      </Container>
    </Page>
  );
}
