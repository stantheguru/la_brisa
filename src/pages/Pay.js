import '../App.css';
import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import * as base from "../env";



var url = base.BASE_URL

function Pay() {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [mobile, setMobile] = useState("")
  const [amount, setAmount] = useState("")
  


  /* eslint-disable */
  const pay = async() => {
    try {
   
        //save user
        var formData = new FormData()
        formData.append("Amount", amount)
 

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
  
      

    } catch (e) {
      

    alert(e)
    }

  }



  const clear =()=>{
    setMobile("")
    setAmount("")
    setError("")
  }

  return (
    <>
      <div className='titleAddHoliday'>
        <h1>PAY</h1>
      </div>

      <div className='textfield'>
        <input placeholder='Enter Mobile Number' onChange={(e) => setMobile(e.target.value)} value={mobile} />
      </div>
      <div className='textfield'>
        <input placeholder='Enter Amount' onChange={(e) => setAmount(e.target.value)} value={amount} />
      </div>

  
      <div className='buttons'>
        <button className='clear' onClick={clear}>Clear</button>
        <button className='submit' onClick={pay}>Submit</button>
      </div>
      <h5 className='error'>{error}</h5>
    </>
  );
}

export default Pay;
