import React, { useState, useEffect, useRef } from 'react'
import './schedule.css'
import { BiBell } from 'react-icons/bi'
import { TfiPrinter } from 'react-icons/tfi'
import { useReactToPrint } from 'react-to-print'
import { useService } from '../../service/useService'
import allService from '../../service/services'
import Loading from '../loading/Loading'
export default function Schedule({ marginB }) {
  const [data, setData] = useState()
  const [tab, setTab] = useState(1)
  const [list, setList] = useState([])
  const [activePlace, activeSetPlace] = useState(1)
  const [weekIsActive, setWeekIsActive] = useState([])
  const [dataSize, setDataSize] = useState(false)

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Sports İnternational Program',
  })

  const sportsPlace = [
    {
      id: 1,
      name: 'Bilkent',
      slug: 11190,
    },
    {
      id: 2,
      name: 'Ataköy',
      slug: 11192,
    },
    {
      id: 3,
      name: 'Kadıköy',
      slug: 11191,
    },
    {
      id: 4,
      name: 'Mavişehir',
      slug: 11194,
    },
    {
      id: 5,
      name: 'Mersin',
      slug: 11193,
    },
    {
      id: 6,
      name: 'Effect',
      slug: 14,
    },
  ]
  const days = [
    {
      id: 1,
      title: 'Pazartesi',
    },
    {
      id: 2,
      title: 'Salı',
    },
    {
      id: 3,
      title: 'Çarşamba',
    },
    {
      id: 4,
      title: 'Perşembe',
    },
    {
      id: 5,
      title: 'Cuma',
    },
    {
      id: 6,
      title: 'Cumartesi',
    },
    {
      id: 7,
      title: 'Pazar',
    },
    {
      id: 0,
      title: 'Haftalık',
    },
  ]
  //Bilkent
  const dataa = [
    {
      day: 1,
      hourRange: '11:00 - 11:50',
      programName: 'Pilates',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672646400000,
      endAsTimeStamp: 1672649459000,
    },
    {
      day: 1,
      hourRange: '12:05 - 12:55',
      programName: 'Cardio Training',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672650300000,
      endAsTimeStamp: 1672653359000,
    },
    {
      day: 1,
      hourRange: '18:30 - 19:15',
      programName: 'Pilates',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672673400000,
      endAsTimeStamp: 1672676159000,
    },
    {
      day: 1,
      hourRange: '19:30 - 20:15',
      programName: 'Spinning',
      trainerName: '',
      locationName: 'Spinning',
      isCancelled: false,
      description: 'Burak',
      startAsTimeStamp: 1672677000000,
      endAsTimeStamp: 1672679759000,
    },
    {
      day: 1,
      hourRange: '19:30 - 20:15',
      programName: 'Fat Burn',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672677000000,
      endAsTimeStamp: 1672679759000,
    },
    {
      day: 1,
      hourRange: '20:30 - 21:20',
      programName: 'Yoga',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Süreyya',
      startAsTimeStamp: 1672680600000,
      endAsTimeStamp: 1672683659000,
    },
    {
      day: 2,
      hourRange: '18:30 - 19:15',
      programName: 'Fit Muscle',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672759800000,
      endAsTimeStamp: 1672762559000,
    },
    {
      day: 2,
      hourRange: '19:15 - 20:00',
      programName: 'Spinning',
      trainerName: '',
      locationName: 'Spinning',
      isCancelled: false,
      description: 'Nihat\r',
      startAsTimeStamp: 1672762500000,
      endAsTimeStamp: 1672765259000,
    },
    {
      day: 2,
      hourRange: '19:30 - 20:15',
      programName: 'Pilates',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672763400000,
      endAsTimeStamp: 1672766159000,
    },
    {
      day: 2,
      hourRange: '20:30 - 21:20',
      programName: 'Zumba',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Nihat',
      startAsTimeStamp: 1672767000000,
      endAsTimeStamp: 1672770059000,
    },
    {
      day: 3,
      hourRange: '11:00 - 11:50',
      programName: 'Pilates',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672819200000,
      endAsTimeStamp: 1672822259000,
    },
    {
      day: 3,
      hourRange: '12:05 - 12:55',
      programName: 'Fat Burn',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672823100000,
      endAsTimeStamp: 1672826159000,
    },
    {
      day: 3,
      hourRange: '18:30 - 19:15',
      programName: 'Pilates',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Melek',
      startAsTimeStamp: 1672846200000,
      endAsTimeStamp: 1672848959000,
    },
    {
      day: 3,
      hourRange: '19:30 - 20:15',
      programName: 'Spinning',
      trainerName: '',
      locationName: 'Spinning',
      isCancelled: false,
      description: 'Batuhan',
      startAsTimeStamp: 1672849800000,
      endAsTimeStamp: 1672852559000,
    },
    {
      day: 3,
      hourRange: '19:30 - 20:15',
      programName: '%100 Fit',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Melek',
      startAsTimeStamp: 1672849800000,
      endAsTimeStamp: 1672852559000,
    },

    {
      day: 4,
      hourRange: '11:00 - 11:50',
      programName: 'Body Shape',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Nihat',
      startAsTimeStamp: 1672905600000,
      endAsTimeStamp: 1672908659000,
    },
    {
      day: 4,
      hourRange: '12:05 - 12:55',
      programName: 'Zumba',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Nihat',
      startAsTimeStamp: 1672909500000,
      endAsTimeStamp: 1672912559000,
    },
    {
      day: 4,
      hourRange: '13:20 - 14:10',
      programName: 'Yoga',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: true,
      description: 'Süreyya',
      startAsTimeStamp: 1672914000000,
      endAsTimeStamp: 1672917059000,
    },
    {
      day: 4,
      hourRange: '18:30 - 19:15',
      programName: 'Step by Step',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Nihat',
      startAsTimeStamp: 1672932600000,
      endAsTimeStamp: 1672935359000,
    },
    {
      day: 4,
      hourRange: '18:30 - 19:20',
      programName: 'Yoga',
      trainerName: '',
      locationName: 'Spinning',
      isCancelled: false,
      description: 'Süreyya',
      startAsTimeStamp: 1672932600000,
      endAsTimeStamp: 1672935659000,
    },
    {
      day: 4,
      hourRange: '19:30 - 20:15',
      programName: 'Cardio Training',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672936200000,
      endAsTimeStamp: 1672938959000,
    },
    {
      day: 4,
      hourRange: '20:30 - 21:15',
      programName: 'Body Shape',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Nihat',
      startAsTimeStamp: 1672939800000,
      endAsTimeStamp: 1672942559000,
    },
    {
      day: 4,
      hourRange: '20:30 - 21:15',
      programName: 'Stretch&Flex',
      trainerName: '',
      locationName: 'Spinning',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672939800000,
      endAsTimeStamp: 1672942559000,
    },
    {
      day: 5,
      hourRange: '11:00 - 11:50',
      programName: 'Body Mix',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Batuhan',
      startAsTimeStamp: 1672992000000,
      endAsTimeStamp: 1672995059000,
    },
    {
      day: 5,
      hourRange: '12:05 - 12:55',
      programName: 'Stretch&Flex',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1672995900000,
      endAsTimeStamp: 1672998959000,
    },
    {
      day: 5,
      hourRange: '18:30 - 19:15',
      programName: '%100 Fit',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Melek',
      startAsTimeStamp: 1673019000000,
      endAsTimeStamp: 1673021759000,
    },
    {
      day: 5,
      hourRange: '19:30 - 20:15',
      programName: 'Spinning',
      trainerName: '',
      locationName: 'Spinning',
      isCancelled: false,
      description: 'Sinem',
      startAsTimeStamp: 1673022600000,
      endAsTimeStamp: 1673025359000,
    },
    {
      day: 5,
      hourRange: '19:30 - 20:15',
      programName: "Hips'n ABS",
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Melek',
      startAsTimeStamp: 1673022600000,
      endAsTimeStamp: 1673025359000,
    },
    {
      day: 6,
      hourRange: '12:30 - 13:20',
      programName: '%100 Fit',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Burak',
      startAsTimeStamp: 1673083800000,
      endAsTimeStamp: 1673086859000,
    },
    {
      day: 6,
      hourRange: '13:30 - 14:20',
      programName: 'Pilates',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Tuğba',
      startAsTimeStamp: 1673087400000,
      endAsTimeStamp: 1673090459000,
    },
    {
      day: 7,
      hourRange: '12:30 - 13:20',
      programName: 'Tabata',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Sinem',
      startAsTimeStamp: 1673170200000,
      endAsTimeStamp: 1673173259000,
    },
    {
      day: 7,
      hourRange: '13:30 - 14:20',
      programName: 'Yoga',
      trainerName: '',
      locationName: 'Stüdyo',
      isCancelled: false,
      description: 'Süreyya',
      startAsTimeStamp: 1673173800000,
      endAsTimeStamp: 1673176859000,
    },
  ]

  const activeTab = (id) => {
    const result = days.filter((item) => item.id === id)
    setTab(result[0].id)
  }
  const activeList = (day) => {
    if (day === 0) {
      setDataSize(true)
      setList([])
      const result = dataa.map((item) => {
        return item
      })
      setWeekIsActive(result)
    } else {
      const result = dataa.filter((item) => item.day === day)
      if (result.length > 7) {
        setDataSize(true)
      } else {
        setDataSize(false)
      }
      setWeekIsActive([])
      setList(result)
    }
  }
  const activePlaceHandler = (id) => {
    const result = sportsPlace.filter((item) => item.id === id)
    activeSetPlace(result[0].id)
  }

  //Apiler geldiği zaman çalışacak.
  // const fetchClubs = async (slug) => {
  //   const result = await allService.bilkent(slug)
  //   setData(result)
  // }

  useEffect(() => {
    activeList(1)
  }, [])

  return (
    <div
      className={
        dataSize
          ? [
              marginB
                ? 'schedule-background-1200 margin-b'
                : 'schedule-background-1200',
            ]
          : [marginB ? 'schedule-background margin-b' : 'schedule-background']
      }
    >
      <div className="schedule-container">
        <div className="schedule-lesson-print">
          <div
            className="schedule-lesson-print-container"
            onClick={() => handlePrint()}
          >
            <p>Haftalık Ders Programını Yazdırmak için Tıklayınız</p>
            <div className="schedule-lesson-print-icon">
              <TfiPrinter />
            </div>
          </div>
        </div>
        <div className="schedule-table-first-item">
          <div className="schedule">
            {/* <div className="schedule-lesson-announcement">
              <div className="lesson-announcment-icon">
                <BiBell />
              </div>
              <p>Ders duyuruları</p>
            </div> */}
            <div className="schedule-sports-city-list">
              <ul>
                {sportsPlace.map((item, i) => (
                  <li
                    key={i}
                    className={
                      activePlace === item.id
                        ? 'schedule-sports-city-list-item-active'
                        : ''
                    }
                    onClick={() => activePlaceHandler(item.id)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div ref={componentRef} className="schedule-days">
          <div className="days-button-container">
            {days.map((day, i) => (
              <div
                key={i}
                className={
                  tab === day.id
                    ? 'schedule-button active-btn '
                    : 'schedule-button'
                }
                onClick={() => {
                  activeTab(day.id)
                  activeList(day.id)
                }}
              >
                <div>{day.title}</div>
              </div>
            ))}
          </div>
          {!weekIsActive.length > 0 && (
            <div className="schedule-list">
              <div>SAAT</div>
              <div>DERSİN ADI</div>
              <div>EĞİTMEN</div>
              <div>STÜDYO</div>
            </div>
          )}
          <div className="schedule-list-calender">
            {list.map((item, i) => (
              <ul key={i}>
                <li>{item.hourRange}</li>
                <li>{item.programName}</li>
                <li>
                  {item.description}
                  <span className="schedule-cancel-list-item text-danger">
                    {item.isCancelled ? '(İPTAL)' : ''}
                  </span>
                </li>
                <li>{item.locationName}</li>
              </ul>
            ))}
          </div>
          {weekIsActive && (
            <div className="schedule-list-calender-week">
              {[...Array(7)].map((x, i) =>
                generateDaySchedule(weekIsActive, i + 1),
              )}
              <div className="shedule-list-item"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function generateDaySchedule(schedule, day) {
  return (
    <div className="shedule-list-item">
      {schedule?.map((item, i) => {
        if (item.day === day) {
          return (
            <div key={i} className="total-item">
              <div className="hour-range">{item.hourRange}</div>
              <div className="programName">{item.programName}</div>
              <div className="descriptionName">{item.description}</div>
            </div>
          )
        }
      })}
    </div>
  )
}
