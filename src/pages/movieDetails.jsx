import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../components/api';
import { Spinner } from 'react-bootstrap';

export default function MovieDetails() {
  const { id } = useParams();
  let [movie, setMovie] = React.useState(null);
  let [loading, setLoading] = React.useState(true);
  React.useEffect(() => {

    api
      .get(`/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
