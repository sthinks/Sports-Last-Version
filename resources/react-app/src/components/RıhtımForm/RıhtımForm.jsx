import React, { useState } from "react";
import "./rıhtımForm.css";
import { FaLocationArrow } from "react-icons/fa6";
import { useFormik } from "formik";
import { useParams } from "react-router";
import axios from "axios";
import * as Yup from "yup";
function RıhtımForm() {
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(null);
    const { slug } = useParams();
    let param = window.location.pathname;
    param = param.split("/");

    const validationSchema = Yup.object({
        ad_soyad: Yup.string().required("Ad Soyad zorunludur"),
        telefon: Yup.string()
            .required("Telefon zorunludur")
            .matches(/^[0-9]+$/, "Telefon sadece rakamlardan oluşmalıdır"),
        mail: Yup.string()
            .email("Geçerli bir e-posta adresi girin")
            .required("E-posta zorunludur"),
        form_alani: Yup.string().required("Form alanı zorunludur"),
        mesaj: Yup.string().required("Mesaj zorunludur"),
        kvkk: Yup.boolean().oneOf([true]).required("Zorunlu alan."),
    });
    const formik = useFormik({
        initialValues: {
            ad_soyad: "",
            telefon: "",
            mail: "",
            form_alani:
                slug === "ankara-cankaya-vadi-rhythm-by-spa" ? "spa" : slug,
            mesaj: "",
            kvkk: "false",
            bayi: param[2],
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await axios.post(
                    "https://www.sportsinternational.com.tr/portal/rihtim/rihtim_ekle.php",
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (res.data.status === "success") {
                    resetForm();
                    setModal(true);
                    setStatus("success");
                } else {
                    setModal(true);
                    setStatus("error");
                }
            } catch (error) {
                console.error("Error sending POST request", error);
            }
        },
    });
    const getErrorMessages = () => {
        const errors = formik.errors;
        const touched = formik.touched;
        const errorMessages = [];

        for (const key in errors) {
            if (touched[key]) {
                errorMessages.push(errors[key]);
            }
        }

        return errorMessages;
    };
    return (
        <div className="d-flex justify-content-center flex-column align-items-center mt-5">
            <div className="form-title-container">
                <p className="form-background-text">SportsInternational</p>
                <p className="form-front-text">
                    Başvuru Formu <FaLocationArrow className="form-arrow" />
                </p>
            </div>
            <div className="form-container">
                <form
                    className="d-flex flex-wrap"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="w-50 d-flex flex-column p-2">
                        <input
                            className="contact-form-input"
                            id="ad_soyad"
                            name="ad_soyad"
                            type="text"
                            placeholder="Ad Soyad"
                            onChange={formik.handleChange}
                            value={formik.values.ad_soyad}
                        />
                    </div>
                    <div className="w-50 d-flex flex-column p-2">
                        <input
                            className="contact-form-input"
                            id="telefon"
                            name="telefon"
                            placeholder="Telefon"
                            type="telefon"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                    </div>

                    <div
                        className={
                            slug === "ankara-bilkent-rhythm-by-spa"
                                ? "w-50 d-flex flex-column p-2"
                                : "w-100 d-flex flex-column p-2"
                        }
                    >
                        <input
                            className="contact-form-input"
                            id="mail"
                            name="mail"
                            type="mail"
                            placeholder="Mail Adresi"
                            onChange={formik.handleChange}
                            value={formik.values.mail}
                        />
                    </div>
                    {slug === "ankara-bilkent-rhythm-by-spa" && (
                        <div className="w-50 d-flex flex-column p-2">
                            <select
                                className="contact-form-input"
                                id="form_alani"
                                name="form_alani"
                                placeholder="Hizmet Seçiniz"
                                onChange={formik.handleChange}
                                value={formik.values.form_alani}
                                required // burada required select etiketine eklenmeli
                            >
                                <option value="">Hizmet Seçiniz:</option>{" "}
                                {/* Boş seçeneği buraya ekleyin */}
                                <option value="pt">Personal Training</option>
                                <option value="spa">SPA</option>
                            </select>
                            {formik.touched.form_alani &&
                            formik.errors.form_alani ? (
                                <div>{formik.errors.form_alani}</div>
                            ) : null}
                        </div>
                    )}

                    <div className="w-100 d-flex flex-column p-2">
                        <textarea
                            className="contact-form-input pt-4"
                            style={{ height: "150px" }}
                            id="mesaj"
                            name="mesaj"
                            type="textarea"
                            placeholder="Mesajınız"
                            onChange={formik.handleChange}
                            value={formik.values.mesaj}
                        />
                    </div>
                    {formik.submitCount > 0 && (
                        <div className="error-messages d-flex justify-content-center align-items-center p-2 w-100">
                            {getErrorMessages().map((message, index) => (
                                <div
                                    style={{ fontSize: "12px", color: "red" }}
                                    key={index}
                                >
                                    * {message}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="w-100 p-2 d-flex justify-content-center">
                        <div className="form-text">
                            <p className="text-black">
                                Lütfen aktif üye iseniz; İLETİŞİM FORMUNU
                                doldurarak bizimle iletişime geçiniz.
                            </p>
                            <p className="text-black">
                                Kişisel Verilerin Korunması Kanunu ile ilgili
                                Bilgilendirme Metnini okuduğumu beyanla, kişisel
                                verilerimin bilgilendirme metnine uygun olarak
                                işlenmesine muvafakat ediyorum.
                            </p>
                            <div className="d-flex align-items-center">
                                <input
                                    className={
                                        formik.touched.kvkk &&
                                        formik.errors.kvkk
                                            ? "input-chose"
                                            : ""
                                    }
                                    type="checkbox"
                                    id="kvkk"
                                    name="kvkk"
                                    style={{ marginRight: "10px" }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.kvkk}
                                />

                                <p
                                    style={{ margin: "0px", cursor: "pointer" }}
                                    className="text-black "
                                >
                                    Tarafıma reklam, pazarlama ve tanıtım
                                    içerikli ticari elektronik ileti
                                    gönderilmesine muvafakat ediyorum.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center p-2 w-100">
                        <button
                            className="navbar-button btn btn-primary"
                            type="submit"
                        >
                            Gönder
                        </button>
                    </div>
                    {modal && (
                        <div className="w-100 d-flex justify-content-center">
                            {status === "success" ? (
                                <div
                                    class="alert alert-success w-50 text-center"
                                    role="alert"
                                >
                                    Form başarıyla gönderildi.
                                </div>
                            ) : (
                                <div class="alert alert-danger" role="alert">
                                    Form gönderilirken hata oluştu !
                                </div>
                            )}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default RıhtımForm;
