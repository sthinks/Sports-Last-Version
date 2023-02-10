import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useService } from '../../service/useService'
import allService from '../../service/services'
import Loading from '../loading/Loading'
import './club-card-event.css'
import middleImage from '../../assets/images/events/bize-sportslu-derler.jpg'
import sportsComp from '../../assets/images/events/sports-kampanyalari.jpg'

export const ClubsCardEvent = ({ setFiltered, setClubs }) => {
  const { data, isLoading, refetch } = useService('getclubs', () =>
    allService.fetchClubs(),
  )
  if (isLoading) {
    return <Loading />
  }

  const scrollToTop = () => {
    document.body.scroll({
      top: 0,
      left: 0,
    })
  }
  console.log(data)

  return (
    !isLoading && (
      <div className="cards-container">
        <div className="container">
          <div className="cards-list">
            {data &&
              data.slice(0, 4).map((item, i) => {
                return (
                  item.events.length > 0 && (
                    <a key={i} href="#events" onClick={() => setFiltered(item)}>
                      <div className="home-card">
                        <img
                          src={item.club_image_for_event}
                          alt="Külüp etkinlik resim"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </a>
                  )
                )
              })}

            <a href="#events">
              <div className="home-card">
                <img
                  src={middleImage}
                  alt="Külüp etkinlik resim"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </a>

            {data &&
              data.slice(4).map((item, i) => {
                return (
                  item.events.length > 0 && (
                    <a key={i} href="#events" onClick={() => setFiltered(item)}>
                      <div className="home-card">
                        <img
                          src={item.club_image_for_event}
                          alt="Külüp etkinlik resim"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </a>
                  )
                )
              })}
          </div>
        </div>
      </div>
    )
  )
}
