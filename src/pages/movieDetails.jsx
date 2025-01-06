import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import api from '../components/api';
import { Spinner } from 'react-bootstrap';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  // Check if the movie is already in favorites
  const isLiked = favorites.some((favMovie) => favMovie.id === parseInt(id));

  const toggleLike = () => {
    if (isLiked) {
      dispatch(removeFavorite(movie.id)); // Remove from favorites
    } else {
      dispatch(addFavorite(movie)); // Add to favorites
    }
  };

  React.useEffect(() => {
    api
      .get(`/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
              <i
                className={`fa-heart fa-xl pointer ${
                  isLiked ? 'fa-solid text-danger' : 'fa-regular text-muted'
                }`}
                onClick={toggleLike}
                style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
              ></i>
              <p className="mt-3">
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p>
                <strong>Rating:</strong> {movie.vote_average}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
