import React from 'react' 
import VedioBackground from './VedioBackground' 
import VedioTitle from './VedioTitle' 
import { useSelector } from 'react-redux'


const MainCointainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies)

  if (!movies) return null
  //  console.log(movies[0]);
  const { id,original_title, overview } = movies[0]

  return (
 <div className="
  relative bg-black min-h-[70vh] sm:min-h-[80vh] md:min-h-screen
  overflow-hidden
">
  <VedioBackground id={id} />
  <VedioTitle title={original_title} overview={overview} id={id} />
</div>
  )
}
export default MainCointainer