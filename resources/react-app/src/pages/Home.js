import React, { Suspense, useEffect } from 'react'
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
  const { data, isLoading, refetch } = useService('get-slider', () =>
    allService.fetchHomeSlider(),
  )
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <CustomSlider image={data?.data} />
      <ClubsCard />
      <Schedule marginB={false} />
      <TripleCard />
      {/* <VideoPlayer /> */}
      <CallToAction menu={false} />
    </>
  )
}
