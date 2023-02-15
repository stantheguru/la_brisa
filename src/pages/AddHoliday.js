import '../App.css';
import eye from './assets/eye.png'
import eyeoff from './assets/eye-off.png'
import { useState } from 'react';

import { useNavigate } from "react-router-dom";
import * as base from "../env";



var url = base.BASE_URL

function AddHoliday() {
  const navigate = useNavigate();
  const [rightIcon, setRightIcon] = useState(eyeoff);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("")
  const [location, setLocation] = useState("")
  const [start_date, setStartDate] = useState("")
  const [end_date, setEndDate] = useState("")
  const [price, setPrice] = useState("")
  const [name, setName] = useState([])
  const [file, setFile] = useState("")
  const [fileName, setFileName] = useState("")
  


  const handlePasswordVisibility = () => {
    if (rightIcon === eye) {
      setRightIcon(eyeoff);
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === eyeoff) {
      setRightIcon(eye);
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const saveFile =(e)=>{
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
    alert(e)
  }
  /* eslint-disable */
  const addHoliday = async() => {
    try {
      if (name === "") {

        setError("Please enter name")
      } else {
        setError("")
        //save user
        var formData = new FormData()
        formData.append("HolidayName", name)
        formData.append("Location", location)
        formData.append("StartDate", start_date)
        formData.append("EndDate", end_date)
        formData.append("Price", price)
        formData.append("file", file)
        formData.append("Image", fileName)
        

        const response = await fetch(url+"/add_holiday", {
            method: 'POST',
            body: formData,
            
        });
  
        const json = await response.json();
        if (json.toString() == "true") {
          alert("Holiday Added Successfully")
        }else{
          setError("An error occurred!!")
        }
  
      }

    } catch (e) {
      

    alert(e)
    }

  }

  const clear =()=>{
    setName("")
    setEmail("")
    setPassword("")
    setError("")
  }

  return (
    <>
      <div className='titleAddHoliday'>
        <h1>Add Holiday</h1>
      </div>

      <div className='textfield'>
        <input placeholder='Enter holiday name' onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div className='textfield'>
        <input placeholder='Enter location' onChange={(e) => setLocation(e.target.value)} value={location} />
      </div>

      <div className='textfield'>
        <input type="number" placeholder='Enter Price' onChange={(e) => setPrice(e.target.value)} value={price} />
      </div>

      <div className='textfield'>
      <label className='labelDate'>Start Date</label>
        <input type="date"  placeholder='Set start date' onChange={(e) => setStartDate(e.target.value)} value={start_date} />
      </div>

      <div className='textfield'>
      <label className='labelDate'>End Date</label>
        <input type="date"  placeholder='Set end date' onChange={(e) => setEndDate(e.target.value)} value={end_date} />
      </div>

     

      <div className='textfield'>
       <input type="file" onChange={saveFile}/>
      </div>

      <div className='buttons'>
        <button className='clear' onClick={clear}>Clear</button>
        <button className='submit' onClick={addHoliday}>Submit</button>
      </div>
      <h5 className='error'>{error}</h5>
      <h5 className='already'><span onClick={()=>navigate("/holidays")} className='loginText'>Back to Holidays</span></h5>
    </>
  );
}

export default AddHoliday;
