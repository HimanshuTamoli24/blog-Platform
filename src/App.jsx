import React, { useEffect, useState } from 'react'
import { Header, Footer, Login, Logout, Signup, PostForm, Postcard } from './Components'
import { useDispatch } from 'react-redux'
import authService from "./AppWrite/auth.js"
import { login, logout } from './store/authSlice.js'
import { Outlet } from 'react-router-dom'
import SignUP from './Pages/Signups.jsx'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getUserDetails()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatch])
  return loading ? (
    <div className="flex justify-center items-center min-h-screen text-green-800 text-xl">
      Loading...
    </div>) : (
    <div className="min-h-screen w-full flex flex-col bg-blue-600/25 text-green-800 text-xl">
      <Header />
      <main className="min-h-screen w-full bg-green-900/25">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
