import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../store/favoritesSlice';
import { Row, Col, Card, Button } from 'react-bootstrap';

export default function WantToWatch() {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);

  const handleRemove = (movieId) => {
    dispatch(removeFavorite(movieId));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Watchlist</h2>
      {favorites.length === 0 ? (
        <h5 className="text-center text-muted">Your watchlist is empty. Add some movies to get started!</h5>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {favorites.map((movie) => (
            <Col key={movie.id}>
              <Card className="shadow-sm border-light rounded">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-top"
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    <strong>Release Date:</strong> {movie.release_date}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(movie.id)}
                  >
                    Remove from Watchlist
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
