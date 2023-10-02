import React from "react";
import FirstItem from "../../assets/images/home/triple-first.webp";
import FirstItemIcon from "../../assets/images/home/triple-first-icon.webp";
import SecondItem from "../../assets/images/home/triple-second.webp";
import ThirdItem from "../../assets/images/home/triple-third.webp";
import ThirdItemIcon from "../../assets/images/home/triple-third-icon.webp";
import { useNavigate } from "react-router-dom";
import "./triple-card.css";

export const TripleCard = () => {
    const navigate = useNavigate();

    const goNavigate = (slug) => {
        document.body.scroll({
            top: 0,
            left: 0,
        });
        navigate(slug);
    };

    return (
        <div className="triple-card">
            <div className="row">
                <div className="col-md-4">
                    <div
                        className="triple-item_first"
                        style={{ cursor: "pointer" }}
                        onClick={() => goNavigate("/etkinlikler")}
                    >
                        <img
                            src={FirstItem}
                            style={{ width: "100%", height: "auto" }}
                            alt="Sportsinternational"
                        />
                        <img src={FirstItemIcon} alt="Sportsinternational" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="triple-item_second">
                        <img
                            src={SecondItem}
                            style={{ width: "100%", height: "auto" }}
                            alt="Sportsinternational"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <a href="/sportsclub">
                        <div
                            className="triple-item_third"
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={ThirdItem}
                                style={{ width: "100%", height: "auto" }}
                                alt="Sportsinternational"
                            />
                            <img
                                src={ThirdItemIcon}
                                className="triple-item_third-image"
                                alt="Sportsinternational"
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};
