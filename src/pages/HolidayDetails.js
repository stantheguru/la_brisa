import React, { useEffect, useState } from 'react'
import { Container, Form, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import '../App.css'
import picIcon from './assets/picture.png'
import { useNavigate } from 'react-router-dom';
import * as base from "../env";



var url = base.BASE_URL
var url_image = base.BASE_URL_IMAGE

const HolidayDetails = () => {
    const navigate = useNavigate()
    const [details, setDetails] = useState({})
    const [searchTerm, setSearchTerm] = useState("")

    const Logout = () => {
        localStorage.clear()
        navigate("/login")

    }


    const fetchDetails = async () => {
        try {
            var URL = window.location.toString()

            var index = URL.lastIndexOf("/") + 1
            var id = URL.substring(index)

            var formData = new FormData()
            formData.append("HolidayID", id)
      

            //formData.append("ProfilePicture", "pic")

            const response = await fetch(url + "/holiday_details", {
                method: 'POST',
                body: formData,

            });
            const data = await response.json();
            setDetails(data)


        } catch (e) {
            alert(e)
        }



    }

    useEffect(() => {
        fetchDetails()

    }, [])
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


            <div class="card">
                <img src={url_image+details.Image} class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">{details.HolidayName}</h5>
                    
                    
                    <hr></hr>
                    <div className="cardItem">
                    <h6 className="subtitle">Location</h6>
                    <div className='space'></div>
                        <p>{details.Location}</p>
                    </div>
                    <hr></hr>

                    
                    <div className="cardItem">
                    <h6 className="subtitle">Price</h6>
                    <div className='space'></div>
                        <p>KES{details.Price}</p>
                    </div>
                    <hr></hr>

                    <h6 className="subtitle">Dates</h6>
                    <div className='dates'>
                    <div className="cardDate">
                            <p>{details.StartDate}</p>
                        </div>
                        <h6 className="to">TO</h6>
                        <div className="cardDate">
                            <p>{details.EndDate}</p>
                        </div>
                         <button className='submitBook'>Book Now</button>
                    </div>
                 
                   
                   

                  

                 
                </div>
            </div>
        </>

    )
}

export default HolidayDetails