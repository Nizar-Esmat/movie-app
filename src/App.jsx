import { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Headers from './pages/headers';
import Movie_list from './pages/Movie_list';
import MovieDetails from './pages/movieDetails';
import Container from 'react-bootstrap/Container';
import WantToWatch from './pages/wantToWatch';

import NotFound from './pages/NotFound';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <BrowserRouter>
      <Headers />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Movie_list />} />
          <Route path="/watchlist" element={<Movie_list />} />
          <Route path="/movieDetails/:id" element={<MovieDetails />} />
          <Route path="/WantToWatch" element={<WantToWatch />} />

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
