import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap'
import NavbarComponent from '../navbar/Navbar';


export default class Template extends Component {


  render() {
    
    return (
      <div>
        <Container className="wrapper"> 
          <Row>
            <Col>
              <Navbar bg="dark" variant="dark" expand="lg">
                <NavbarComponent />
                  <Navbar.Brand href="#home"><h4>LaunchVue</h4></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                        
                      </Nav>
                      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Carousel View</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.2">List View</NavDropdown.Item>
                      </NavDropdown>
                </Navbar.Collapse>
              </Navbar>
                <section>
                  {this.props.children}
                </section>
                <footer className="text-center">
                  <Navbar 
                  bg="light" 
                  variant="dark" 
                  expand="lg" 
                  fixed="bottom"
                  className="text-center"
                  >
                    
                  <span>LaunchVue © 2019</span>
                
                  </Navbar>
               </footer>
            </Col>
          </Row>
        </Container>
        
      </div>
    )
  }
}