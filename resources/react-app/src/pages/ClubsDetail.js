import React, { useEffect, useState, Suspense } from 'react'
import Slider from 'react-slick'
import CallToAction from '../components/calltoaction/CallToAction'
import Sports from '../assets/images/clubsdetail/sports-tell.png'
import SportsIcon from '../assets/images/clubsdetail/sports-tell-icon.png'
import SportsArrow from '../assets/images/clubsdetail/arrow.png'
import Card2Bg from '../assets/images/clubsdetail/card-2-bg.png'
import SlideIcon from '../assets/images/clubsdetail/slide-icon.png'
import Card2Icon from '../assets/images/home/triple-first-icon.png'
import '../components/clubsDetail/clubs-detail.css'
import Schedule from '../components/schedule/Schedule'
import { useParams } from 'react-router-dom'
import { useService } from '../service/useService.js'
import allService from '../service/services.js'
import Loading from '../components/loading/Loading'
import { useNavigate } from 'react-router-dom'
import Banner from '../components/banner/Banner'
export const ClubsDetail = () => {
  const navigate = useNavigate()
  const [sliderImageArray, setSliderImageArray] = useState([])
  const slug = useParams()

  const { data, isLoading, refetch } = useService(`club/${slug}`, () =>
    allService.getByClubsId(slug),
  )
  useEffect(() => {
    setSliderImageArray(data?.club_slider_images[0].image.split(','))
  }, [data])
  const x = data?.club_slider_images[0].image.split(',').length // undefined
  var settings = {
    arrow: false,
    dots: false,
    infinite: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    autoplay: true,
    slidesToShow: x ? (x <= 5 ? x - 1 : 5) : 0,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (isLoading) {
    return <Loading />
  }
  const goNavigate = (slug) => {
    document.body.scroll({
      top: 0,
      left: 0,
    })
    navigate(slug)
  }
  return (
    !isLoading && (
      <div>
        <Banner image={data.image_banner} noBread={true} />
        <div className="clubs-detail_text-container">
          <div className="container">
            <div className="clubs-detail_text">
              <p
                style={{ textAlign: 'justify' }}
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>
        </div>

        <div className="clubs-detail_carousel">
          <div className="slide-icon">
            <img
              src={SlideIcon}
              alt=""
              style={{ width: '215px', height: 'auto' }}
            />
          </div>

          <Slider {...settings}>
            {sliderImageArray?.map((image) => (
              <div className="clubs-detail_item">
                <img src={image} alt="" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="clubs-detail_card-container">
          <div
            className="clubs-detail_card"
            onClick={() => goNavigate('/sportslu-anlatiyor')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={Sports}
              style={{ width: '100%', height: 'auto' }}
              alt=""
            />
            <div className="clubs-detail_card-icons">
              <img src={SportsIcon} className="clubs-detail_card-icon" alt="" />
              <img src={SportsArrow} alt="" />
            </div>
          </div>
          <div
            className="clubs-detail_card"
            onClick={() => goNavigate('/etkinlikler')}
            style={{ cursor: 'pointer' }}
          >
            <div className="icons-container">
              <img
                src={Card2Bg}
                style={{ width: '100%', height: 'auto' }}
                alt=""
              />
              <div className="clubs-detail_card-icons">
                <img src={Card2Icon} className="sports-events" alt="" />
              </div>
            </div>
          </div>
        </div>

        <Schedule marginB={true} />

        <CallToAction menu={false} />
      </div>
    )
  )
}
