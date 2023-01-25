import React from 'react'
import Banner from '../components/banner/Banner'
import CallToAction from '../components/calltoaction/CallToAction'
import { ClubsCard } from '../components/clubs/ClubsCard'
import bannerImg from '../assets/images/banner/brief-intro.png'

export const Clubs = () => {
  return (
    <div>
      <Banner
        image={bannerImg}
        title="Kulüplerimiz"
        space={true}
        bread="Kulüplerimiz"
      />
      <ClubsCard />
      <CallToAction menu={false} />
    </div>
  )
}
