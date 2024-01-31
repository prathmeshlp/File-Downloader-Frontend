import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import './App.css'
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/filelist" element={<FileList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
