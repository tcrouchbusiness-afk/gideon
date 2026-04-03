import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { GridOverlay } from './components/GridOverlay'
import { SplashScreen } from './components/SplashScreen'
import Home from './pages/Home'
import Capabilities from './pages/Capabilities'
import Solutions from './pages/Solutions'
import About from './pages/About'

function ScrollHandler() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      // Delay to allow page render
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [location.pathname, location.hash])

  return null
}

function AppContent() {
  return (
    <>
      <GridOverlay />
      <ScrollHandler />
      <Nav />
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(() => {
    return !!sessionStorage.getItem('gd-splash-shown')
  })

  return (
    <BrowserRouter>
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>
      {splashDone && <AppContent />}
    </BrowserRouter>
  )
}
