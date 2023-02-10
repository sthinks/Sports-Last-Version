import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/header/Header'
import Events from '../pages/Events'
import Contact from '../pages/Contact'
import { Home } from '../pages/Home'
import { Footer } from '../components/footer/Footer'
import VizionMission from '../pages/VizionMission'
import { BriefIntro } from '../pages/BriefIntro'
import { Services } from '../pages/Services'
import Founder from '../pages/Founder'
import GMmessage from '../pages/GMmessage'
import SportsTalk from '../pages/SportsTalk'
import SportsTalkDetail from '../pages/SportsTalkDetail'
import { Clubs } from '../pages/Clubs'
import { ClubsDetail } from '../pages/ClubsDetail'
import { FiChevronUp } from 'react-icons/fi'
import '../components/ScrollToTop/scrollTop.css'
import CallToAction from '../components/calltoaction/CallToAction'
import NotFound from '../components/notfound/NotFound'
import Common from '../pages/Common'

function Rotate() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(false)

  const scrollToTop = () => {
    document.body.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    document.body.addEventListener('scroll', (e) => {
      if (e.srcElement.scrollTop > 500) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    })
  }, [])

  return (
    <>
      <Header form={form} setForm={setForm} />
      {form ? (
        <div className="slide-form-container">
          <CallToAction menu={true} form={form} setForm={setForm} />
        </div>
      ) : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kisaca-biz" element={<BriefIntro />} />
        <Route path="/kuluplerimiz" element={<Clubs />} />
        <Route path="/kuluplerimiz/:slug" element={<ClubsDetail />} />
        <Route path="/hizmetlerimiz" element={<Services />} />
        <Route path="/etkinlikler" element={<Events />} />
        <Route path="/iletisim" element={<Contact />} />
        <Route path="/vizyon-misyon" element={<VizionMission />} />
        <Route path="/kurucumuz" element={<Founder />} />
        <Route path="/genel-mudur-mesaji" element={<GMmessage />} />
        <Route path="/sportslu-anlatiyor" element={<SportsTalk />} />
        <Route path="/kurumsal/:slug" element={<Common />} />
        <Route
          path="/sportslu-anlatiyor/:slug"
          element={<SportsTalkDetail />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {visible && (
        <div className="scroll-top-button" onClick={() => scrollToTop()}>
          <FiChevronUp className="scroll-top-icon" />
        </div>
      )}

      <Footer />
    </>
  )
}

export default Rotate
