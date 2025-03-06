import React, { useEffect, useState } from 'react'
import { Header, Footer } from './Components'
import { useDispatch } from 'react-redux'
import authService from "./AppWrite/auth.js"
import { login, logout } from './store/authSlice.js'
import { Outlet } from 'react-router-dom'

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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-green-800 text-xl">Loading...</div>
  }

  return loading ? (
    <div className="flex justify-center items-center min-h-screen text-green-800 text-xl">
      Loading...
    </div>
  ) : (
    <div className="min-h-screen w-full flex flex-col bg-amber-600/25 text-green-800 text-xl">
      <Header />
      <main className="min-h-screen w-full bg-red-900/25">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
