import React from 'react';
import './App.scss';
import 'animate.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/homepage';


function App() {
  return (
    <div className="App">
 <BrowserRouter>
      <div className="pages">
        <Routes>

        <Route exact path="/" element={<HomePage />} />

          

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
