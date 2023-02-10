import React, { useEffect, useState } from 'react'
import EventsCard from '../components/events/EventsCard'
import '../components/events/events.css'
import '../components/events/event-card-pagination.css'
import CallToAction from '../components/calltoaction/CallToAction'
import { TfiClose } from 'react-icons/tfi'
import Modal from 'react-modal'
import { useService } from '../service/useService.js'
import allService from '../service/services'
import Loading from '../components/loading/Loading'
import Pagination from '../components/pagination/Pagination'
import { ClubsCardEvent } from '../components/events/ClubsCardEvent'
import middleImage from '../assets/images/events/bize-sportslu-derler.jpg'
function Events() {
  let subtitle
  const [allData, setAllData] = useState()
  const [club, setClubs] = useState()
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState(1)
  const [filtered, setFiltered] = useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [content, setContent] = useState([])
  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPage] = useState(9)

  const { data, isLoading, refetch } = useService(`events`, () =>
    allService.fetchEvents(pagination),
  )

  useEffect(() => {
    paginationHandlerData()
  }, [currentPage, content])
  useEffect(() => {
    filterAllData(filtered.id)
  }, [filtered])

  const paginationHandlerData = () => {
    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPosts = content?.slice(firstPostIndex, lastPostIndex)
    setAllData(currentPosts)
  }
  useEffect(() => {
    let count = 0
    content?.map((item) => (count = count + 1))
    setTotal(count)
  }, [content])
  //Filtered data

  const filterAllData = (id) => {
    setContent([])
    if (id === 0) {
      setContent(data)
      setCurrentPage(1)
    } else {
      const filter = data?.filter((item) => item.club_id == id)
      setContent(filter)
      setCurrentPage(1)
    }
  }

  //Modal Function
  const customStyles = {
    content: {
      backgroundImage: 'none',
      padding: '0px',
      border: 'none',
    },
  }
  function openModal(value) {
    const filteredValue = data?.filter((item) => {
      return item.id === value
    })

    setFilteredData(filteredValue[0])
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  if (isLoading) {
    return <Loading />
  }

  return (
    !isLoading && (
      <>
        <Modal
          className="events-modal"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
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
          <ClubsCardEvent setFiltered={setFiltered} setClubs={setClubs} />
          {content && (
            <div className="container" id="events">
              {filtered && (
                <p className="events-selected-title">{filtered.title}</p>
              )}

              <div className="row">
                {allData?.map((item, i) => (
                  <div
                    key={i}
                    className="col-md-4"
                    onClick={() => openModal(item.id)}
                  >
                    <EventsCard Img={item.image} />
                  </div>
                ))}
                {allData?.length === 0 && <div>Etkinlik Bulunamadı.</div>}
              </div>

              <Pagination
                totalPosts={total}
                postPerPage={postPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
        <CallToAction menu={false} />
      </>
    )
  )
}

export default Events
