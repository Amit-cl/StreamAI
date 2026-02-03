import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../utility/firebase"
import StreamAiLogo from "../assets/icons/streamAiLogo.svg?react"

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png"

const Header = () => {
  const { user } = useSelector((store) => store.user)
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const isLoginPage = location.pathname === "/"

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSignOut = async () => {
    await signOut(auth)
    setOpen(false)
  }

  return (
    <div className="absolute px-4 sm:px-8 py-2 bg-linear-to-b from-black w-full z-10 flex items-center justify-between">
      <StreamAiLogo className="w-32 sm:w-44" />

      {/* Hide auth controls on Login page */}
      {!isLoginPage && user && (
        <div className="relative" ref={menuRef}>
          <img
            src={user.photo || DEFAULT_AVATAR}
            alt="profile"
            onClick={() => setOpen((prev) => !prev)}
            className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"
          />

          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 text-sm">
              <p className="px-4 py-2 text-gray-700 font-medium border-b">
                {user.name || "User"}
              </p>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
