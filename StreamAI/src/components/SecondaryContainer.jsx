import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies)
  // console.log(movies.nowPlayingMovies);
const trending = movies.nowPlayingMovies
  ? [...movies.nowPlayingMovies].reverse()
  : []

  return (
   <div className="bg-black">
  <div className="
    -mt-8 sm:-mt-12 md:-mt-28 lg:-mt-35
    relative z-40
    pb-8 sm:pb-12 md:pb-16
  ">
    <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
    <MovieList title="Top Rated" movies={movies.topRatedMovie} />
    <MovieList title="Popular" movies={movies.popularMovies} />
    <MovieList title="Trending" movies={trending} />
    <MovieList title="Upcoming" movies={movies.upcomingMovie} />
  </div>
</div>

  )
}

export default SecondaryContainer
