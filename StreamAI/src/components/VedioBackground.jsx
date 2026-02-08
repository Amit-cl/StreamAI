import React from 'react'
import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VedioBackground = ({ id }) => {
  const trailerVedio = useSelector((store) => store.movies.trailerVedio)
  useMovieTrailer(id)

  return (
    <div className="relative w-screen h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden bg-black">
      <iframe
        className="absolute inset-0 w-full h-full scale-125"
        src={`https://www.youtube.com/embed/${trailerVedio?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVedio?.key}&playsinline=1`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        frameBorder="0"
        title="Trailer"
      />
    </div>
  )
}

export default VedioBackground
