import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home  from './pages/home'
import Signupfrom from './auth/froms/Signupfrom'
import SignInfrom from './auth/froms/SignInfrom'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import NewsArtical from './pages/NewsArtical'
import Header from './components/ui/shared/Header'
function App() {
  return (
    <div>
        <BrowserRouter>
        <Header/>
        <Routes>
        <Route path="/sign-in" element={<SignInfrom />} />
        <Route path="/sign-up" element={<Signupfrom />} />
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsArtical />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </BrowserRouter>





    </div>
  )
}

export default App