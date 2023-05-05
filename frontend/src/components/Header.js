import React from "react";

import { useDispatch, useSelector } from 'react-redux';

import { Navbar, Nav, Container, NavDropdown , Image, Row } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import {logout} from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin

  const dispatch = useDispatch();

  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="danger" variant="dark" expand="lg" collapseOnSelect>

        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand href="/">Bendita Empanada</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
            
              <LinkContainer to='/cart'>
                <Nav.Link><i className=" fas fa-shopping-cart"></i> Carrito</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Cerrar Sesion</NavDropdown.Item>
                </NavDropdown>
              ): (
                <LinkContainer to='/login'>
                  <Nav.Link><i className=" fas fa-user"></i> Login</Nav.Link>
                </LinkContainer>
              )}


              <NavDropdown title="About" id="navbarScrollingDropdown">
                <LinkContainer to='/'>
                  <NavDropdown.Item>Home</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/productos'>
                  <NavDropdown.Item>Bendita Empresa</NavDropdown.Item>
                </LinkContainer>

              </NavDropdown>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminMenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Lista Usuarios</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Lista Productos</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Lista de Pedidos</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
