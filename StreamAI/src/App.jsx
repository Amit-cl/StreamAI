import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"

import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import { auth } from './utility/firebase'
import { addUser, removeUser, setLoading } from './utility/userSlice'

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  { path: "*", element: <NotFound /> }
])

function App() {
  const dispatch = useDispatch()
  const loading = useSelector(store => store.user.loading)

  useEffect(() => {
    dispatch(setLoading(true))

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }))
      } else {
        dispatch(removeUser())
      }
    })

    return unsubscribe
  }, [dispatch])

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white text-xl">
        Loading...
      </div>
    )
  }

  return <RouterProvider router={router} />
}

export default App
