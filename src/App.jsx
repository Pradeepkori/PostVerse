import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className={darkMode ? "dark" : ""}>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400 dark:bg-gray-900 rounded-2xl'>
        <div className='w-full block'>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="container mx-auto px-4 py-4 mt-2 text-12xl rounded-2xl bg-[#7f7f7f] dark:bg-gray-700">
          <h2
            className="
              text-3xl
              font-bold
              text-center
              mt-2
              mb-2
              tracking-wide
              text-white
              transition-all
              duration-300
              hover:text-orange-500
              hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]
              hover:scale-110
              cursor-pointer
            "
          >
            Create • Explore • Inspire
          </h2>
          <Outlet />
          </main>
          <Footer darkMode={darkMode} setDarkMode={setDarkMode}/>
        </div>
      </div>
    </div>
  ) : null
}

export default App