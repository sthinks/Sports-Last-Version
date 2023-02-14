import React from 'react'
import Image from "../../assets/images/82.jpg"
import "./advantageCard.css"

const AdvantageCard = ({ item }) => {
    return (
        <div className='col-md-4'>
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
                    </div>

                    <span>{item.phone}</span>
                    <span>{item.validityDate}</span>
                    <div className='advantage-address'>
                        <span className=''>{item.address}</span>
                        <span className='advantage-locaton'>{item.location}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdvantageCard