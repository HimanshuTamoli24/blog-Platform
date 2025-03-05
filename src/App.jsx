import React, { useEffect, useState } from 'react'
import { Header, Footer } from './Components'
import { useDispatch } from 'react-redux'
import authService from "./AppWrite/auth.js"
import { login, logout } from './store/authSlice.js'
import { Outlet } from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState("1")
  const dispatch = useDispatch({})
  useEffect(() => {
    authService.getUserDetails()
      .then((userData) => {
        if (userData) {
          // dispatch(login({userData}))
        } else {
          // dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  })

  return (
    loading ? <>
      <div className=' min-h-screen w-full text-green-800 text-9xl'>
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div></> : <><h1>logout</h1></>
  )
}

export default App