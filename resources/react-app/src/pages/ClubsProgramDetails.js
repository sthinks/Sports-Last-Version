import React, { useEffect, useState } from "react";
import { useService } from "../service/useService";
import allService from "../service/services.js";
import Slider from "react-slick";
import { array } from "yup";
import RıhtımForm from "../components/RıhtımForm/RıhtımForm.jsx";
import generalservice from "../service/services";
import england from "../assets/images/flag/united-kingdom.png";
import { TfiClose } from "react-icons/tfi";
import turkey from "../assets/images/flag/turkey.png";
import Modal from "react-modal";
function ClubsProgramDetails() {
    const [selectLang, setSelectLang] = useState("tr");
    const [kamp, setKamp] = useState([]);
    const [slider, setSlider] = useState([]);
    const [sliderImageArray, setSliderImageArray] = useState([]);
    const [resultData, setResultData] = useState(null);
    const [haveSlider, setHaveSlider] = useState();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [filteredData, setFilteredData] = useState([]);
    let slug = window.location.pathname;
    slug = slug.split("/");

    const { data, isLoading, refetch } = useService(`club/${slug[2]}`, () =>
        allService.getByClubsId(slug[2])
    );

    const getDatam = async () => {
        const result = await generalservice.fetchAvantageDetails(
            slug[2] + "-" + slug[3]
        );
        setResultData(result[0]);
    };
    const getKampanya = async () => {
        const resultKamp = await generalservice.fetchAvantageKampanya(
            slug[2] + "-" + slug[3]
        );
        setKamp(resultKamp);
    };
    const getSliders = async () => {
        const resultslider = await generalservice.fetchAvantageSliders(slug[3]);
        console.log(resultslider);
        setSlider(resultslider);
    };
    useEffect(() => {
        const clubSliderLength = data?.club_slider_images.length;
        setHaveSlider(clubSliderLength);
        if (clubSliderLength === 1) {
            setSliderImageArray(data?.club_slider_images[0].image.split(","));
        } else if (clubSliderLength === undefined) {
            setHaveSlider(0);
        }
        refetch();
    }, [data]);
    useEffect(() => {
        if (resultData === null) {
            getDatam();
            getKampanya();
            getSliders();
        }
    }, []);
    let x =
        haveSlider === 1
            ? data?.club_slider_images[0].image.split(",").length
            : null;
    var settings = {
        arrow: false,
        dots: false,
        infinite: true,
        autoplaySpeed: 1000,
        pauseOnHover: false,
        autoplay: true,
        slidesToShow: x ? (x <= 5 ? x - 1 : 5) : 0,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    arrow: false,
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    function openModal(value) {
        setFilteredData(value);
        setIsOpen(true);
    }
    const customStyles = {
        content: {
            backgroundImage: "none",
            padding: "10px",
            border: "none",
            height: "100%",
            display: "flex",
            justifyContent: "center",
        },
    };
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            {haveSlider === 1 && (
                <Slider style={{ width: "95%" }} {...settings}>
                    {sliderImageArray?.map((image, i) => (
                        <div key={i} className="clubs-detail_item">
                            <img src={image} alt="" />
                        </div>
                    ))}
                </Slider>
            )}
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
                    style={{ cursor: "pointer" }}
                >
                    <TfiClose color="#000" />
                </div>
                <img
                    src={filteredData.image}
                    alt=""
                    style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </Modal>
            <div container>
                <div className="row p-5">
                    <div className="col-sm-12">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "2rem",
                                    color: "#0281c8",
                                    marginBottom: "10px",
                                    marginTop: "10px",
                                    fontWeight: "700",
                                }}
                            >
                                {slug[3] === "spa"
                                    ? selectLang === "tr"
                                        ? "Spa & Masaj"
                                        : "Spa & Massage"
                                    : "Personal Training"}
                            </p>
                            <div
                                style={{
                                    margin: "0",
                                    padding: "0",
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >
                                <img
                                    className={
                                        selectLang === "tr" ? "blob" : ""
                                    }
                                    style={{ width: "50px", cursor: "pointer" }}
                                    onClick={() => setSelectLang("tr")}
                                    src={turkey}
                                    alt="Türkiye"
                                />
                                <img
                                    className={
                                        selectLang === "eng" ? "blob" : ""
                                    }
                                    style={{ width: "50px", cursor: "pointer" }}
                                    onClick={() => setSelectLang("eng")}
                                    src={england}
                                    alt="İngilizce"
                                />
                            </div>
                        </div>
                        {selectLang === "tr" ? (
                            <p
                                className="danger-html"
                                dangerouslySetInnerHTML={{
                                    __html: resultData?.content,
                                }}
                            />
                        ) : (
                            <p
                                className="danger-html"
                                dangerouslySetInnerHTML={{
                                    __html: resultData?.content_en,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
            {slider.length > 0 && (
                <Slider style={{ width: "95%" }} {...settings}>
                    {slider?.map((item, i) => (
                        <div key={i} className="clubs-detail_item">
                            <img src={item.images} alt="" />
                        </div>
                    ))}
                </Slider>
            )}

            <div className="row w-100 p-5">
                <div className="col-sm-12">
                    <div className="col-sm-12 mt-2">
                        <p
                            style={{
                                fontSize: "1.5rem",
                                color: "gray",
                                opacity: "0.8",
                                fontWeight: "600",
                            }}
                        >
                            PROSEDÜR
                        </p>
                        {/* <ul className="prosedur-list">
                           
                        </ul> */}
                        {selectLang === "tr" ? (
                            <p
                                className="danger-html"
                                dangerouslySetInnerHTML={{
                                    __html: resultData?.procedure_text,
                                }}
                            />
                        ) : (
                            <p
                                className="danger-html"
                                dangerouslySetInnerHTML={{
                                    __html: resultData?.procedure_text_en,
                                }}
                            />
                        )}
                    </div>

                    {kamp.length > 0 && (
                        <div>
                            <p
                                style={{
                                    fontSize: "2rem",
                                    color: "#0281c8",
                                    marginBottom: "10px",
                                    marginTop: "10px",
                                    fontWeight: "700",
                                }}
                            >
                                {selectLang === "tr"
                                    ? "Kampanyalar"
                                    : "Campaigns"}
                            </p>
                            <div className="d-flex flex-wrap justify-content-start align-items-center">
                                {kamp.map((item, i) => (
                                    <img
                                        onClick={() => openModal(item)}
                                        className="kampanya-image"
                                        key={i}
                                        src={item.image}
                                        alt="Kampanya"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="col-sm-12 mt-2">
                        <RıhtımForm />
                    </div>
                    {/* ikinci slider */}
                </div>
            </div>
        </div>
    );
}

export default ClubsProgramDetails;
