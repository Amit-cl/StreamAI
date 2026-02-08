import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { options } from "../utils/constant"
import { addUpcomingMovies } from "../utils/moviesSlice"

const useUpcomingMovies = () => {
  const dispatch = useDispatch()
const upcomingMoviesData = useSelector((store) => store.movies.upcomingMovies)
  useEffect(() => {
    const getUpcomingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      )
      const json = await data.json()
      dispatch(addUpcomingMovies(json.results))
    }
    getUpcomingMovies() && !upcomingMoviesData
  }, [])
}

export default useUpcomingMovies
