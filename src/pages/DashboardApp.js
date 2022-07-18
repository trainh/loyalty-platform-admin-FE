// @mui
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  // const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    

    if (!authToken) {
        navigate('/login')
    }
}, [])

  const token = localStorage.getItem('token');
  console.log(token);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
