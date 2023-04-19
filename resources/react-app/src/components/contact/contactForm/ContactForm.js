import React, { useEffect, useState, useRef } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useFormik } from 'formik'
import whiteArrow from '../../../assets/images/contact/white-arrow.png'
import allService from '../../../service/services'
import Loading from '../../loading/Loading'
import ConfirmModal from '../confirmModal/ConfirmModal'
import * as Yup from 'yup'
import './contactForm.css'
import ErrorModal from '../confirmModal/ErrorModal'

function ContactForm({ formClubList, loading }) {
  const [submitted, setSubmitted] = useState(false)
  const handleClose = () => setShowModal(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalError, setShowModalError] = useState(false)
  const handleCloseError = () => setShowModalError(false)
  const phoneRegExp = /^(05)([0-9]{2})s?([0-9]{3})s?([0-9]{2})s?([0-9]{2})$/
  const formik = useFormik({
    initialValues: {
      fullname: '',
      phone: '',
      email: '',
      gender: '',
      club_id: '',
      kvkk: true,
      address: '',
      purpose_id: '',
      purpose_other: '',
      message: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(5, 'Minimum 5 karakter girmelisiniz.')
        .required('Zorunlu alan.'),
      phone: Yup.string()
        .required('Zorunlu alan.')
        .matches(phoneRegExp, 'İstenilen format. Örn: 0530---1515'),
      email: Yup.string()
        .email('Lütfen geçerli bir email giriniz.')
        .required('Zorunlu alan.'),
      gender: Yup.string().required('Zorunlu alan.'),
      address: Yup.string()
        .min(20, 'Minimum 20 karakter')
        .max(150, 'Maximum 150 karakter.')
        .required('Zorunlu alan.'),
      club_id: Yup.string().required('Zorunlu alan.'),
      purpose_id: Yup.string().required('Zorunlu alan.'),
      purpose_other: Yup.string()
        .min(20, 'Minimum 20 karakter')
        .max(150, 'Maximum 150 karakter.'),
      message: Yup.string(),
    }),

    onSubmit: async (values, { resetForm }) => {
      setSubmitted(true)
      const value = JSON.stringify(values, null, 2)
      const result = await allService.contactPost(value)
      if (result.data.message === 'işlem başarılı') {
        setSubmitted(false)
        setShowModal(true)
        resetForm()
      } else {
        setSubmitted(false)
        setShowModalError(true)
        resetForm()
      }
    },
  })

  if (loading) {
    return <Loading />
  }

  return (
    <div className="row">
      <ConfirmModal
        setShowModal={setShowModal}
        showModal={showModal}
        handleClose={handleClose}
      />
      <ErrorModal
        setShowModalError={setShowModalError}
        showModalError={showModalError}
        handleCloseError={handleCloseError}
      />
      <div className="contact-forms d-flex justify-content-center">
        <form onSubmit={formik.handleSubmit} className="contact-form-container">
          <div
            className="d-flex justify-content-center "
            style={{ position: 'relative', marginBottom: '5px' }}
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
            <div
              className="contact-form-error"
              style={{
                color: 'red',
                marginLeft: '5px',
              }}
            >
              {formik.touched.fullname && formik.errors.fullname}
            </div>
            <select
              style={{ color: 'gray' }}
              className={
                formik.touched.gender && formik.errors.gender
                  ? 'contact-form-input-select-error'
                  : 'contact-form-input-select'
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
            <div
              className="contact-form-error-right"
              style={{
                color: 'red',

                marginLeft: '5px',
              }}
            >
              {formik.touched.gender && formik.errors.gender}
            </div>
            <div className="right-select">
              <img
                className="contact-select-arrow-white"
                src={whiteArrow}
                alt=""
              />
            </div>
          </div>
          <div
            className="d-flex justify-content-center "
            style={{ position: 'relative', marginBottom: '5px' }}
          >
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
            <div
              className="contact-form-error"
              style={{
                color: 'red',

                marginLeft: '5px',
              }}
            >
              {formik.touched.email && formik.errors.email}
            </div>
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
            <div
              className="contact-form-error-right"
              style={{
                color: 'red',
                marginLeft: '5px',
              }}
            >
              {formik.touched.phone && formik.errors.phone}
            </div>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ position: 'relative', marginBottom: '5px' }}
          >
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
            <div
              className="contact-form-error"
              style={{
                color: 'red',

                marginLeft: '5px',
              }}
            >
              {formik.touched.address && formik.errors.address}
            </div>
          </div>
          <div
            className="select-input-form d-flex justify-content-center"
            style={{ position: 'relative', marginBottom: '5px' }}
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
              {formClubList?.map((item, i) => (
                <option key={i} style={{ color: 'black' }} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <div
              className="contact-form-error"
              style={{
                color: 'red',

                marginLeft: '5px',
              }}
            >
              {formik.touched.club_id && formik.errors.club_id}
            </div>
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
            <div
              className="contact-form-error-right"
              style={{
                color: 'red',

                marginLeft: '5px',
              }}
            >
              {formik.touched.purpose_id && formik.errors.purpose_id}
            </div>

            <div className="right-select">
              <img
                className="contact-select-arrow-white"
                src={whiteArrow}
                alt=""
              />
            </div>
          </div>
          {formik.values.purpose_id === '5' && (
            <div
              className="d-flex justify-content-center"
              style={{ position: 'relative', marginBottom: '5px' }}
            >
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
              <div
                className="contact-form-error"
                style={{
                  color: 'red',

                  marginLeft: '5px',
                }}
              >
                {formik.touched.purpose_other && formik.errors.purpose_other}
              </div>
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
            Vereceğiniz kişisel bilgileriniz yeni üyelik, üyelik yenileme, bilgi
            sağlanması, öneri ve şikayet süreçlerinde tarafımızca işlenecek ve
            uygun güvenlik önlemleri alınarak muhafaza edilecektir. Kişisel
            Verilerin Korunması Hakkında Bilgilendirme metnine{' '}
            <a href="">buradan</a> ulaşabilirsiniz.
          </p>
          <div className="d-flex justify-content-center">
            <button
              disabled={submitted}
              className="contact-form-submit-button"
              type="submit"
              id="messageLong"
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
}

export default ContactForm
