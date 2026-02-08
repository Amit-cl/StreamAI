import React from 'react'
import Header from '../components/Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies copy'
import MainCointainer from '../components/MainCointainer'
import SecondaryContainer from '../components/SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import GptSearch from './GptSearch'
import { useSelector } from 'react-redux'

const Home = () => {
  useNowPlayingMovies()
  usePopularMovies()
  useTopRatedMovies()
  useUpcomingMovies()

  const toggle = useSelector((store) => store.gpt.showGptSearch)
  return (
    <div>
      <Header />
      {toggle ? (
        <GptSearch />
      ) : (
        <>
          <MainCointainer />
           <SecondaryContainer />
        </>
      )}
    </div>
  )
}

export default Home
