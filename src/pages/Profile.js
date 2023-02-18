import '../App.css';
import picture from './assets/picture.png'
import { useState, useEffect } from 'react';
import backGround from './assets/background.jpg'
import { Container, Form, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import picIcon from './assets/picture.png'
import camera from './assets/camera.png'



import us from './assets/us.png'
import job from './assets/job.png'

import em from './assets/email.png'




import { useNavigate } from "react-router-dom";
import * as base from "../env";



var url = base.BASE_URL
var url_image = base.BASE_URL_IMAGE

function Profile() {
  const navigate = useNavigate();


  const [file, setFile] = useState("")
  const [fileName, setFileName] = useState("")
  const [image, setImage] = useState(localStorage.getItem("picture"))

    const Logout = () => {
        localStorage.clear()
        navigate("/login")

    }

  
async function fetchUser(){
  var formData = new FormData()
        formData.append("Email", localStorage.getItem("email"))
        formData.append("Image", file)
       
        //formData.append("ProfilePicture", "pic")

        const response = await fetch(url+"/fetch_user", {
          method: 'POST',
          body: formData,
          
      });

      const json = await response.json();
      setImage(json.ProfilePicture)
      localStorage.removeItem("picture")
    localStorage.setItem("picture", json.ProfilePicture)

      
}


  const saveFile = async(e)=>{
    setFile("")
    setFileName("")
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
    
    try{

       
      var formData = new FormData()
      formData.append("file", e.target.files[0])
      formData.append("Email", localStorage.getItem("email"))
      formData.append("Image", fileName)

      
     
      //formData.append("ProfilePicture", "pic")

      const response = await fetch(url+"/update_profile", {
        method: 'POST',
        body: formData,
        
    });

    const json = await response.json();
   var success = JSON.stringify(json)
   if(success=="true"){
    
    //localStorage.removeItem("picture")
    //localStorage.setItem("picture", "/images/"+e.target.files[0].name)
      alert("Updated Successfully!!")
      fetchUser()
   }
  }catch(e){
      alert(e)
  }
    
  }
  /* eslint-disable */
  

 function checkLogin(){
  if(localStorage.getItem("name")==null){
    window.location.replace("/login")
    }
 }


  useEffect(()=>{
    checkLogin()
  },[])

 

  return (
    <>

<Navbar className='nav' bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">La Brisa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="/holidays">Holidays</Nav.Link>
                            <Nav.Link href="/manage_holidays">Manage Holidays</Nav.Link>
                            <Nav.Link href="/add_holiday">Add Holiday</Nav.Link>


                            

                        </Nav>
                        {localStorage.getItem("name") != null ? (
                                <>
                                    <Nav.Link>Hello, {localStorage.getItem("name")}</Nav.Link>

                                    <NavDropdown title={<img alt="holiday" className='picture' src={localStorage.getItem("picture")!=""?url_image+image:picIcon} />} id="navbarScrollingDropdown">


                                        <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                        
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={Logout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>

                            ) : (
                                <> <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/signup">Signup</Nav.Link>
                                </>
                            )

                            }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    <div className="cardProfile">
      <div className="card-img-top">
      <img className='backImage' src={backGround} alt="Card image cap"/>

      </div>
  <div class="card-body">
  
    <img className="profilePicture" src={localStorage.getItem("picture")!=""?url_image+image:picIcon}/>
   <div className="inner">
   <h5 class="name">{localStorage.getItem("name")}</h5>
   <div className='locationDiv'>
   <img className="locationIcon" src={us}/>
   <h5 class="location">Las Vegas, Unidos Estados</h5>
   </div>


   <div className='emailDiv'>
   <img className="emailIcon" src={em}/>
   <h5 class="email">{localStorage.getItem("email")}</h5>

   <img className="emailIcon" src={job}/>
   <h5 class="email">Travel Consultant</h5>
   </div>
  

   <div className='buttons'>
        <button className='messageBtn' >Message</button>
        <button className='shareBtn' ><input type="file" onChange={saveFile} id="imageUpload" accept="image/*" /></button>
       
      </div>
    
   </div>
    
  </div>
</div>
     </>
  );
}

export default Profile;
