import React, { useEffect, useState, useRef } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useFormik } from 'formik'
import whiteArrow from '../../../assets/images/contact/white-arrow.png'
import allService from '../../../service/services'
import Loading from '../../loading/Loading'
import ConfirmModal from '../confirmModal/ConfirmModal'
import * as Yup from 'yup'
import './contactForm.css'

function ContactForm({ formClubList, loading }) {
  const [submitted, setSubmitted] = useState(false)
  const handleClose = () => setShowModal(false)
  const [showModal, setShowModal] = useState(false)
  const formik = useFormik({
    initialValues: {
      fullname: '',
      phone: '',
      email: '',
      club_id: '',
      kvkk: true,
      address: '',
      purpose_id: '',
      purpose_other: '',
      message: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().min(5).required(),
      phone: Yup.string().min(10).max(11).required(),
      email: Yup.string().email().required(),
      gender: Yup.string().required(),
      address: Yup.string().min(20).max(150),
      club_id: Yup.string().required(),
      purpose_id: Yup.string().required(),
      purpose_other: Yup.string().min(20).max(150),
      message: Yup.string(),
    }),

    onSubmit: async (values, { resetForm }) => {
      setSubmitted(true)
      const value = JSON.stringify(values, null, 2)
      const result = await allService.contactPost(value)

      if (result.data.message) {
        setSubmitted(false)
        setShowModal(true)
        resetForm()
      }
    },
  })

  if (loading) {
    return <Loading />
  }

  return (
    !loading && (
      <div className="row">
        <ConfirmModal
          setShowModal={setShowModal}
          showModal={showModal}
          handleClose={handleClose}
        />
        <div className="contact-forms d-flex justify-content-center">
          <form
            onSubmit={formik.handleSubmit}
            className="contact-form-container"
          >
            <div
              className="d-flex justify-content-center"
              style={{ position: 'relative' }}
            >
              <input
                className={
                  formik.touched.fullname && formik.errors.fullname
                    ? 'contact-form-input-error'
                    : 'contact-form-input'
                }
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Ad Soyad"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
              />

              <select
                style={{ color: 'gray', position: 'relative' }}
                className={
                  formik.touched.gender && formik.errors.gender
                    ? 'contact-form-input-error'
                    : 'contact-form-input'
                }
                id="gender"
                name="gender"
                type="select"
                placeholder="Cinsiyet"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
              >
                <option style={{ color: 'black' }} selected>
                  Cinsiyet
                </option>
                <option style={{ color: 'black' }} value="E">
                  Erkek
                </option>
                <option style={{ color: 'black' }} value="K">
                  Kadın
                </option>
              </select>
              <div className="right-select">
                <img
                  className="contact-select-arrow-white"
                  src={whiteArrow}
                  alt=""
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <input
                className={
                  formik.touched.email && formik.errors.email
                    ? 'contact-form-input-error'
                    : 'contact-form-input'
                }
                id="email"
                placeholder="E-Posta"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              <input
                className={
                  formik.touched.phone && formik.errors.phone
                    ? 'contact-form-input-error'
                    : 'contact-form-input'
                }
                id="phone"
                placeholder="Telefon"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                className={
                  formik.touched.address && formik.errors.address
                    ? 'contact-form-input-error'
                    : 'contact-form-input'
                }
                id="address"
                placeholder="Adres"
                name="address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
            </div>
            <div
              className="select-input-form d-flex justify-content-center"
              style={{ position: 'relative' }}
            >
              <select
                style={{ color: 'gray' }}
                className={
                  formik.touched.club_id && formik.errors.club_id
                    ? 'contact-form-input-select-error'
                    : 'contact-form-input-select'
                }
                id="club_id"
                placeholder="Kulüp"
                name="club_id"
                type="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.club_id}
              >
                <option style={{ color: 'black' }} selected>
                  Kulüp Seçiniz
                </option>
                {formClubList?.map((item) => (
                  <option
                    key={item.id}
                    style={{ color: 'black' }}
                    value={item.id}
                  >
                    {item.title}
                  </option>
                ))}
              </select>
              <div className="left-select">
                <img
                  className="contact-select-arrow-white"
                  src={whiteArrow}
                  alt=""
                />
              </div>
              <select
                style={{ color: 'gray' }}
                className={
                  formik.touched.purpose_id && formik.errors.purpose_id
                    ? 'contact-form-input-select-error'
                    : 'contact-form-input-select'
                }
                id="purpose_id"
                placeholder="İletişim Türü"
                name="purpose_id"
                type="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.purpose_id}
              >
                <option style={{ color: 'black' }}>İletişim Tercihi</option>
                <option value={1} style={{ color: 'black' }}>
                  Yeni üyelik
                </option>
                <option value={2} style={{ color: 'black' }}>
                  Üyelik yenileme
                </option>
                <option value={3} style={{ color: 'black' }}>
                  Bilgi almak
                </option>
                <option value={4} style={{ color: 'black' }}>
                  Öneri şikayet
                </option>
                <option value={7} style={{ color: 'black' }}>
                  Teşekkür
                </option>
                <option value={5} style={{ color: 'black' }}>
                  Diğer
                </option>
              </select>

              <div className="right-select">
                <img
                  className="contact-select-arrow-white"
                  src={whiteArrow}
                  alt=""
                />
              </div>
            </div>
            {formik.values.purpose_id === '5' && (
              <div className="d-flex justify-content-center">
                <input
                  className={
                    formik.touched.purpose_other && formik.errors.purpose_other
                      ? 'contact-form-input-error'
                      : 'contact-form-input'
                  }
                  id="purpose_other"
                  placeholder="Diğer açıklama"
                  name="purpose_other"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.purpose_other}
                />
              </div>
            )}
            <div className="d-flex justify-content-center">
              <input
                className={
                  formik.touched.message && formik.errors.message
                    ? 'contact-form-input-error'
                    : 'contact-form-input'
                }
                id="message"
                name="message"
                placeholder="Mesaj"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
            </div>
            <p className="form-information">
              Vereceğiniz kişisel bilgileriniz yeni üyelik, üyelik yenileme,
              bilgi sağlanması, öneri ve şikayet süreçlerinde tarafımızca
              işlenecek ve uygun güvenlik önlemleri alınarak muhafaza
              edilecektir. Kişisel Verilerin Korunması Hakkında Bilgilendirme
              metnine <a href="">buradan</a> ulaşabilirsiniz.
            </p>
            <div className="d-flex justify-content-center">
              <button
                disabled={submitted}
                className="contact-form-submit-button"
                type="submit"
              >
                {submitted ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <p style={{ margin: '0px' }}>Gönder</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default ContactForm
