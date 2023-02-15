import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Holidays from './Holidays';
import AddHoliday from './AddHoliday';


const Main = () => {
    
  return (
    <Routes>
        <Route>
          <Route exact path="/login" element={<Login />} />
           <Route exact path="/signup" element={<Signup />} />   
           <Route exact path="/holidays" element={<Holidays />} />  
           <Route exact path="/add_holiday" element={<AddHoliday />} />  
           <Route exact path="/" element={<Signup />} />   
        </Route>
      </Routes>
  );
}

export default Main;