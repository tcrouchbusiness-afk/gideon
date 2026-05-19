import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav, { Classification } from './components/Nav'
import Splash from './components/Splash'
import { useMeta } from './hooks/useMeta'
import Home from './pages/Home'
import Programs from './pages/Programs'
import CapabilitiesPage from './pages/Capabilities'
import Mission from './pages/Mission'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppContent() {
  useMeta()
  return (
    <>
      <Classification />
      <Nav />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(
    () => !!sessionStorage.getItem('gd-splash')
  )

  return (
    <BrowserRouter>
      {!splashDone && (
        <Splash onDone={() => {
          sessionStorage.setItem('gd-splash', '1')
          setSplashDone(true)
        }} />
      )}
      {splashDone && <AppContent />}
    </BrowserRouter>
  )
}
