import React, { useState, useEffect, useRef } from "react";
import "./schedule.css";
import { BiBell } from "react-icons/bi";
import { TfiPrinter } from "react-icons/tfi";
import { useReactToPrint } from "react-to-print";
import { useService } from "../../service/useService";
import AxiosClientSchedule from "../../utils/axiosClientSchedule";
import allService from "../../service/services";
import Loading from "../loading/Loading";
import AxiosClient from "../../utils/axiosClient";
import axios from "axios";
export default function Schedule({ marginB }) {
    const [data, setData] = useState();
    const [allData, setAllData] = useState();
    const [tab, setTab] = useState(2);
    const [list, setList] = useState([]);
    const [dataSlug, setDataSlug] = useState(11190);
    const [activePlace, activeSetPlace] = useState(1);
    const [weekIsActive, setWeekIsActive] = useState([]);
    const [dataSize, setDataSize] = useState(false);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Sports İnternational Program",
    });

    const sportsPlace = [
        {
            id: 1,
            name: "Bilkent",
            value: "bilkent",
            slug: 11190,
        },

        {
            id: 3,
            name: "Kadıköy",
            value: "kadikoy",
            slug: 11191,
        },
        {
            id: 4,
            name: "Mavişehir",
            value: "mavisehir",
            slug: 11194,
        },
        {
            id: 5,
            name: "Mersin",
            value: "yenisehir",
            slug: 11193,
        },
        {
            id: 6,
            name: "Effect",
            value: "effectankara",
            slug: 14,
        },
        {
            id: 7,
            name: "ÇankayaVadi",
            value: "cankayavadi",
            slug: 11111,
        },
    ];
    const days = [
        {
            id: 2,
            title: "Pazartesi",
        },
        {
            id: 3,
            title: "Salı",
        },
        {
            id: 4,
            title: "Çarşamba",
        },
        {
            id: 5,
            title: "Perşembe",
        },
        {
            id: 6,
            title: "Cuma",
        },
        {
            id: 7,
            title: "Cumartesi",
        },
        {
            id: 1,
            title: "Pazar",
        },
        {
            id: 0,
            title: "Haftalık",
        },
    ];

    const handlerSchedule = async () => {
        await axios(
            "https://www.sportsinternational.com.tr/api/lesson-program"
        ).then((res) => setAllData(res.data));
    };
    useEffect(() => {
        handlerSchedule();
    }, []);
    useEffect(() => {
        if (allData) {
            filterCity(activePlace);
        }
    }, [allData, activePlace]);
    useEffect(() => {
        if (data) {
            activeList(tab);
        }
    }, [data]);
    const filterCity = (cityValue) => {
        switch (cityValue) {
            case 1:
                setData(allData?.bilkent);
                break;
            case 3:
                setData(allData?.kadikoy);
                break;
            case 4:
                setData(allData?.mavisehir);
                break;
            case 5:
                setData(allData?.yenisehir);
                break;
            case 6:
                setData(allData?.effectankara);
                break;
            case 7:
                setData(allData?.cankayavadi);
                break;

            default:
                break;
        }
    };
    const activeTab = (id) => {
        const result = days.filter((item) => item.id === id);
        setTab(result[0].id);
    };
    const activeList = (day) => {
        if (day === 0) {
            setDataSize(true);
            setList([]);
            const result = data?.map((item) => {
                return item;
            });
            setWeekIsActive(result);
        } else {
            const result = data?.filter((item) => item.day === day);
            if (result.length > 7) {
                setDataSize(true);
            } else {
                setDataSize(false);
            }
            setWeekIsActive([]);
            setList(result);
        }
    };
    const activePlaceHandler = (id) => {
        const result = sportsPlace.filter((item) => item.id === id);
        activeSetPlace(result[0].id);
        setDataSlug(result[0].id);
    };

    return (
        <div
            className={
                dataSize
                    ? [
                          marginB
                              ? "schedule-background-1200 margin-b"
                              : "schedule-background-1200",
                      ]
                    : [
                          marginB
                              ? "schedule-background margin-b"
                              : "schedule-background",
                      ]
            }
        >
            <div className="schedule-container">
                <div className="schedule-lesson-print">
                    <div
                        className="schedule-lesson-print-container"
                        onClick={() => handlePrint()}
                    >
                        <p>
                            Haftalık Ders Programını Yazdırmak için Tıklayınız
                        </p>
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
                                                ? "schedule-sports-city-list-item-active"
                                                : ""
                                        }
                                        onClick={() =>
                                            activePlaceHandler(item.id)
                                        }
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
                                        ? "schedule-button active-btn "
                                        : "schedule-button"
                                }
                                onClick={() => {
                                    activeTab(day.id);
                                    activeList(day.id);
                                }}
                            >
                                <div>{day.title}</div>
                            </div>
                        ))}
                    </div>
                    {!weekIsActive?.length > 0 && (
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
                                    {item.trainerName}
                                    <span className="schedule-cancel-list-item text-danger">
                                        {item.isCancelled ? "(İPTAL)" : ""}
                                    </span>
                                </li>
                                <li>{item.locationName}</li>
                            </ul>
                        ))}
                    </div>
                    {weekIsActive && (
                        <div className="schedule-list-calender-week">
                            {[...Array(7)].map((x, i) =>
                                generateDaySchedule(weekIsActive, i + 1)
                            )}
                            <div className="shedule-list-item"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function generateDaySchedule(schedule, day) {
    // Kaydırma işlemi: Gelen verideki pazar günü 1 olduğundan, pazartesiyi 2 olarak kabul etmek için kaydırma yapıyoruz.
    const adjustedDay = (day % 7) + 1; // Kaydırma işlemi

    return (
        <div className="shedule-list-item">
            {schedule?.map((item, i) => {
                if (item.day === adjustedDay) {
                    return (
                        <div key={i} className="total-item">
                            <div className="programName">
                                {item.trainerName}
                            </div>
                            <div className="hour-range">{item.hourRange}</div>
                            <div className="programName">
                                {item.programName}
                            </div>
                            <div className="descriptionName">
                                {item.description}
                            </div>
                            <div className="hour-range">
                                {item.locationName}
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}
