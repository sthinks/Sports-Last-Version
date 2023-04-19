import React, { useState } from 'react'
import CallToAction from '../components/calltoaction/CallToAction'
import { ClubsCard } from '../components/clubs/ClubsCard'
import { TripleCard } from '../components/home/TripleCard'
import { CustomSlider } from '../components/slider/CustomSlider'
import '../components/home/home.css'
import Schedule from '../components/schedule/Schedule'
import { useService } from '../service/useService.js'
import allService from '../service/services.js'
import { Helmet } from 'react-helmet'
export const Home = () => {
  const [form, setForm] = useState(false)
  const { data, isLoading, refetch } = useService('get-slider', () =>
    allService.fetchHomeSlider(),
  )

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sports İnternational</title>
        <link rel="canonical" href="/" />
        <meta name="description" content="Sports International" />
        <meta name="description" content="Spor salonu" />
        <meta name="description" content="Fitness" />
        <meta name="description" content="Antrenman programı" />
        <meta name="description" content="Pilates" />
        <meta name="description" content="Spinning" />
        <meta name="description" content="Zumba" />
        <meta name="description" content="Yoga" />
        <meta name="description" content="SPA" />
        <meta name="description" content="Personel Trainer" />
        <meta name="description" content="Aerobik" />
        <meta name="description" content="Aralıklı Oruç" />
        <meta name="description" content="İdeal Kilo" />
        <meta name="description" content="Sporcu Beslenmesi" />
      </Helmet>
      <CustomSlider image={data?.data} setMenu={setForm} menu={form} />
      {form ? (
        <div className="slide-form-container">
          <CallToAction menu={true} form={form} setForm={setForm} />
        </div>
      ) : null}
      <ClubsCard />
      <Schedule marginB={false} />
      <TripleCard />
      {/* <VideoPlayer /> */}
      <CallToAction menu={false} />
    </>
  )
}
