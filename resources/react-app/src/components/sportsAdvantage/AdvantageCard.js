import React, { useEffect } from 'react'
import Image from '../../assets/images/82.jpg'
import './advantageCard.css'
import LocationIcon from '../../assets/images/location.png'

const AdvantageCard = ({ item }) => {
  const dateHandler = () => {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const newdate = new Date(item.validity_time)
    return newdate.toLocaleString('tr-TR', options)
  }

  return (
    <div className="col-12">
      <div className="advantage-card">
        <div className="advantage-card_image">
          <img src={item.image_discount} />
          <div className="advantage-discount">
            <span>{item.discount_description}</span>
          </div>
        </div>
        <div className="advantage-bottom_container">
          <div className="advantage-title">
            <h5>{item.name}</h5>
            <div className="advantage-location_container">
              <img src={LocationIcon} />
              <p className="advantage-location">{item.city}</p>
            </div>
          </div>

          <div className="advantage-address">
            <p>{item.address}</p>
            <p style={{ fontSize: '0.8rem' }}>
              *{item.validity_time && dateHandler()} tarihine kadar geçerlidir.
            </p>
          </div>
          <span>{item.phone}</span>
        </div>
      </div>
    </div>
  )
}

export default AdvantageCard
