import './App.css';
import eye from './eye.png'
import eyeoff from './eye-off.png'
import { useState } from 'react';


function App() {
  const [rightIcon, setRightIcon] = useState(eyeoff);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")


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
  const registerUser = () => {
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (name === "") {

        setError("Please enter name")
      } else if (email === "") {
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
      }

    } catch (e) {

    }

  }
  return (
    <div className="app">
      <div className='title'>
        <h1>Create an Account</h1>
      </div>

      <div className='textfield'>
        <input placeholder='Enter name' onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div className='textfield'>
        <input placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>
      <div className='textfield'>
        <input type={passwordVisibility === true ? "text" : "password"} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <img alt="eye" onClick={handlePasswordVisibility} src={rightIcon} />

      </div>

      <div className='buttons'>
        <button className='clear'>Clear</button>
        <button className='submit' onClick={registerUser}>Submit</button>
      </div>
      <h5 className='error'>{error}</h5>
    </div>
  );
}

export default App;
