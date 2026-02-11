import { useEffect } from "react"
import { options } from "../utils/constant"
import { addNowPlayingMovies } from "../utils/moviesSlice"
import { useDispatch, useSelector } from "react-redux"


const useNowPlayingMovies = () => {
  const dispatch = useDispatch()


   const nowPlayingData = useSelector((store) => store.movies.nowPlayingMovies)

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      options
    )
    const json = await data.json()
    dispatch(addNowPlayingMovies(json.results))
  }

  useEffect(() => {
   !nowPlayingData&& getNowPlayingMovies()
  }, [])
}

export default useNowPlayingMovies;