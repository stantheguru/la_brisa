import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';


const Main = () => {
    
  return (
    <Routes>
        <Route>
          <Route exact path="/login" element={<Login />} />
           <Route exact path="/signup" element={<Signup />} />   
           <Route exact path="/" element={<Signup />} />   
        </Route>
      </Routes>
  );
}

export default Main;