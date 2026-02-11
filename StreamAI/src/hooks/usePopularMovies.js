import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { options } from "../utils/constant"
import { addNowPopularMovies } from "../utils/moviesSlice"

const usePopularMovies = () => {
  const dispatch = useDispatch()
const popularMovieData = useSelector((store) => store.movies.popularMovies)

  useEffect(() => { 
    const getPopularMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
      const json = await data.json()
      dispatch(addNowPopularMovies(json.results))
    }
    !popularMovieData && getPopularMovies() 
  }, [])
}

export default usePopularMovies
