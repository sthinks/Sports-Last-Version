import React from 'react'
import arrow from '../../../assets/images/clubsdetail/arrow.png'
import './sportsTalkCard.css'
import { Link } from 'react-router-dom'
function SportsTalkCard({ item }) {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <Link to={`${item.slug}`}>
        <div className="sporstTalk-card">
          <img src={item.image} alt="" />
          <div className="sportsTalk-card-text">
            <img src={arrow} />
            <p>{item.title}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SportsTalkCard
