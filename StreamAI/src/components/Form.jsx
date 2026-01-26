import React, { useState } from 'react'
import validate from '../utility/validate'
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../utility/firebase"

const Form = () => {
  const [isSignUp , setIsSignUp] = useState(false)
  const [userInfo , setuserInfo] = useState({
    userName :"",
    email : "" ,
    pass : ""
  })
  const [errors , setErrors] = useState('')
  const handleFormChange = () => {
    setIsSignUp ( !isSignUp)
    setuserInfo({
      userName : "" ,
      email : "" ,
      pass : ""
    })
    setErrors("")
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
  }
  const handleChange = (e) =>{
    const { name , value} = e.target
    setuserInfo((pre)=>({...pre,[name]:value}))
  }
  const handleSignIn = () =>{
    setErrors(validate(userInfo))
    if(errors)return;
    signInWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrors(errorCode+" - "+ errorMessage)
  });
  }
  const handleSignUp = () => {
    if(!userInfo.userName){
      setErrors("Please enter your user name")
    }else {
       setErrors(validate(userInfo))
    }
    if(errors)return 
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrors(errorCode + " - " + errorMessage)
    // ..
  })
   
  }
  return (
    <>
    <div className='fixed inset-0 -z-10'>
      <img
       className='h-full w-full object-cover'
      src = "https://assets.nflxext.com/ffe/siteui/vlv3/6d631aa6-567d-46ef-a644-b5b00e4334d2/web/IN-en-20251215-TRIFECTA-perspective_f1cab02a-e42b-4913-a7d9-c5fe0f94f68d_large.jpg"
      alt = 'body image'
      />
    </div>
    <form className='
    bg-black/75
    p-6 sm:p-8 md:p-10 lg:p-12
    text-white
    absolute
    w-[90%] sm:w-[70%] md:w-[45%] lg:w-3/12
    mt-24 sm:mt-32 md:mt-36
    right-0 left-0 m-auto
    rounded-lg
  '
    onSubmit={handleSubmit}
    >
      <h1 className='font-bold text-3xl py-4'>{ isSignUp ? "Sign Up" : "Sign In" }</h1>
      { isSignUp && <input 
      type='text'
      name="userName"
      placeholder='User name'
      value = {userInfo.userName}
      className='p-2 my-2 bg-[#131110] w-full text-sm sm:text-base'
      onChange={handleChange}
      />}
      <input 
      type='text'
      name="email"
      placeholder='Email or mobile number'
      className='p-2 my-2 bg-[#131110] w-full text-sm sm:text-base'
      value={userInfo.email}
      onChange={handleChange}
      />
      <input 
      type="password"
      placeholder='Password'
      name="pass"
     className='p-2 my-2 bg-[#131110] w-full text-sm sm:text-base'
      value={userInfo.pass}
      onChange={handleChange}
      />
      {errors&&<p className='text-[#E50914] p-2 text-sm'>{errors}</p>}
      {isSignUp ?
      <button 
      className='bg-[#E50914] w-full p-2 my-4 rounded-lg font-bold text-sm sm:text-base'
      onClick={handleSignUp}>
        Sign Up 
      </button> : 
      <button 
      className='bg-[#E50914] w-full p-2 my-4 rounded-lg font-bold text-sm sm:text-base'
      onClick={handleSignIn}>
        Sign In 
      </button>}
      <button className='text-gray-400 text-sm sm:text-base mt-2' onClick={handleFormChange}>
        { isSignUp ?  <p>Already Sign Up ? <span className='text-white'> Sign In now</span>
        </p> : <p>New to SteamAi ? <span className='text-white'> Sign up now</span> </p> }
      </button>

    </form>
    </>
  )
}

export default Form