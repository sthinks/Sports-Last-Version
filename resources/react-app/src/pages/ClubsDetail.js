import React, { useEffect, useState, Suspense } from "react";
import Slider from "react-slick";
import CallToAction from "../components/calltoaction/CallToAction";
import Sports from "../assets/images/clubsdetail/sports-tell.png";
import SportsIcon from "../assets/images/clubsdetail/sports-tell-icon.png";
import SportsArrow from "../assets/images/clubsdetail/arrow.png";
import Card2Bg from "../assets/images/clubsdetail/card-2-bg.png";
import SlideIcon from "../assets/images/clubsdetail/slide-icon.png";
import Card2Icon from "../assets/images/home/triple-first-icon.png";
import "../components/clubsDetail/clubs-detail.css";
import Schedule from "../components/schedule/Schedule";
import { useParams } from "react-router-dom";
import { useService } from "../service/useService.js";
import allService from "../service/services.js";
import Loading from "../components/loading/Loading";
import { Helmet } from "react-helmet";
import Banner from "../components/banner/Banner";
import pt from "../assets/images/avantage-detail/pt.jpg";
import spa from "../assets/images/avantage-detail/spa.jpg";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import background from "../assets/images/clubsdetail/clubs-detail-bg.png";
import RıhtımForm from "../components/RıhtımForm/RıhtımForm.jsx";
export const ClubsDetail = () => {
    const [sliderImageArray, setSliderImageArray] = useState([]);
    const [haveSlider, setHaveSlider] = useState();
    const { slug } = useParams();
    const { data, isLoading, refetch } = useService(`club/${slug}`, () =>
        allService.getByClubsId(slug)
    );

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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        !isLoading && (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{data?.title}</title>
                    <link
                        rel="canonical"
                        href={`/kuluplerimiz/${data?.slug}`}
                    />
                    <meta name="description" content={data?.title} />
                </Helmet>
                <div>
                    <Banner image={data.image_banner} noBread={true} />
                    <div className="clubs-detail_text-container">
                        <div className="container">
                            <div className="clubs-detail_text">
                                <p
                                    style={{ textAlign: "justify" }}
                                    dangerouslySetInnerHTML={{
                                        __html: data.description,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="clubs-detail_carousel position-relative">
                        <img
                            className="position-absolute w-100 h-100"
                            src={background}
                            alt="Sports International"
                        />
                        <div className="slide-icon">
                            <img
                                className="position-relative"
                                src={SlideIcon}
                                alt=""
                                style={{
                                    width: "215px",
                                    height: "auto",
                                    zIndex: "99999999",
                                }}
                            />
                        </div>
                        {haveSlider === 1 && (
                            <Slider {...settings}>
                                {sliderImageArray?.map((image, i) => (
                                    <div key={i} className="clubs-detail_item">
                                        <img src={image} alt="" />
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                    {slug === "ankara-bilkent-rhythm-by-spa" ||
                    slug === "ankara-cankaya-vadi-rhythm-by-spa" ? (
                        <div className="footer-contact-cards mt-5">
                            <div
                                className="contact-right-side w-100"
                                style={{ cursor: "pointer" }}
                            >
                                <a
                                    className="contact-phone"
                                    href={
                                        slug === "ankara-bilkent-rhythm-by-spa"
                                            ? "tel:03122667134"
                                            : "tel:03124082220"
                                    }
                                >
                                    <p
                                        className="contact-footer-phone"
                                        style={{ fontSize: "3rem" }}
                                    >
                                        <b>Rezervasyon</b>
                                    </p>
                                    <p className="contact-footer-phone">
                                        {slug === "ankara-bilkent-rhythm-by-spa"
                                            ? "0 312 266 71 34"
                                            : "0 312 408 22 20"}
                                    </p>
                                </a>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    {slug === "ankara-bilkent-rhythm-by-spa" ||
                    slug === "ankara-cankaya-vadi-rhythm-by-spa" ? (
                        ""
                    ) : (
                        <div className="clubs-detail_card-container">
                            <a
                                className="clubs-detail_card"
                                href="/sportslu-anlatiyor"
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={Sports}
                                    style={{ width: "100%", height: "auto" }}
                                    alt=""
                                />
                                <div className="clubs-detail_card-icons">
                                    <img
                                        src={SportsIcon}
                                        className="clubs-detail_card-icon"
                                        alt=""
                                    />
                                    <img src={SportsArrow} alt="" />
                                </div>
                            </a>
                            <a
                                className="clubs-detail_card"
                                href="/etkinlikler"
                                style={{ cursor: "pointer" }}
                            >
                                <div className="icons-container">
                                    <img
                                        src={Card2Bg}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        alt=""
                                    />
                                    <div className="clubs-detail_card-icons">
                                        <img
                                            src={Card2Icon}
                                            className="sports-events"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </a>
                        </div>
                    )}

                    {slug === "ankara-bilkent-rhythm-by-spa" ||
                    slug === "ankara-cankaya-vadi-rhythm-by-spa" ? (
                        ""
                    ) : (
                        <>
                            <Schedule marginB={true} />

                            <CallToAction menu={false} />
                        </>
                    )}
                    {slug === "ankara-bilkent-rhythm-by-spa" ||
                    slug === "ankara-cankaya-vadi-rhythm-by-spa" ? (
                        <div className="d-flex pt-spa-container   gap-3">
                            <div className="responsive-width">
                                <a href={`${slug}/spa`}>
                                    <img
                                        className="w-100 h-100 card-hover-scale"
                                        src={spa}
                                        alt="spa"
                                    />
                                </a>
                            </div>
                            <div className="responsive-width">
                                {slug ===
                                "ankara-cankaya-vadi-rhythm-by-spa" ? (
                                    <div className="detaylı-bilgi">
                                        <PiArrowBendDownRightBold className="details-icons-arrow" />
                                        <p style={{ fontSize: "1.5rem" }}>
                                            Spa ile ilgili bilgi almak için
                                            tıklayın.
                                        </p>
                                    </div>
                                ) : (
                                    <a href={`${slug}/pt`}>
                                        <img
                                            className="w-100 h-100 card-hover-scale"
                                            src={pt}
                                            alt="pt"
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                {slug === "ankara-bilkent-rhythm-by-spa" ||
                slug === "ankara-cankaya-vadi-rhythm-by-spa" ? (
                    <div>
                        <RıhtımForm />
                    </div>
                ) : (
                    ""
                )}

                {slug === "ankara-cankaya-vadi-rhythm-by-spa" && (
                    <div className="mt-5">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12246.258097626522!2d32.8468118!3d39.8839914!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d345165870a53b%3A0x5b5bb7c3888d682c!2sSports%20International%20%C3%87ankaya%20Vadi!5e0!3m2!1str!2str!4v1718022235710!5m2!1str!2str"
                            width="100%"
                            height="450"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Çankaya"
                        ></iframe>
                    </div>
                )}
                {slug === "ankara-bilkent-rhythm-by-spa" && (
                    <div className="mt-5">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12246.380266585382!2d32.7624127!3d39.8833074!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d346118afbb025%3A0x8ecbfd0fee876452!2sSports%20International%20Bilkent!5e0!3m2!1str!2str!4v1718022378390!5m2!1str!2str"
                            width="100%"
                            height="450"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Bilkent"
                        ></iframe>
                    </div>
                )}
            </>
        )
    );
};
