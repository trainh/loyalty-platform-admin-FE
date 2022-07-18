// routes
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';


export default function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      navigate('/dashboard/app')
    }

    if (!authToken) {
      navigate('/login')
    }
}, [])

  return (
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
  );
}
