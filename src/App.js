import React, { Suspense, useEffect, useState } from 'react'
import './App.scss';
import 'animate.css';
import lazy from "react-lazy-with-preload";

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material';
import Footer from './components/Footer';

const DashboardPage = lazy(() => import('./pages/dashboardpage'));
const HomePage = lazy(() => import('./pages/homepage'));
const Navbar = lazy(() => import('./components/Navbar'));




const theme = createTheme({
  palette: {

    secondary: {
      main: '#b340c2',
      light: '#e673ff',
      dark: '#800080'

    },
    success: {
      main: 'rgb(46, 197, 46)',

    }

  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>

      <div className="App">
        <BrowserRouter>
        <Suspense fallback={<div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex:'10'}} class="loadingio-spinner-interwind-flyom1cz6sv"><div class="ldio-zxrz71mlja">
              <div><div><div><div></div></div></div><div><div><div></div></div></div></div>
            </div></div>}>
          <Navbar />

          <div className="pages">
         

              <Routes>

                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/dashboard" element={<DashboardPage />} />

              </Routes>

          </div>
            </ Suspense >
        </BrowserRouter>

      </div>

    </ThemeProvider>
  );
}

export default App;
