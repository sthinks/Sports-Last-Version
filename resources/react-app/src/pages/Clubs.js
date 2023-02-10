import React from 'react'
import CallToAction from '../components/calltoaction/CallToAction'
import { ClubsCard } from '../components/clubs/ClubsCard'
import Banner from '../components/banner/Banner'
import bannerImg from '../assets/images/banner/services.png'
export const Clubs = () => {
  return (
    <div>
      <ClubsCard />
      <CallToAction menu={false} />
    </div>
  )
}
