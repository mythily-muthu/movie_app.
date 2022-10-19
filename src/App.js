import React, { useEffect, useState } from 'react';

import SearchIcon from './search.svg';

import MovieCard from './MovieCard';

import './App.css';



let API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=b94eaefb";

let movie1 = {

  "Title": "Masters of Horror",
  "Year": "2005–2007",
  "imdbID": "tt0448190",
  "Type": "series",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNzZlMzIyY2YtOTI0My00MmM2LWIzZDktYWExYzYxMTIwNDNiXkEyXkFqcGdeQXVyNjU2NTIzNDE@._V1_SX300.jpg"

}



const App = () => {

  let [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  let searchMovies = async (title) => {
    let response = await fetch(`${API_URL}&s=${title}`);
    let data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {

    searchMovies('Horror')
  }, []);
  return (
    <div className='app'>

      <h1>MovieLand</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ?
        (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
    </div>
  );
}


export default App;
