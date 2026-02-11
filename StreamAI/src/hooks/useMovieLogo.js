import { useDispatch, useSelector } from 'react-redux'
import { options } from '../utils/constant'
import { useEffect } from 'react'
import { addMovieLogo } from '../utils/moviesSlice'

const useMovieLogo = (id) => {
  const dispatch = useDispatch()
  const logoData = useSelector((store) => store.movies.movieLogo)

  const getMovieLogo = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' + id + '/images',
      options
    )
    const json = await data.json()

    // ✅ PICK PNG ONLY
    const pngLogo = json.logos?.find(
      (logo) => logo.file_path.endsWith(".png")
    )

    dispatch(addMovieLogo(pngLogo || null))
  }

  useEffect(() => {
    !logoData && id && getMovieLogo()
  }, [id])
}

export default useMovieLogo
