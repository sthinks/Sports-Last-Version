import React, { useEffect, useState } from "react";
import "../components/sportsAdvantage/advantageCard.css";
import { useService } from "../service/useService";
import allService from "../service/services.js";
import Loading from "../components/loading/Loading";
import { Helmet } from "react-helmet";

const SportsAdvantage = () => {
    const [category, setCategory] = useState();
    const [banner, setBanner] = useState();
    const [loading, setLoading] = useState(false);
    const getAllCategory = async () => {
        const result = await allService.fetchAdvantageCategory();
        setCategory(result);
        setLoading(true);
    };
    const fetchBanner = async () => {
        const result = await allService.fetchAvantageBanner();
        setBanner(result);
    };

    useEffect(() => {
        getAllCategory();
        fetchBanner();
    }, []);

    return !loading ? (
        <Loading />
    ) : (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sports Avantajları</title>
                <link rel="canonical" href={`/sportsclub`} />
                <meta name="description" content="Sports Avantajları" />
                <meta name="description" content="Sports İnternational" />
            </Helmet>
            <div>
                <div className="avantage-banner-re">
                    {banner && (
                        <img
                            src={banner[0]?.image}
                            style={{ width: "100%", height: "auto" }}
                            alt=""
                        />
                    )}
                </div>
                <div className="cards-container">
                    <div className="container avantage-container">
                        <div className="cards-list">
                            <a href="kuluplerimiz/ankara-bilkent-rhythm-by-spa">
                                <div className="home-card">
                                    <img
                                        className="w-100 h-auto"
                                        src="https://www.sportsinternational.com.tr/storage/clubs/April2023/4YdPyYOnGb6Eg0R4hG6J.webp"
                                        alt="Bilkent Rhythm"
                                    />
                                </div>
                            </a>
                            <a href="kuluplerimiz/ankara-cankaya-vadi-rhythm-by-spa">
                                <div className="home-card">
                                    <img
                                        className="w-100 h-auto"
                                        src="https://www.sportsinternational.com.tr/storage/clubs/April2023/GRJeDIpGP4ZXq8o5vrA7.webp"
                                        alt="Çankaya Vadi Rhythm"
                                    />
                                </div>
                            </a>

                            {category?.map((item, i) => (
                                <a href={`sportsclub/${item.slug}`} key={i}>
                                    <div key={i} className="home-card">
                                        <img
                                            className="w-100 h-auto"
                                            src={item?.image_banner}
                                            alt={item?.name}
                                        />
                                    </div>
                                </a>
                            ))}

                            {/* <div
                                style={{
                                    background: "#0080C8",
                                    padding: "10px 0px",
                                    borderRadius: "50px",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                <h5 style={{ margin: "0px" }}>{title}</h5>
                            </div> */}
                            {/* <div style={{ marginTop: "25px" }}>
                                <div className="row">
                                    {filteredAdvantage?.map((item, i) => (
                                        <AdvantageCard key={i} item={item} />
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SportsAdvantage;
