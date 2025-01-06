import React, { useState, Suspense } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Headers from './pages/headers';
import Container from 'react-bootstrap/Container';
import NotFound from './pages/NotFound';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LanguageContext from './Context/LanguageContext';
import { Spinner } from 'react-bootstrap';


const Movie_list = React.lazy(() => import('./pages/Movie_list'));
const MovieDetails = React.lazy(() => import('./pages/movieDetails'));
const WantToWatch = React.lazy(() => import('./pages/wantToWatch'));


function App() {
  const [lang, setLang] = useState('en');


  return (
    <BrowserRouter>
      <LanguageContext.Provider value={{ lang, setLang }}>
        <Headers />
        <Container
          dir={lang == 'ar' ? "rtl" : "ltr"}
          className={lang === 'ar' ? "text-right" : "text-left"}
          fluid
        >
          <Suspense fallback={<div className="d-flex justify-content-center">
            <Spinner animation="grow" />
          </div>}>
            <Routes>
              <Route path="/" element={<Movie_list />} />
              <Route path="/watchlist" element={<Movie_list />} />
              <Route path="/movieDetails/:id" element={<MovieDetails />} />
              <Route path="/WantToWatch" element={<WantToWatch />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Container>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
}

export default App;
