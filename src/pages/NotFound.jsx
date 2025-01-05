import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="text-center my-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Back to Home
      </Link>
    </Container>
  );
}

export default NotFound;
