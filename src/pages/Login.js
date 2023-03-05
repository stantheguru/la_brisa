import '../App.css';
import eye from './assets/eye.png'
import eyeoff from './assets/eye-off.png'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import * as base from "../env";

var url = base.BASE_URL


function Login() {
  const navigate = useNavigate();

  const [rightIcon, setRightIcon] = useState(eyeoff);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(()=>{
    if(localStorage.getItem("name")!=null){
    window.location.replace("/holidays")
    }
  }, [])


  const handlePasswordVisibility = () => {
    if (rightIcon === eye) {
      setRightIcon(eyeoff);
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === eyeoff) {
      setRightIcon(eye);
      setPasswordVisibility(!passwordVisibility);
    }
  };
  /* eslint-disable */
  const login = async() => {
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
       if (email === "") {
        setError("Please enter email")
      } else if (reg.test(email) == false) {
        setError("The email is invalid")
        return false;
      } else if (password === "") {
        setError("Please enter password")
      } else if (password.length < 8) {
        setError("Password must be at least 8 characters")
      } else {
        setError("")
        //save user

        var formData = new FormData()
        formData.append("Email", email)
        formData.append("Password", password)
       
        //formData.append("ProfilePicture", "pic")

        const response = await fetch(url+"/login", {
          method: 'POST',
          body: formData,
          
      });

      const json = await response.json();
    
      if (json.exists == "YES") {
        localStorage.clear()
       
        localStorage.setItem("email", email)
        localStorage.setItem("name", json.Name)
        localStorage.setItem("mobile", json.Mobile)
        localStorage.setItem("picture", json.Picture)
        
        navigate("/holidays")
      }else{
        setError("Incorrect login credentials!!")
      }

      }

    } catch (e) {

    }

  }

 

  return (
    <>
      <div className='title'>
        <h1>Sign In</h1>
      </div>

      <div className='textfield'>
        <input placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>
      <div className='textfield'>
        <input type={passwordVisibility === true ? "text" : "password"} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <img alt="eye" onClick={handlePasswordVisibility} src={rightIcon} />

      </div>

     
        <button className='loginBtn' onClick={login}>Login</button>
      
      <h5 className='error'>{error}</h5>
      <h5 className='already'>Don't have an account?<span onClick={() => navigate(`/signup`)} className='loginText'> Signup</span></h5>

    </>
  );
}

export default Login;
