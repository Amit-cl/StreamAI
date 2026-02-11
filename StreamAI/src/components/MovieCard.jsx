import React from 'react'
import { IMG_CDN_URL } from '../utils/constant'

const MovieCard = ({ posterPath }) => {
  // if (posterPath) return null
  if (!posterPath) return <div className=" shrink-0" />



  return(
  <div className="w-48 shrink-0">
    <img
      className="w-full block"
      src={IMG_CDN_URL + posterPath}
      alt="Movie card"
    />
  </div>)
}

export default MovieCard
