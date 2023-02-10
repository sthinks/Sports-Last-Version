import React, { useEffect } from 'react'
import Slider from 'react-slick'
import './slider.css'

export const CustomSlider = ({ image, setMenu }) => {
  var settings = {
    arrow: false,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  }

  return (
    <Slider {...settings} className="slider-container">
      {image?.map((item) => (
        <div className="slider-item">
          <img src={item.image} alt="" />
          {item.title && (
            <div className="slider-text">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              {/* <p dangerouslySetInnerHTML={{ __html: item.exp }} /> */}
              {item.title && (
                <button onClick={() => setMenu(true)}>SPORTS'LU OL!</button>
              )}
            </div>
          )}
        </div>
      ))}
    </Slider>
  )
}
