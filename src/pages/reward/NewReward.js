import { Container, Button, TextField, Typography, Stack, Autocomplete } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/Iconify';

import Page from '../../components/Page';

// ----------------------------------------------------------------------

const options = ['Active', 'Non-Active'];
const optionType = ['HTML', 'JS', 'Java', 'Python'];

const Input = styled('input')({
  display: 'none',
});

export default function NewReward() {
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
              // ...style,
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
                // padding: '0 14px',
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
        <br />
        <div>
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField
                sx={{
                  // ...style,
                  mb: 2,
                  mr: 2,
                  width: { sm: 300 },
                }}
                {...params}
                label="Status"
                variant="outlined"
                required
              />
            )}
          />
          <Autocomplete
            options={optionType}
            renderInput={(params) => (
              <TextField
                sx={{
                  // ...style,
                  mb: 2,
                  mr: 2,
                  width: { sm: 300 },
                }}
                {...params}
                label="Type"
                variant="outlined"
                required
              />
            )}
          />
          <div>
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </div>
        </div>
        <div style={{ minHeight: '40vh' }}>Data</div>
      </Container>
    </Page>
  );
}
