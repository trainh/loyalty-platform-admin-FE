import React, { useState } from 'react';

import { Container, Button, TextField, Typography, Stack, Autocomplete } from '@mui/material';
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
    <Page title="Condition Group">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New - Condition Group
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
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDateTimePicker
                disabled
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
                  />
                )}
              />
              <DesktopDateTimePicker
                label="Update Date"
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
