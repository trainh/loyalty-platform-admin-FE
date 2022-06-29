import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

import { Button, Container, Stack, Typography, TextField, Autocomplete } from '@mui/material';
import Iconify from '../../components/Iconify';

import Page from '../../components/Page';

const options = ['Active', 'Non-Active'];

export default function Program() {
  return (
    <div>
      <Page title="New Program">
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              New Program
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
              }}
              disabled
              id="standard-disabled"
              label="Brand Name"
              defaultValue="Passio"
              variant="standard"
            />
          </div>
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
            <Autocomplete
              options={options}
              renderInput={(params) => (
                <TextField
                  sx={{
                    mb: 2,
                    mr: 2,
                    width: { sm: 200 },
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
    </div>
  );
}
