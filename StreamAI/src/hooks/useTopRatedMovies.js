import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { options } from "../utils/constant"
import { addTopRatedMovie } from "../utils/moviesSlice"

const useTopRatedMovies = () => {
  const dispatch = useDispatch()
const topRatedMovieData = useSelector((store) => store.movies.topRatedMovie)
  useEffect(() => {
    const getTopRatedMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      )
      const json = await data.json()
      dispatch(addTopRatedMovie(json.results))
    }
   !topRatedMovieData && getTopRatedMovies()
  }, [])
}

export default useTopRatedMovies
