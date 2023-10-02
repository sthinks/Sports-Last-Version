import React, { useEffect, useState } from "react";
import AdvantageCard from "../components/sportsAdvantage/AdvantageCard";
import "../components/sportsAdvantage/advantageCard.css";
import { useService } from "../service/useService";
import allService from "../service/services.js";
import Loading from "../components/loading/Loading";
import { Helmet } from "react-helmet";

const SportsAdvantage = () => {
    const [category, setCategory] = useState();
    const [filteredAdvantage, setFilteredAdvantage] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [title, setTitle] = useState();
    const [banner, setBanner] = useState();
    const { data, isLoading, refetch } = useService("advantages", () =>
        allService.fetchAdvantage()
    );
    const getAllCategory = async () => {
        const result = await allService.fetchAdvantageCategory();
        setCategory(result);
    };
    const fetchBanner = async () => {
        const result = await allService.fetchAvantageBanner();
        setBanner(result);
    };
    const advantageHandler = (eventTitle, itemId) => {
        const filteredData = data?.filter((item) => {
            return item.avantage_categories.name === eventTitle;
        });
        setTitle(eventTitle);
        setFilteredAdvantage(filteredData);
        setSelectedItem(itemId);
    };
    useEffect(() => {
        fetchBanner();
    }, []);
    useEffect(() => {
        getAllCategory();
        advantageHandler("Eğitim");
        setSelectedItem(1);
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }
    return (
        !isLoading && (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Sports Avantajları</title>
                    <link rel="canonical" href={`/sportsclub`} />
                    <meta name="description" content="Sports Avantajları" />
                    <meta name="description" content="Sports İnternational" />
                </Helmet>
                <div>
                    <div>
                        {banner && (
                            <img
                                src={banner[0]?.image}
                                style={{ width: "100%", height: "auto" }}
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
                                            selectedItem == item.id
                                                ? "active-btnn"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            advantageHandler(item.name, item.id)
                                        }
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                            <div
                                style={{
                                    background: "#0080C8",
                                    padding: "10px 0px",
                                    borderRadius: "50px",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                <h5 style={{ margin: "0px" }}>{title}</h5>
                            </div>
                            <div style={{ marginTop: "25px" }}>
                                <div className="row">
                                    {filteredAdvantage?.map((item, i) => (
                                        <AdvantageCard key={i} item={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default SportsAdvantage;
