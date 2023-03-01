import React, { useEffect, useState } from 'react'
import AdvantageCard from '../components/sportsAdvantage/AdvantageCard'
import '../components/sportsAdvantage/advantageCard.css'
import Banner from '../assets/images/advantage.png'
import { useService } from '../service/useService'
import allService from '../service/services.js'
import Loading from '../components/loading/Loading'
import AxiosClient from '../utils/axiosClient'
const dataa = [
  {
    id: 1,
    title: 'Eğitim',
    children: [
      {
        title: 'Özel Berk Oyun Durağı Anaokulu',
        location: 'İzmir',
        discount: 'İndirim Oranı %30',
        address: '2040 Sokak Kuğu Siteleri No. 112/60 Mavişehir',
        phone: '0541 360 73 65',
        validityDate: '15 Mart 2023 tarihine kadar geçerlidir.',
      },
      {
        title: 'İTÜ ETA VAKFI DOĞA KOLEJİ',
        location: 'İzmir',
        discount: 'İndirim Oranı %30',
        address:
          'Yalı Mah. 6500/1 Sokak No: 7 İç Kapı No: Z1 Karşıyaka / İzmir',
        phone: '0232 324 36 42',
        validityDate: '1 Temmuz 2022 tarihine kadar geçerlidir.',
      },
    ],
  },
  {
    id: 2,
    title: 'Hizmet',
    children: [
      {
        title: 'Bilsigorta',
        location: 'Ankara',
        discount: 'İndirim Oranı %10',
        address: 'Beytepe Köyü Yolu 6. Cadde No:3 Bilkent / Ankara',
        phone: '0 (312) 297 98 00',
        validityDate: null,
      },
    ],
  },
  {
    id: 3,
    title: 'Sağlık ve Güzellik',
    children: [
      {
        title: 'Bilsigorta',
        location: 'Ankara',
        discount: 'İndirim Oranı %10',
        address: 'Beytepe Köyü Yolu 6. Cadde No:3 Bilkent / Ankara',
        phone: '0 (312) 297 98 00',
        validityDate: null,
      },
    ],
  },
  {
    id: 4,
    title: 'Spor',
    children: [
      {
        title: 'Bilsigorta',
        location: 'Ankara',
        discount: 'İndirim Oranı %10',
        address: 'Beytepe Köyü Yolu 6. Cadde No:3 Bilkent / Ankara',
        phone: '0 (312) 297 98 00',
        validityDate: null,
      },
    ],
  },
  {
    id: 5,
    title: 'Yeme-İçme',
    children: [
      {
        title: 'Bilsigorta',
        location: 'Ankara',
        discount: 'İndirim Oranı %10',
        address: 'Beytepe Köyü Yolu 6. Cadde No:3 Bilkent / Ankara',
        phone: '0 (312) 297 98 00',
        validityDate: null,
      },
    ],
  },
  {
    id: 6,
    title: 'Telekomünikasyon',
    children: [
      {
        title: 'Bilsigorta',
        location: 'Ankara',
        discount: 'İndirim Oranı %10',
        address: 'Beytepe Köyü Yolu 6. Cadde No:3 Bilkent / Ankara',
        phone: '0 (312) 297 98 00',
        validityDate: null,
      },
    ],
  },
]

const SportsAdvantage = () => {
  const [category, setCategory] = useState()
  const [filteredAdvantage, setFilteredAdvantage] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [title, setTitle] = useState()
  const [banner, setBanner] = useState()
  const { data, isLoading, refetch } = useService('advantages', () =>
    allService.fetchAdvantage(),
  )
  const getAllCategory = async () => {
    const result = await allService.fetchAdvantageCategory()
    setCategory(result)
  }
  const fetchBanner = async () => {
    const result = await allService.fetchAvantageBanner()
    setBanner(result)
  }
  const advantageHandler = (eventTitle, itemId) => {
    const filteredData = data?.filter((item) => {
      return item.avantage_categories.name === eventTitle
    })
    setTitle(eventTitle)
    setFilteredAdvantage(filteredData)
    setSelectedItem(itemId)
  }
  useEffect(() => {
    fetchBanner()
  }, [])
  useEffect(() => {
    getAllCategory()
    advantageHandler('Eğitim')
    setSelectedItem(1)
  }, [data])

  if (isLoading) {
    return <Loading />
  }
  return (
    !isLoading && (
      <div>
        <div>
          {banner && (
            <img
              src={banner[0]?.image}
              style={{ width: '100%', height: 'auto' }}
              alt=""
            />
          )}
        </div>
        <div className="container">
          <div>
            <ul className="advantageList">
              {category?.map((item, i) => (
                <li
                  key={i}
                  className={`schedule-button ${
                    selectedItem == item.id ? 'active-btnn' : ''
                  }`}
                  onClick={() => advantageHandler(item.name, item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div
              style={{
                background: '#0080C8',
                padding: '10px 0px',
                borderRadius: '50px',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <h5 style={{ margin: '0px' }}>{title}</h5>
            </div>
            <div style={{ marginTop: '25px' }}>
              <div className="row">
                {filteredAdvantage?.map((item, i) => (
                  <AdvantageCard key={i} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default SportsAdvantage
