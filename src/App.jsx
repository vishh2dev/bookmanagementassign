import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import theme from './theme';
import Navbar from './common/Navbar';
import Dashboard from './containers/Dashboard';
import ManageBooks from './containers/ManageBooks';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<ManageBooks />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
