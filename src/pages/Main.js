import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Holidays from './Holidays';
import AddHoliday from './AddHoliday';
import HolidayDetails from './HolidayDetails';
import ManageHolidays from './ManageHolidays';
import Profile from './Profile';
import Pay from './Pay';


const Main = () => {
    
  return (
    <Routes>
        <Route>
          <Route exact path="/login" element={<Login />} />
           <Route exact path="/signup" element={<Signup />} />   
           <Route exact path="/holidays" element={<Holidays />} />  
           <Route exact path="/manage_holidays" element={<ManageHolidays />} />  
           <Route exact path="/add_holiday" element={<AddHoliday />} />  
           <Route exact path="/profile" element={<Profile />} />  
           <Route exact path="/holiday_details/:id"  element={<HolidayDetails />} />
           <Route exact path="/" element={<Signup />} />  
           <Route exact path="/pay" element={<Pay />} />   
        </Route>
      </Routes>
  );
}

export default Main;