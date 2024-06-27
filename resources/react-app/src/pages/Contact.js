import React, { useEffect, useState } from "react";
import hereSports from "../assets/images/contact/contact-header.png";
import AccordionShopList from "../components/contact/shopList/ShopList";
import ContactForm from "../components/contact/contactForm/ContactForm";
import "../components/contact/Contact.css";
import { useService } from "../service/useService";
import allService from "../service/services";
import { Helmet } from "react-helmet";
function Contact() {
    const { data, isLoading, refetch } = useService("getclubs", () =>
        allService.fetchClubs()
    );
    const shopList = [
        {
            name: "Ankara, Bilkent Sports International",
            address: "Üniversiteler, Bilkent Blv. No:1, 06800 Çankaya/Ankara",
            phone: "444 75 35",
            map: "https://goo.gl/maps/d4nu4Md1L9d1PYky9",
        },
        {
            name: "İzmir, Mavişehir Sports International",
            address: "Mavişehir, 2040. Sk. No:3, 35590 Karşıyaka/İzmir",
            phone: "444 75 35",
            map: "https://goo.gl/maps/3S6MRV5svkwhCewT9",
        },

        {
            name: "Ankara, Çankaya Sports International",
            address:
                "Güzeltepe, İlkadım, Dikmen Vadisi 3. Etap No: 3-B D:105, 06690 Çankaya/Ankara",
            phone: "444 75 35",
            map: "https://goo.gl/maps/F1WGgd2Evu7Eq91A9",
        },
        {
            name: "Mersin, Marina Sports International",
            address:
                "Eğriçam, Adnan Menderes Blv. No:134, 33160 Yenişehir/Mersin",
            phone: "444 75 35",
            map: "https://goo.gl/maps/UH6cjFKyhWfmZ32D7",
        },
        {
            name: "Ankara, Kuzu Effect Sports International",
            address: "Oran, Zülfü Tiğrel Cd. No:1, 06450 Çankaya/Ankara",
            phone: "444 75 35",
            map: "https://goo.gl/maps/fxNxX2Qj75nV1RKB7",
        },
        {
            name: "İstanbul, Kadıköy Sports International",
            address:
                "Acıbadem Mahallesi Tepe Nautilus Avm, Fatih Sk. No: 1, 34718 Kadıköy",
            phone: "444 75 35",
            map: "https://goo.gl/maps/unTnAgzbpCgVqQ7k9",
        },
        {
            name: "Ankara, Bilkent Rhythm by SPA",
            address:
                " Üniversiteler, İhsan Doğramacı Blv No:1, 06800 Çankaya/Ankara",
            phone: "444 75 35",
            map: "https://goo.gl/maps/pqdvGFf9o4WTGq9QA",
        },
        {
            name: "Ankara, Çankaya Vadi Rhythm by SPA",
            address:
                "Güzeltepe, İlkadım, Dikmen Vadisi 3. Etap No: 3-B D:105, 06690 Çankaya/Ankara",
            phone: "444 75 35",
            map: "https://goo.gl/maps/v5LfSpZqvasfKb4CA",
        },
    ];

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>İletişim</title>
                <link rel="canonical" href={`/iletisim`} />
                <meta name="description" content="İletisim" />
                <meta name="description" content="Sports İnternational" />
            </Helmet>
            <div className="">
                <div className="container">
                    <div className="contact-container">
                        <div className="contact-content">
                            <div className="row">
                                <div className="d-flex justify-content-center">
                                    <img
                                        className="contact-header-title"
                                        src={hereSports}
                                        alt=""
                                    />
                                </div>
                                <div className="">
                                    <div className="d-flex flex-column mt-5 mb-5">
                                        {shopList.map((item) => (
                                            <AccordionShopList item={item} />
                                        ))}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <div className="contact-form-title">
                                        İLETİŞİM FORMU
                                    </div>
                                </div>
                                <ContactForm
                                    formClubList={data}
                                    loading={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-contact-cards">
                    <div className="contact-left-side">
                        <a className="contact-phone" href="tel:444 75 35">
                            <p className="contact-footer-text">
                                Öneri ve görüşleriniz için
                            </p>
                            <p className="contact-footer-phone">444 75 35</p>
                            <p className="contact-footer-text">
                                Müşteri Hizmetleri numaramızdan
                                <br /> bize ulaşabilirsiniz.
                            </p>
                        </a>
                    </div>
                    <div className="contact-right-side">
                        <a className="contact-phone" href="tel:444 75 35">
                            <p className="contact-footer-text">
                                Öneri ve görüşleriniz için
                            </p>
                            <p className="contact-footer-phone">444 75 35</p>
                            <p className="contact-footer-text">
                                Müşteri Hizmetleri numaramızdan
                                <br /> bize ulaşabilirsiniz.
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Contact;
