import React, { useState } from 'react';
import { Card, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Cart({ movie }) {
  let navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false); 
  const handleNavigate = () => {
    navigate(`/movieDetails/${movie.id}`);
  };

  const toggleLike = (event) => {
    event.stopPropagation(); 
    setIsLiked(!isLiked); 
  };

  return (
    <Col key={movie.id} className="mb-4">
      <Card
        onClick={handleNavigate}
        style={{ cursor: 'pointer' }}
        className="shadow-sm border-light rounded position-relative"
      >
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-top"
        />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title className="mb-0" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {movie.title}
            </Card.Title>

            <i
              className={`fa-heart fa-xl pointer ${isLiked ? 'fa-solid text-danger' : 'fa-regular text-muted'}`}
              onClick={toggleLike}
              style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
            ></i>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <Badge
              pill
              bg="dark"
              className="text-white py-2 px-3"
            
            >
              {movie.vote_average}
            </Badge>

            <Card.Text className="mb-0">
              <strong>Release Date:</strong> {movie.release_date}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>


    </Col>
  );
}
