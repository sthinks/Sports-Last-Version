import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useService } from "../../service/useService";
import allService from "../../service/services";
import Loading from "../loading/Loading";
import "./club-card-event.css";
import middleImage from "../../assets/images/events/bize-sportslu-derler.webp";

export const ClubsCardEvent = ({ handleScoll }) => {
    const { data, isLoading, refetch } = useService("getclubs", () =>
        allService.fetchClubs()
    );
    if (isLoading) {
        return <Loading />;
    }

    return (
        !isLoading && (
            <div className="cards-container">
                <div className="container">
                    <div className="cards-list">
                        {data &&
                            data.slice(0, 4).map((item, i) => {
                                return (
                                    item.events.length > 0 && (
                                        <div
                                            key={i}
                                            onClick={(e) => {
                                                handleScoll(e, "#events", item);
                                            }}
                                        >
                                            <div className="home-card">
                                                <img
                                                    src={
                                                        item.club_image_for_event
                                                    }
                                                    alt="Külüp etkinlik resim"
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                );
                            })}

                        <div>
                            <div className="home-card">
                                <img
                                    src={middleImage}
                                    alt="Külüp etkinlik resim"
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </div>
                        </div>

                        {data &&
                            data.slice(4).map((item, i) => {
                                return (
                                    item.events.length > 0 && (
                                        <div
                                            key={i}
                                            onClick={(e) => {
                                                handleScoll(e, "#events", item);
                                            }}
                                        >
                                            <div className="home-card">
                                                <img
                                                    src={
                                                        item.club_image_for_event
                                                    }
                                                    alt="Külüp etkinlik resim"
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                );
                            })}
                    </div>
                </div>
            </div>
        )
    );
};
