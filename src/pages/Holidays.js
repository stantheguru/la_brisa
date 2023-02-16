import React, { useState, useEffect } from 'react'
import HolidayCard from '../components/HolidayCard'
import '../App.css'
import picIcon from './assets/picture.png'
import { Container, Form, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as base from "../env";



var url = base.BASE_URL



export default function Holidays() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const [isHoliday, setIsHoliday] = useState("")
    const [holidays, setHolidays] = useState([])



   

    const fetchHolidays = async () => {
      
            const response = await fetch(url+"/holidays")
            const data = await response.json();
            setHolidays(data)
            if(data.length===0){
                setIsHoliday("False")

            }else{
                setIsHoliday("True")
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
                                onClick={() => fetchHolidays()}
                                variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="app">


                {isHoliday === "True" ? (
                    <div className='container'>
                        {holidays.map((holiday) => (
                            <HolidayCard holiday={holiday} />
                        )

                        )}

                    </div>
                ) : (
                    <div className='container'>
                        <div className='empty'>
                            <h2>No Holidays Found</h2>
                        </div>

                    </div>
                )}

            </div>
        </>

    )
}
