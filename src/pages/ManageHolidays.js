import React, {useState, useEffect} from 'react'
import * as base from "../env";
import { Container, Form, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import picIcon from './assets/picture.png'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


import { useNavigate } from 'react-router-dom';


var url = base.BASE_URL
var url_image = base.BASE_URL_IMAGE

const ManageHolidays =()=>{
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")

    const [isHoliday, setIsHoliday] = useState("")
    const [holidays, setHolidays] = useState([])



   

    const fetchHolidays = async () => {
      try{
            const response = await fetch(url+"/holidays")
            const data = await response.json();
            setHolidays(data)
            if(data.length===0){
                setIsHoliday("False")

            }else{
                setIsHoliday("True")
            }
          
      }catch(e){
        //alert(e)
      }


    }

    const Logout = () =>{
        localStorage.clear()
        navigate("/login")
        
    }

   

    useEffect(() => {
        fetchHolidays()
        //searchHolidays('Spiderman')
    }, [])


    function confirmDelete(id){
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this holiday.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {Delete(id)}
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
    }

    const Delete = async(id)=>{
        
    
       try{

       
        var formData = new FormData()
        formData.append("HolidayID", id)
       
        //formData.append("ProfilePicture", "pic")

        const response = await fetch(url+"/delete", {
          method: 'POST',
          body: formData,
          
      });

      const json = await response.json();
     var success = JSON.stringify(json)
     if(success=="true"){
        alert("Deleted Successfully!!")
        fetchHolidays()
     }
    }catch(e){
        alert(e)
    }
    }


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


                            {localStorage.getItem("name") != null ? (
                                <>
                                    <Nav.Link>Hello, {localStorage.getItem("name")}</Nav.Link>

                                    <NavDropdown title={<img alt="holiday" className='picture' src={picIcon} />} id="navbarScrollingDropdown">


                                        <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Change Password
                                        </NavDropdown.Item>
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






                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search a holiday"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}
                            />
                            <Button
                               
                                variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='appManage'>
        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Holiday ID</th>
      <th scope="col">Holiday Name</th>
      <th scope="col">Location</th>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>
      <th scope="col">Price</th>
      <th scope="col">Delete</th>
      
    </tr>
  </thead>
  <tbody>
   {holidays.map((holiday)=>(
    <tr>
      <th scope="row">{holiday.HolidayID}</th>
      <td><img className='picture' src={url_image+holiday.Image}/></td>
      <td>{holiday.HolidayName}</td>
      <td>{holiday.Location}</td>
      <td>{holiday.StartDate}</td>
      <td>{holiday.EndDate}</td>
      <td>KES{holiday.Price}.00</td>
      <td><button onClick={(e)=>confirmDelete(holiday.HolidayID)} class="btn btn-danger">Delete</button></td>
    </tr>
   )
   )}
    
 
   
  </tbody>
</table>
</div>
</>
        
    )
}

export default ManageHolidays