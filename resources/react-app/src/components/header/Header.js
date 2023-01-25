import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Logo from '../../assets/images/logo.png'
import '../../components/header/header.css'

import NavDropdown from 'react-bootstrap/NavDropdown'
function Header({ form, setForm }) {
  const [show, setShow] = useState(false)
  const showDropdown = (e) => {
    setShow(!show)
  }
  const hideDropdown = (e) => {
    setShow(false)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="xl" bg="white">
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="navbar-mobile-right" style={{ display: 'none' }}>
            <Button
              variant="primary"
              className="navbar-button"
              onClick={() => setForm(!form)}
            >
              <a style={{ color: 'white', textDecoration: 'none' }}>
                SPORTS'LU OL!
              </a>
            </Button>
          </Nav>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-between "
          >
            <Nav>
              <Navbar.Brand href="/">
                <img src={Logo} />
              </Navbar.Brand>
            </Nav>
            <Nav className="navbar-list">
              <NavDropdown
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
                title="HAKKIMIZDA"
                id="nav-dropdown"
              >
                <NavDropdown.Item
                  className="dropdown-list"
                  href="/kisaca-biz"
                  eventKey="4.1"
                >
                  KISACA BİZ
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-list"
                  href="/vizyon-misyon"
                  eventKey="4.2"
                >
                  VİZYON MİSYON
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-list"
                  href="/kurucumuz"
                  eventKey="4.3"
                >
                  KURUCUMUZ
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-list"
                  href="/genel-mudur-mesaji"
                  eventKey="4.4"
                >
                  GENEL MÜDÜR MESAJI
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/kuluplerimiz">KULÜPLERİMİZ</Nav.Link>
              <Nav.Link href="/etkinlikler">ETKİNLİKLER</Nav.Link>
              <Nav.Link href="/hizmetlerimiz">HİZMETLERİMİZ</Nav.Link>
              <Nav.Link href="/sportslu-anlatiyor">SPORTSLU ANLATIYOR</Nav.Link>
              <Nav.Link href="https://tahsilat.si.com.tr/" target="_blank">
                ONLINE TAHSİLAT
              </Nav.Link>
              <Nav.Link href="/iletisim">İLETİŞİM</Nav.Link>
            </Nav>
            <Nav className="navbar-button-container">
              <Button
                variant="primary"
                className="navbar-button"
                onClick={() => setForm(!form)}
              >
                <a style={{ color: 'white', textDecoration: 'none' }}>
                  SPORTS'LU OL!
                </a>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
