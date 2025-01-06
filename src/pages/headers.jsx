import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LanguageContext from '../Context/LanguageContext';
import { Form } from 'react-bootstrap';

function Headers() {
  const favoriteCount = useSelector((state) => state.favorites.favorites.length);
  let { lang, setLang } = useContext(LanguageContext) ;  

  let handleLanguageChange = (selectedLanguage) => {
    setLang(selectedLanguage);
    console.log(`Language changed to: ${selectedLanguage}`);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
      <Container >
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🎥 Movie App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/wantToWatch">
              <i className="fa-solid fa-heart px-3"></i>
              Watchlist ({favoriteCount})
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <Form.Select
              aria-label="Select Language"
              onChange={(e) => handleLanguageChange(e.target.value)}
              style={{ width: '150px' }}
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </Form.Select>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headers;
