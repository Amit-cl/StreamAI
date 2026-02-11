import React, { useRef } from 'react'
import openai from '../utils/OpenAI'
import client from '../utils/OpenAI'
import { options } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addGptMovieResult } from '../utils/gptSlice'

import lang from '../utils/languageConstants'

const GptSearchBar = () => {
  const searchText = useRef(null)
  const dispatch = useDispatch()

  const langKey= useSelector((store)=>store.config.lang)

  const searchMovieTmdb = async (movie) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
      options,
    )
    const json = await res.json()
    return json.results
  }

  const handleGptSearchClick = async () => {
    if (!searchText.current?.value) return

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query : " +
      "${searchText.current.value}".
    If Indian → All Indian 
    If Foreign → All Foreign 
    if not defined,mix 2-3 ind and 2-3 foreign Same genre.
     Output only names, comma separated ,mixed.`

    const response = await client.responses.create({
      model: 'openai/gpt-oss-20b',
      input: gptQuery,
    })
    // console.log(response.output_text)
    // if (!gptMovie) {
    //   //error handing
    // }
    // const gptMovie = response.output_text?.split(',')||[]
    const gptMovie = response.output_text?.split(',') || []
    // dispatch(addGptMovieResult({movie:gptMovie})
    const promiseArray = gptMovie.map((movie) => {
      return searchMovieTmdb(movie)
    })
    const tmbdResults = await Promise.all(promiseArray)
    dispatch(
      addGptMovieResult({ movieNames: gptMovie, movieResults: tmbdResults }),
    )
  }

 
return (
  <div
    className="
      pt-28 sm:pt-32 md:pt-24
      px-4 sm:px-6 md:px-0
      flex justify-center relative z-20
    "
  >
    <form
      className="
        w-full md:w-1/2 bg-black grid grid-cols-12
        md:rounded-none rounded-xl overflow-hidden
      "
      onSubmit={(e) => e.preventDefault()}
    >
     <input
  ref={searchText}
  type="text"
  className="
    col-span-9
    h-12
    p-4 m-0 sm:m-1 md:m-4
    text-black bg-white
    text-base sm:text-lg md:text-xl
    placeholder-gray-600
    outline-none focus:ring-2 focus:ring-red-600/50 md:focus:ring-0
  "
  placeholder={lang[langKey].gptSearchPlaceholder}
/>
<button
  type="button"
  className="
    col-span-3
    h-12
    m-0 sm:m-1 md:m-4
    py-3 sm:py-3.5 md:py-2 px-4 sm:px-5 md:px-4
    bg-red-700 hover:bg-red-600 text-white
    text-base sm:text-lg md:text-base
    rounded-lg
    font-medium
  "
  onClick={handleGptSearchClick}
>
  {lang[langKey].search}
</button>

    </form>
  </div>
)}

export default GptSearchBar
