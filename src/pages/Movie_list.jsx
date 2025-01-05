import React from 'react';
import api from '../components/api';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import Cart from '../components/cart';

export default function Movie_list() {
  let [movies, setMovies] = React.useState([]);
  let [loading, setLoading] = React.useState(true);
  let [curentPage, setCurrentPage] = React.useState(1);
  let [totalPages, setTotalPages] = React.useState(0);

  let handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true); 
  };

  React.useEffect(() => {
    api
      .get('movie/popular', {
        params: {
          page: curentPage,
        },
      })
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching movies:', err);
        setLoading(false); 
      });
  }, [curentPage]); 

  const getPageRange = () => {
    let maxVisiblePages = 5; 
    let startPage = Math.max(1, curentPage - Math.floor(maxVisiblePages / 2));
    let  endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return { startPage, endPage };
  };

  let { startPage, endPage } = getPageRange();

  return (
    <div className='d-flex flex-column justify-content-center align-items-center g-4'>
      <h2>Popular Movies</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {movies.map((movie) => (
            <Cart key={movie.id} movie={movie} />
          ))}
        </Row>
      )}

      <nav aria-label="...">
        <ul className="pagination pagination-lg">
          {[...Array(endPage - startPage + 1)].map((bage, index) => (
            <li
              key={index}
              className={`page-item ${curentPage === startPage + index ? 'active' : ''}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(startPage + index)}
              >
                {startPage + index}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
