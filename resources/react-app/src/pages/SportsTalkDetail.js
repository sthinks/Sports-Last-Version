import React from 'react'
import runimg from '../assets/images/sportsTalkDetail/run.png'
import Banner from '../components/banner/Banner'
import '../components/sportsTalkDetail/sportsTalkDetail.css'
import BannerImage from '../assets/images/banner/brief-intro.png'
import { useParams, useLocation } from 'react-router-dom'
import allService from '../service/services.js'
import { useService } from '../service/useService.js'
import Loading from '../components/loading/Loading'
function SportsTalkDetail({ navigation }) {
  const slug = useParams()
  const { data, isLoading, refetch } = useService(
    `getbyidtalking/${slug.slug}`,
    () => allService.getByTalks(slug.slug),
  )
  const location = useLocation()
  const locationPath = location.pathname.split('/')

  if (isLoading) {
    return <Loading />
  }
  return (
    !isLoading && (
      <div>
        <div className="sports-talk-detail-container">
          <div className="container">
            <div className="row justify-content-center">
              <div className="sports-talk-detail-content">
                <div className="col-lg-4 col-md-5">
                  <img className="sports-detail-img" src={data.image} alt="" />
                </div>
                <div className="sports-detail-content-text col-lg-8 col-md-7">
                  <h1>{data.title}</h1>
                  <p
                    className="mt-3"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default SportsTalkDetail
