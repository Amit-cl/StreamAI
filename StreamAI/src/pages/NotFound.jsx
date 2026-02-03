import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold mb-6">Lost your way?</h1>
      <p className="text-gray-400 max-w-xl mb-8">
        Sorry, we can't find that page. You'll find lots to explore on the home page.
      </p>
      <button
        onClick={() => navigate("/home")}
        className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200"
      >
        Go to Home
      </button>
    </div>
  )
}

export default NotFound
