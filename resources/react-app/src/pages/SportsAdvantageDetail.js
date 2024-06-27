import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import allService from "../service/services.js";
import AdvantageCard from "../components/sportsAdvantage/AdvantageCard";
import Loading from "../components/loading/Loading";

function SportsAdvantageDetail() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        const result = await allService.fetchAdvantage();
        const filterData = result.filter((item) => {
            return item.avantage_categories.slug === slug;
        });
        setData(filterData);
        setLoading(true);
    };
    useEffect(() => {
        fetchData();
    }, [slug]);

    return !loading ? (
        <Loading />
    ) : (
        <div className="container mt-5 mb-5">
            <div style={{ marginTop: "25px" }}>
                {data?.length > 0 ? (
                    <div className="row">
                        {data?.map((item, i) => (
                            <AdvantageCard key={i} item={item} />
                        ))}
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className="w-100 text-center d-flex justify-content-center align-items-center"
                            style={{
                                backgroundColor: "#c0e8ff",
                                height: "100px",
                                fontSize: "2rem",
                            }}
                        >
                            Kampanya bulunamadı.
                        </div>
                        <button
                            onClick={() => window.history.back()}
                            className="navbar-button btn btn-primary mt-3 w-25"
                            style={{ color: "white" }}
                        >
                            GERİ DÖN
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SportsAdvantageDetail;
