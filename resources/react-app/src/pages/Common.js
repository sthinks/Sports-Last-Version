import React from 'react'
import { useService } from '../service/useService'
import allService from '../service/services'
import { useParams } from 'react-router'
import Loading from '../components/loading/Loading'
import Banner from '../components/banner/Banner'
function Common() {
  const slug = useParams()

  const { data, isLoading, refetch } = useService(`page${slug}`, () =>
    allService.fetchPagesId(slug.slug),
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    !isLoading && (
      <div>
        <Banner image={data?.image} bread={data?.title} />
        <div className="container ">
          <div
            style={{ overflow: 'auto' }}
            className="mb-5"
            dangerouslySetInnerHTML={{ __html: data?.body }}
          />
        </div>
      </div>
    )
  )
}

export default Common
