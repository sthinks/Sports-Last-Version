import React from "react";
import visionFlag from "../assets/images/visionMission/vision-flags.png";
import "../components/visionMission/visionMission.css";
import { Helmet } from "react-helmet";
function VizionMission() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Vizyon Misyon</title>
                <link rel="canonical" href="/vizyon-misyon" />
                <meta name="description" content="Sports İnternational" />
                <meta name="description" content="Vizyon Misyon" />
                <meta name="description" content="Vizyon" />
                <meta name="description" content="Misyon" />
            </Helmet>
            <div>
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="vision-mission-container d-flex justify-content-center">
                            <div className="col-lg-9 col-sm-12 vision-mission-content">
                                <div
                                    className="col-lg-5"
                                    style={{ marginTop: "10%" }}
                                >
                                    <div className="vision-text">
                                        <h1 className="vision-mission-header-title">
                                            Vizyon
                                        </h1>
                                        <p
                                            className="vision-mission-text"
                                            style={{ textAlign: "left" }}
                                        >
                                            Sağlıklı, mutlu, güçlü, kendini iyi
                                            hisseden nesiller için; spor ve
                                            sağlıklı yaşam kültürünü, her gün
                                            ileriye giden hizmet anlayışımızla
                                            geniş kitlelere ulaştırmak.
                                        </p>
                                    </div>
                                    <div className="mission-text">
                                        <h1 className="vision-mission-header-title">
                                            Misyon
                                        </h1>
                                        <p
                                            className="vision-mission-text"
                                            style={{ textAlign: "left" }}
                                        >
                                            Sağlıklı bir hayatın gerekliliği
                                            olarak değişen ve gelişen hayat
                                            tarzları için spor sektöründe; üye
                                            memnuniyeti ve kalite anlayışı
                                            ışığında, tüm takım arkadaşlarının
                                            en değerli kaynak olduğu bilinciyle
                                            büyüyerek, hem markamızın hem de
                                            Bilkent Üniversitesi'nin gelişimini
                                            ve sürdürebilirliği için gerekli
                                            kaynağı yaratmak.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <img
                                        className="vision-mission-right-image"
                                        src={visionFlag}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VizionMission;
