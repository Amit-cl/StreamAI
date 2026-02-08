import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store?.gpt)
if (!movieNames) return null

  return (
    <div className='bg-gray-700/85'>
      {movieNames.map((movie, index) => {
        return <MovieList key={index}
         title={movie} 
         movies={movieResults[index]} />
      })}
    </div>
  )
}

export default GptMovieSuggestions
