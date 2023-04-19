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
import { Helmet } from 'react-helmet'
import Banner from '../components/banner/Banner'

export const ClubsDetail = () => {
  const [sliderImageArray, setSliderImageArray] = useState([])
  const [haveSlider, setHaveSlider] = useState()
  const slug = useParams()

  const { data, isLoading, refetch } = useService(`club/${slug}`, () =>
    allService.getByClubsId(slug),
  )
  useEffect(() => {
    const clubSliderLength = data?.club_slider_images.length
    setHaveSlider(clubSliderLength)
    if (clubSliderLength === 1) {
      setSliderImageArray(data?.club_slider_images[0].image.split(','))
    } else if (clubSliderLength === undefined) {
      setHaveSlider(0)
    }
    refetch()
  }, [data])

  let x =
    haveSlider === 1
      ? data?.club_slider_images[0].image.split(',').length
      : null

  var settings = {
    arrow: false,
    dots: false,
    infinite: true,
    autoplaySpeed: 1000,
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

  return (
    !isLoading && (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data?.title}</title>
          <link rel="canonical" href={`/kuluplerimiz/${data?.slug}`} />
          <meta name="description" content={data?.title} />
        </Helmet>
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
            {haveSlider === 1 && (
              <Slider {...settings}>
                {sliderImageArray?.map((image, i) => (
                  <div key={i} className="clubs-detail_item">
                    <img src={image} alt="" />
                  </div>
                ))}
              </Slider>
            )}
          </div>

          <div className="clubs-detail_card-container">
            <a
              className="clubs-detail_card"
              href="/sportslu-anlatiyor"
              style={{ cursor: 'pointer' }}
            >
              <img
                src={Sports}
                style={{ width: '100%', height: 'auto' }}
                alt=""
              />
              <div className="clubs-detail_card-icons">
                <img
                  src={SportsIcon}
                  className="clubs-detail_card-icon"
                  alt=""
                />
                <img src={SportsArrow} alt="" />
              </div>
            </a>
            <a
              className="clubs-detail_card"
              href="/etkinlikler"
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
            </a>
          </div>

          <Schedule marginB={true} />

          <CallToAction menu={false} />
        </div>
      </>
    )
  )
}
