import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import AdminPanel from './AdminPanel';
import GeneralContent from './GeneralContent';


export default function App() {



  return (
    <Router>
      <Routes>
        <Route path='/' element={<GeneralContent />} />
        <Route path='/admin' element={<AdminPanel />} />

      </Routes>
    </Router>
  );
}