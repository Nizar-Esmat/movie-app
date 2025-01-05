import React from 'react';
import api from '../components/api';
import { Row, Spinner, Form, Button, InputGroup } from 'react-bootstrap';
import Cart from '../components/cart';

export default function Movie_list() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [curentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchMode, setIsSearchMode] = React.useState(false);

  const fetchMovies = (query = '', page = curentPage) => {
    const endpoint = query ? 'search/movie' : 'movie/popular';
    api
      .get(endpoint, {
        params: {
          query,
          page,
        },
      })
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchMovies(isSearchMode ? searchQuery : '', curentPage);
  }, [curentPage, isSearchMode]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return; 
    setCurrentPage(1); 
    setIsSearchMode(true); 
    setLoading(true);
    fetchMovies(searchQuery, 1);
  };

  const handleClearSearch = () => {
    setSearchQuery(''); 
    setIsSearchMode(false); 
    setCurrentPage(1); 
    setLoading(true);
    fetchMovies('', 1); 
  };

  const getPageRange = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, curentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center g-4">
      <h2>{isSearchMode ? `Search Results for "${searchQuery}"` : 'Popular Movies'}</h2>

      <InputGroup className="mb-4" style={{ maxWidth: '600px' }}>
        <Form.Control
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
        {isSearchMode && (
          <Button variant="secondary" onClick={handleClearSearch}>
            Clear
          </Button>
        )}
      </InputGroup>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {movies.length > 0 ? (
            movies.map((movie) => <Cart key={movie.id} movie={movie} />)
          ) : (
            <h5>No movies found.</h5>
          )}
        </Row>
      )}

      {!loading && totalPages > 1 && (
        <nav aria-label="Pagination">
          <ul className="pagination pagination-lg">
            {[...Array(endPage - startPage + 1)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  curentPage === startPage + index ? 'active' : ''
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => setCurrentPage(startPage + index)}
                >
                  {startPage + index}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
