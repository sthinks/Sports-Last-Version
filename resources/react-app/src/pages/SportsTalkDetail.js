import React from 'react'
import '../components/sportsTalkDetail/sportsTalkDetail.css'
import { useParams, useLocation } from 'react-router-dom'
import allService from '../service/services.js'
import { useService } from '../service/useService.js'
import Loading from '../components/loading/Loading'
import { Helmet } from 'react-helmet'
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
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data?.title}</title>
          <link rel="canonical" href={`/sportlu-anlatiyor/${data?.slug}`} />
          <meta name="description" content="Sports İnternational" />
          <meta name="description" content="Sportslu Anlatıyor" />
          <meta name="description" content="Fitness" />
          <meta name="description" content="Pilates" />
          <meta name="description" content="Spinning" />
          <meta name="description" content="Zumba" />
          <meta name="description" content="Sporcu Beslenmesi" />
          <meta name="description" content="Yoga" />
          <meta name="description" content="Aralıklı Oruç" />
          <meta name="description" content="İdeal Kilo" />
        </Helmet>
        <div>
          <div className="sports-talk-detail-container">
            <div className="container">
              <div className="row justify-content-center">
                <div className="sports-talk-detail-content">
                  <div className="col-lg-4 col-md-5">
                    <img
                      className="sports-detail-img"
                      src={data.image}
                      alt=""
                    />
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
      </>
    )
  )
}

export default SportsTalkDetail
