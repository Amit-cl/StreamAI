import React, { useEffect } from 'react'
import StreamAiLogo from '../assets/icons/streamAiLogo.svg?react'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { toggleGptSearchView } from '../utils/gptSlice'
import { SUPPORTED_LANGUAGES } from '../utils/constant'
import { changeLanguage } from '../utils/configSlice'

const Header = () => {
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleToggle = () => {
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChanges = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value))
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        navigate('/Error')
      })
  }

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        )
        navigate('/Home')
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    })
    // unsubscribed on the component unmount
    return () => unsubscibe()
  }, [])

 return (
  <header
    className="
      fixed top-0 left-0 right-0 z-50
      bg-linear-to-b from-black via-black/80 to-transparent
      px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4
    "
  >
    <div className="flex items-center justify-between max-w-7xl mx-auto">

      {/* Logo */}
      <div className="shrink-0 w-28 sm:w-32 md:w-36 lg:w-44">
        <StreamAiLogo className="w-full h-auto" />
      </div>

      {user && (
        <div className="
          flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6
          flex-nowrap
        ">
          
          {showGptSearch && (
            <select
              onChange={handleLanguageChanges}
              className="
                bg-black/70 text-white text-xs sm:text-sm
                px-2.5 py-1.5 rounded-lg border border-gray-600/50
                outline-none hidden xs:block
              "
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleToggle}
            className="
              bg-white/90 hover:bg-white text-black font-medium
              text-xs sm:text-sm md:text-base
              px-3 py-1.5 sm:px-4 sm:py-2
              rounded-lg whitespace-nowrap shrink-0
            "
          >
            {showGptSearch ? 'Homepage' : 'GPT Search'}
          </button>

          {/* Avatar - smaller on mobile, optional hide: hidden sm:block */}
          <img
            className="
              w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11
              rounded-full object-cover shrink-0
              /* hidden sm:block */   {/* uncomment if you want avatar hidden on mobile */}
            "
            src={user.photoURL}
            alt="usericon"
          />

          <button
            onClick={handleSignOut}
            className="
              text-white font-medium text-sm sm:text-base
              hover:text-gray-300 whitespace-nowrap shrink-0
              px-1 sm:px-2
            "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  </header>
)
}

export default Header
