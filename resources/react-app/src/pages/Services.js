import React, { useEffect, useState } from 'react'
import '../components/services/services.css'
import CallToAction from '../components/calltoaction/CallToAction'
import Banner from '../components/banner/Banner'
import BannerImage from '../assets/images/banner/services.png'
import BG from '../assets/images/contact/sol_bg.png'
import Modal from 'react-modal'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useService } from '../service/useService'
import allService from '../service/services.js'
import Masonry from 'react-masonry-css'
import { CustomSlider } from '../components/slider/CustomSlider'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: `url(${BG})`,
    position: 'absolute',
  },
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
}

export const Services = () => {
  let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [filteredData, setFilteredData] = useState([])

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

  const { data, isLoading, refetch } = useService('services', () =>
    allService.fetchServices(),
  )

  return (
    <>
      <div>
        <Modal
          className="services-modal"
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div
            className="option-box-close_services"
            onClick={closeModal}
            style={{ cursor: 'pointer' }}
          >
            <AiFillCloseCircle color="#000" />
          </div>

          <img className="modal-image" src={filteredData.image} alt="" />
          <h2 ref={(_subtitle) => (subtitle = _subtitle)} className="mt-4">
            {filteredData.name}
          </h2>
          <p className="mt-4">{filteredData.desc}</p>
        </Modal>

        <div className="gallery-container">
          <div className="container">
            <div className="gallery-text">
              <p>
                Sports International, Türkiye'de 13 kapalı, 21 açık olmak üzere
                toplam 33 adet tenis, 8 adet Squash kortu, 24 adet yüzme havuzu
                ve çocuk havuzu ile 57.312 m² kapalı alan ve 64.905 m² açık alan
                olmak üzere toplamda 122.217 m²'lik bir alanda hizmet
                vermektedir. Sports International, yatırımlarını yalnızca
                fiziksel mekanlarda değil, insana yatırımın öneminin bilinciyle,
                sağlıklı yaşam için hayal edilen her türlü aktiviteyi modern, en
                iyi altyapı ve güler yüzlü profesyonel kadro ile uygulamaktadır.
              </p>
              <p>
                Sports International'da çocuklar için etkinliklere çok önem
                verilir. Çocuk merkezi yetişkinlerden ayrı bir departmandır. 0-5
                ve 6-12 yaş grubu çocuklar için oyuncaklar, videolar ve
                oyunların yanı sıra, çocuklara egzersiz alışkanlığı kazandıracak
                çeşitli programlar da uygulanmaktadır. Deneyimli eğitmenler
                eşliğinde takım ruhuyla yapılan aktivitelerde çocukların
                bedensel gelişimlerine katkıda bulunulmaktadır. 1994 yılından
                bugüne spor ve sağlıklı yaşam konularında yeniliklerin,
                kalitenin tek sembolü olan Sports International, teknolojinin
                gerektirdiği alt yapısı, kaliteli, güler yüzlü ve konusunda
                uzman kadrosu eşliğinde keyif ve güvenle üyelerine hizmet
                vermektedir.
              </p>
            </div>
          </div>
          <div className="container">
            {/* <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {data?.data.map((item) => (
                <div
                  onClick={() => openModal(item.id)}
                  style={{ position: 'relative' }}
                >
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: '0px',
                      color: 'white',
                      padding: '10px',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </Masonry> */}
            <div className="gallery">
              <div
                className="gallery__item gallery__item--1"
                onClick={() => openModal(data?.data[0].id)}
              >
                <img src={data?.data[0].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[0].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--2"
                onClick={() => openModal(data?.data[1].id)}
              >
                <img src={data?.data[1].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[1].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--3"
                onClick={() => openModal(data?.data[2].id)}
              >
                <img src={data?.data[2].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[2].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--4"
                onClick={() => openModal(data?.data[3].id)}
              >
                <img src={data?.data[3].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[3].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--5"
                onClick={() => openModal(data?.data[4].id)}
              >
                <img src={data?.data[4].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[4].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--7"
                onClick={() => openModal(data?.data[5].id)}
              >
                <img src={data?.data[5].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[5].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--8"
                onClick={() => openModal(data?.data[6].id)}
              >
                <img src={data?.data[6].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[6].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--9"
                onClick={() => openModal(data?.data[7].id)}
              >
                <img src={data?.data[7].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[7].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--10"
                onClick={() => openModal(data?.data[8].id)}
              >
                <img src={data?.data[8].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[8].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--11"
                onClick={() => openModal(data?.data[9].id)}
              >
                <img src={data?.data[9].image} className="gallery__img" />
                <span className="gallery__item-text">{data?.data[9].name}</span>
              </div>
              <div
                className="gallery__item gallery__item--12"
                onClick={() => openModal(data?.data[10].id)}
              >
                <img src={data?.data[10].image} className="gallery__img" />
                <span className="gallery__item-text">
                  {data?.data[10].name}
                </span>
              </div>
              <div
                className="gallery__item gallery__item--13"
                onClick={() => openModal(data?.data[11].id)}
              >
                <img src={data?.data[11].image} className="gallery__img" />
                <span className="gallery__item-text">
                  {data?.data[11].name}
                </span>
              </div>
              <div
                className="gallery__item gallery__item--14"
                onClick={() => openModal(data?.data[12].id)}
              >
                <img src={data?.data[12].image} className="gallery__img" />
                <span className="gallery__item-text">
                  {data?.data[12].name}
                </span>
              </div>
              <div
                className="gallery__item gallery__item--15"
                onClick={() => openModal(data?.data[13].id)}
              >
                <img src={data?.data[13].image} className="gallery__img" />
                <span className="gallery__item-text">
                  {data?.data[13].name}
                </span>
              </div>
              <div
                className="gallery__item gallery__item--16"
                onClick={() => openModal(data?.data[14].id)}
              >
                <img src={data?.data[14].image} className="gallery__img" />
                <span className="gallery__item-text">
                  {data?.data[14].name}
                </span>
              </div>
              <div
                className="gallery__item gallery__item--17"
                onClick={() => openModal(data?.data[15].id)}
              >
                <img src={data?.data[15].image} className="gallery__img" />
                <span className="gallery__item-text">
                  {data?.data[15].name}
                </span>
              </div>
            </div>
          </div>
        </div>
        <CallToAction menu={false} />
      </div>
    </>
  )
}
