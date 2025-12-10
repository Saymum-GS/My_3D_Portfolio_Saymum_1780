import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'

import AboutSection from './components/AboutSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/header.jsx'
import HeroSection from './components/HeroSection.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import CVModal from "./components/CVModal.jsx";
import HighlightsSection from "./components/HighlightsSection";


export default function App() {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  const openContactForm = () => setContactFormOpen(true)
  const closeContactForm = () => setContactFormOpen(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <Header
        contactFormOpen={contactFormOpen}
        openContactForm={openContactForm}
        closeContactForm={closeContactForm}
      />
      <HeroSection />
      <CustomCursor />
      <AboutSection />
      <ProjectsSection/>
      <HighlightsSection />
      <ContactSection openContactForm={openContactForm} />
      <Footer/>
      <ProgressBar/>
    </>
  )
}
