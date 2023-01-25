import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useService } from '../../service/useService'
import allService from '../../service/services'
import './clubs-card.css'
import Loading from '../loading/Loading'

export const ClubsCard = () => {
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

  return (
    !isLoading && (
      <div className="cards-container">
        <div className="container">
          <div className="cards-list">
            {data?.map((card) => (
              <Link
                key={card.id}
                to={`/kuluplerimiz/${card.slug}`}
                onClick={() => scrollToTop()}
              >
                <div className="home-card">
                  <img
                    src={card.image}
                    alt="Külüp etkinlik resim"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  )
}
