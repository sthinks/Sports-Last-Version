import React, { useEffect, useState } from 'react'
import EventsCard from '../components/events/EventsCard'
import axios from 'axios'
import Banner from '../components/banner/Banner'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import '../components/events/events.css'
import '../components/events/event-card-pagination.css'
import CallToAction from '../components/calltoaction/CallToAction'
import bannerImg from '../assets/images/banner/1903_500.png'
import { TfiClose } from 'react-icons/tfi'
import Modal from 'react-modal'
import { useService } from '../service/useService.js'
import allService from '../service/services'
import Loading from '../components/loading/Loading'

function Events() {
  let subtitle
  const [total, setTotal] = useState()
  const [pagination, setPagination] = useState(1)
  const [filtered, setFiltered] = useState([])
  const [allData, setAllData] = useState()
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [show, setshow] = useState(false)
  const [uniqClubs, setUniqClub] = useState()
  const customStyles = {
    content: {
      backgroundImage: 'none',
      padding: '0px',
      border: 'none',
    },
  }

  const { data, isLoading, refetch } = useService(`events?page=`, () =>
    allService.fetchEvents(pagination),
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

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  useEffect(() => {
    const allClubs = data?.data.map((item) => {
      return item.clubs.title
    })
    var uniqClub = allClubs?.filter(onlyUnique)
    setUniqClub(uniqClub)
    setAllData(data?.data)
    const totalData = data?.total
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalData / 9); i++) {
      pageNumbers.push(i)
    }
    setTotal(pageNumbers)
  }, [data])

  //Modal Handler
  function openModal(value) {
    const filteredValue = data?.data.filter((item) => {
      return item.id === value
    })
    setFilteredData(filteredValue[0])

    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }

  if (isLoading) {
    return <Loading />
  }

  const clubFilterModal = (clubs) => {
    const result = allData?.filter((item) => {
      return item.clubs.title === clubs
    })
    setFiltered(result)
  }
  const clubFilterModalClear = () => {
    setFiltered([])
  }

  return (
    !isLoading && (
      <>
        <Modal
          className="events-modal"
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div
            className="option-box-close_events"
            onClick={closeModal}
            style={{ cursor: 'pointer' }}
          >
            <TfiClose color="#000" />
          </div>
          <img
            src={filteredData.image}
            alt=""
            style={{ width: '100%', height: 'auto' }}
          />
        </Modal>

        <div className="main">
          <Banner image={bannerImg} title="Etkinlikler" bread="Etkinlikler" />
          <div className="container">
            <div className="filter-allclear d-flex justify-content-end">
              <Link
                className="events-filter-clear"
                onClick={() => clubFilterModalClear()}
              >
                Filtreyi Temizle
              </Link>
              <Button
                onClick={() => setshow(!show)}
                className=" filter-button rounded-0"
                variant="primary"
                type="submit"
              >
                Filtrele
              </Button>
            </div>
            {show === true && (
              <div className="filter-container">
                <ul className="Items-all filter-container_list ">
                  {uniqClubs?.map((item) => (
                    <li>
                      <Link onClick={() => clubFilterModal(item)}> {item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {filtered?.length > 0 && (
              <div className="row">
                {filtered?.map((item) => {
                  return (
                    <>
                      <div
                        className="col-md-4"
                        onClick={() => openModal(item.id)}
                      >
                        <EventsCard Img={item.image} />
                      </div>
                    </>
                  )
                })}
              </div>
            )}
            {filtered?.length === 0 && (
              <div className="row">
                {data?.data.map((item) => {
                  return (
                    <>
                      <div
                        className="col-md-4"
                        onClick={() => openModal(item.id)}
                      >
                        <EventsCard Img={item.image} />
                      </div>
                    </>
                  )
                })}
              </div>
            )}
            <div className="containers-pagination">
              <ul className="pagination-list mt-4">
                {total?.map((item) => (
                  <li className="page-item">
                    <Link
                      className="page-link"
                      onClick={() => paginationHandler(item)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <CallToAction menu={false} />
      </>
    )
  )
}

export default Events
