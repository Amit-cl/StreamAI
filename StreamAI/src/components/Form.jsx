import React, { useState } from 'react'
import validate from '../utility/validate'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { auth, provider } from "../utility/firebase"
import { useNavigate } from 'react-router-dom'

const Form = () => {
  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false)
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    pass: ""
  })
  const [errors, setErrors] = useState("")

  const handleFormChange = () => {
    setIsSignUp(!isSignUp)
    setUserInfo({ userName: "", email: "", pass: "" })
    setErrors("")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignIn = async () => {
    const validationError = validate(userInfo)
    if (validationError) return setErrors(validationError)

    try {
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
      navigate("/home")
    } catch (error) {
      setErrors(error.code + " - " + error.message)
    }
  }

  const handleSignUp = async () => {
    if (!userInfo.userName) return setErrors("Please enter your user name")

    const validationError = validate(userInfo)
    if (validationError) return setErrors(validationError)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass)

      // Set display name after signup
      await updateProfile(userCredential.user, {
        displayName: userInfo.userName
      })

      navigate("/home")
    } catch (error) {
      setErrors(error.code + " - " + error.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate("/home")
    } catch (error) {
      setErrors(error.code + " - " + error.message)
    }
  }

  return (
    <>
      <div className='fixed inset-0 -z-10'>
        <img
          className='h-full w-full object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/6d631aa6-567d-46ef-a644-b5b00e4334d2/web/IN-en-20251215-TRIFECTA-perspective_f1cab02a-e42b-4913-a7d9-c5fe0f94f68d_large.jpg"
          alt='background'
        />
      </div>

      <form className='bg-black/75 p-6 sm:p-8 md:p-10 lg:p-12 text-white absolute w-[90%] sm:w-[70%] md:w-[45%] lg:w-3/12 mt-24 sm:mt-32 md:mt-36 right-0 left-0 m-auto rounded-lg'>

        <h1 className='font-bold text-3xl py-4'>{isSignUp ? "Sign Up" : "Sign In"}</h1>

        {isSignUp && (
          <input
            type='text'
            name="userName"
            placeholder='User name'
            value={userInfo.userName}
            className='p-2 my-2 bg-[#131110] w-full'
            onChange={handleChange}
          />
        )}

        <input
          type='text'
          name="email"
          placeholder='Email'
          className='p-2 my-2 bg-[#131110] w-full'
          value={userInfo.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder='Password'
          name="pass"
          className='p-2 my-2 bg-[#131110] w-full'
          value={userInfo.pass}
          onChange={handleChange}
        />

        {errors && <p className='text-[#E50914] p-2 text-sm'>{errors}</p>}

        {isSignUp ? (
          <button type="button" className='bg-[#E50914] w-full p-2 my-4 rounded-lg font-bold' onClick={handleSignUp}>
            Sign Up
          </button>
        ) : (
          <button type="button" className='bg-[#E50914] w-full p-2 my-4 rounded-lg font-bold' onClick={handleSignIn}>
            Sign In
          </button>
        )}

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className='bg-white text-black w-full p-2 rounded-lg font-semibold mt-2 hover:bg-gray-200'
        >
          Sign in with Google
        </button>

        <button type="button" className='text-gray-400 mt-4 text-sm' onClick={handleFormChange}>
          {isSignUp
            ? <>Already have an account? <span className='text-white'>Sign In</span></>
            : <>New to StreamAi? <span className='text-white'>Sign up now</span></>}
        </button>

      </form>
    </>
  )
}

export default Form
