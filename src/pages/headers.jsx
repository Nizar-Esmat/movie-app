import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Headers() {
    const favoriteCount = useSelector((state) => state.favorites.favorites.length);

    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    🎥 Movie App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/wantToWatch">
                            <i className="fa-solid fa-heart px-3"></i>
                            Watchlist
                            {favoriteCount}
                        </Nav.Link> 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Headers;
