import React from 'react'
import GptMovieSuggestions from '../components/GptMovieSuggestions'
import GptSearchBar from '../components/GptSearchBar'
import { BG_URL } from '../utils/constant'

const GptSearch = () => {
  return (
   <div className="relative min-h-screen">

  <div className="fixed inset-0 -z-10">
    <img
      src={BG_URL}
      className="w-full h-full object-cover brightness-[0.35] md:brightness-[0.4]"
      alt="background"
    />
  </div>

  <div className="relative bg-black/50 md:bg-black/60 min-h-screen">
    <GptSearchBar />
    <GptMovieSuggestions />
  </div>
</div>
  )
}

export default GptSearch
