import React, { Suspense, useEffect, useState } from 'react'
import CallToAction from '../components/calltoaction/CallToAction'
import { ClubsCard } from '../components/clubs/ClubsCard'
import { TripleCard } from '../components/home/TripleCard'
import { VideoPlayer } from '../components/home/VideoPlayer'
import { CustomSlider } from '../components/slider/CustomSlider'
import SliderItem from '../assets/images/slide/slide1.png'
import '../components/home/home.css'
import Schedule from '../components/schedule/Schedule'
import { useService } from '../service/useService.js'
import allService from '../service/services.js'

export const Home = () => {
  const [form, setForm] = useState(false)
  const { data, isLoading, refetch } = useService('get-slider', () =>
    allService.fetchHomeSlider(),
  )

  return (
    <>
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
