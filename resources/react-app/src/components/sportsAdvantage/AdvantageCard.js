import React from 'react'
import Image from "../../assets/images/82.jpg"
import "./advantageCard.css"
import LocationIcon from "../../assets/images/location.png"

const AdvantageCard = ({ item }) => {
    return (
        <div className='col-12'>
            <div className='advantage-card'>
                <div className='advantage-card_image'>
                    <img src={Image} />
                    <div className='advantage-discount'>
                        <span>{item.discount}</span>
                    </div>
                </div>
                <div className='advantage-bottom_container'>
                    <div className='advantage-title'>
                        <h5>{item.title}</h5>
                        <div className="advantage-location_container">
                            <img src={LocationIcon} />
                            <p className='advantage-location'>{item.location}</p>
                        </div>
                    </div>

                    <div className='advantage-address'>
                        <p>{item.address}</p>
                        <p>*{item.validityDate}</p>
                    </div>
                    <span>{item.phone}</span>
                </div>
            </div>
        </div>
    )
}

export default AdvantageCard