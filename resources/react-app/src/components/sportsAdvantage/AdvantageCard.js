import React, { useEffect } from "react";
import Image from "../../assets/images/82.jpg";
import "./advantageCard.css";
import LocationIcon from "../../assets/images/location.png";

const AdvantageCard = ({ item }) => {
    const dateHandler = () => {
        var options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const newdate = new Date(item.validity_time);
        return newdate.toLocaleString("tr-TR", options);
    };

    return (
        <div className="col-12">
            <div className="advantage-card">
                <div className="advantage-card_image">
                    <img
                        src={item.image_discount}
                        className="w-100 h-100 avantage-image-left"
                        alt="Sports Kampanya"
                    />
                </div>
                <div className="advantage-bottom_container">
                    <div className="advantage-title">
                        <h5>{item.name}</h5>
                        <p style={{ color: "#0080c8", fontWeight: "bold" }}>
                            İndirim Oranı {item.discount_description}
                        </p>
                        <div className="advantage-location_container">
                            <img src={LocationIcon} alt="Sports" />
                            <p className="advantage-location">{item.city}</p>
                        </div>
                    </div>

                    <div className="advantage-address">
                        <p>{item.address}</p>
                        <p style={{ fontSize: "0.8rem" }}>
                            *{item.validity_time && dateHandler()} tarihine
                            kadar geçerlidir.
                        </p>
                    </div>
                    <span>{item.phone}</span>
                </div>
            </div>
        </div>
    );
};

export default AdvantageCard;
