import {useContext} from 'react'
import {AuthContext} from '../../context/Auth.context'
import {NavLink} from 'react-router-dom'
import { Navbar, Nav, Button, Dropdown, Form, Collapse } from 'bootstrap-4-react';

export const NavBar = () => {
    const auth = useContext(AuthContext)
    const {userId} = useContext(AuthContext)
    const userLink = "/user/" + userId
    const settingsLink = "/settings/" + userId
    

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }
    return (
        <Navbar expand="lg" light bg="light">
          <Navbar.Brand href="/my">
            File Sharing
          </Navbar.Brand>
          <Navbar.Toggler target="#navbarSupportedContent" />
          <Collapse navbar id="navbarSupportedContent">
            <Navbar.Nav mr="auto">
              <Nav.Item active>
                <Nav.Link href="/admin">Главная</Nav.Link>
              </Nav.Item>
              <Nav.Item active>
                <Nav.Link href="/post">Почта</Nav.Link>
              </Nav.Item>
            </Navbar.Nav>
            <Form inline my="2 lg-0" onSubmit={logoutHandler}>
              
                <Button type="submit">Выйти</Button>
              
            </Form>
          </Collapse>
        </Navbar>
      )
}