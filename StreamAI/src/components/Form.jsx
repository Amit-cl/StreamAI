import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { USER_AVATAR } from '../utils/constant'

const Form = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
    setErrorMessage(null)
    // email.current.value = ''
    // password.current.value = ''
  }
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message)
    if (message) return

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              )
            })
            .catch((error) => {
              setErrorMessage(error.message)
            })

          // setErrorMessage('You are Registered! Sign in Now')
          // setIsSignInForm(true)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrorMessage(errorCode + ' ' + errorMessage)
        })
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrorMessage(errorCode + ' ' + errorMessage)
        })
    }
  }

 return (
  <div className="relative min-h-screen w-full overflow-x-hidden">
    <Header />

    {/* Background */}
    <div className="absolute inset-0 -z-10">
      <img
        className="w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6d631aa6-567d-46ef-a644-b5b00e4334d2/web/IN-en-20251215-TRIFECTA-perspective_f1cab02a-e42b-4913-a7d9-c5fe0f94f68d_large.jpg"
        alt="body"
      />
    </div>

    {/* Form Wrapper */}
    <div className="flex justify-center pt-20 sm:pt-24">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="
          text-white bg-black/80
          w-full max-w-md
          mx-4
          p-6 sm:p-8
          rounded
        "
      >
        <h1 className="font-bold text-2xl sm:text-3xl py-4">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-3 sm:my-4 bg-gray-700 w-full rounded"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 my-3 sm:my-4 bg-gray-700 w-full rounded"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 my-3 sm:my-4 bg-gray-700 w-full rounded"
        />

        {errorMessage && (
          <p className="text-sm sm:text-base text-red-600 mt-2">
            {errorMessage}
          </p>
        )}

        <button
          className="bg-red-500 w-full p-3 my-5 sm:my-6 rounded hover:bg-red-600"
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        <p
          onClick={toggleSignInForm}
          className="cursor-pointer text-sm text-gray-300 hover:text-white"
        >
          {isSignInForm
            ? 'New to Netflix? Sign Up Now'
            : 'Already a User? Please Sign In'}
        </p>
      </form>
    </div>
  </div>
)

}

export default Form
