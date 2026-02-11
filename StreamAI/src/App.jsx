import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
// import Header from './components/Header'
import appStore from './utils/appStore'
import { Provider } from 'react-redux'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/home',
      element: <Home />,
    },
  ])

  return (
    <>
      <Provider  store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
