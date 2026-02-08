import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: 'movies',
 initialState: {
  nowPlayingMovies: null,
  popularMovies: null,
  trailerVedio: null,
  movieLogo: null,
  upcomingMovie:null,
  topRatedMovie:null
},

  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload
    },
    addNowPopularMovies: (state, action) => {
      state.popularMovies = action.payload
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovie = action.payload
    },
    addTopRatedMovie: (state, action) => {
      state.topRatedMovie = action.payload
    },
    addNowPlayingTrailer: (state, action) => {
      state.trailerVedio = action.payload
    },
    addMovieLogo: (state, action) => {
      state.movieLogo = action.payload
    },
  },
})

export const {
  addNowPlayingMovies,addUpcomingMovies,
  addNowPlayingTrailer,
    addNowPopularMovies,addTopRatedMovie,
    addMovieLogo,
} = moviesSlice.actions

export default moviesSlice.reducer
