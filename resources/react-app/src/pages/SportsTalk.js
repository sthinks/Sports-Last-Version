import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SportsTalkCard from '../components/sportsTalk/sportsCard/SportsTalkCard'
import '../components/sportsTalk/SportsTalk.css'
import allService from '../service/services.js'
import { useService } from '../service/useService.js'
import Loading from '../components/loading/Loading'

function SportsTalk() {
  const [total, setTotal] = useState()
  const [pagination, setPagination] = useState(1)
  const { data, isLoading, refetch } = useService('talks?page=', () =>
    allService.fetchTalking(pagination),
  )
  useEffect(() => {
    refetch()
  }, [pagination])

  const paginationHandler = (item) => {
    setPagination(item)
    document.body.scroll({
      top: 50,
      left: 0,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    const totalData = data?.total
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalData / 9); i++) {
      pageNumbers.push(i)
    }
    setTotal(pageNumbers)
  }, [data])

  if (isLoading) {
    return <Loading />
  }
  return (
    !isLoading && (
      <div className="sports-talk-container mt-5">
        <div className="sports-talk-content">
          <div className="container">
            <div className="row">
              {data?.data.map((item) => (
                <SportsTalkCard item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="containers-pagination">
          <ul className="pagination-list mt-4">
            {total?.map((item) => (
              <li className="page-item">
                <Link
                  className={
                    pagination === item ? 'page-link-active' : 'page-link'
                  }
                  onClick={() => paginationHandler(item)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  )
}

export default SportsTalk
