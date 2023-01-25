import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import '../../components/calltoaction/callToAction.css'
import { SlArrowDown } from 'react-icons/sl'
import PhoneConfirm from '../phoneConfirm/PhoneConfirm'
import { useService } from '../../service/useService'
import allService from '../../service/services'
import Spinner from 'react-bootstrap/Spinner'
import { useFormik } from 'formik'
import { AiFillCloseCircle } from 'react-icons/ai'
import * as Yup from 'yup'

function CallToAction({ menu, form, setForm }) {
  const [btnText, setbtnText] = useState()
  const [descpriction, setDescpriction] = useState()
  const [loading, setIsLoading] = useState(false)
  const phoneRegExp = /^(05)([0-9]{2})s?([0-9]{3})s?([0-9]{2})s?([0-9]{2})$/
  const formik = useFormik({
    initialValues: {
      fullname: '',
      phone: '',
      email: '',
      club_id: '',
      kvkk: false,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().min(5).required(),
      phone: Yup.string().matches(phoneRegExp),
      email: Yup.string().email().required(),
      club_id: Yup.string().required(),
      kvkk: Yup.boolean().oneOf([true], 'This field must be checked'),
    }),

    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true)
      const value = JSON.stringify(values, null, 2)
      const result = await allService.joinUsPost(value)

      if (result.data.isVerificationRequired === true) {
        setIsLoading(false)
        setShowModal(true)
        resetForm()
      } else if (result.data.isVerificationRequired === false) {
        setDescpriction('Sms hatası ! Tekrar deneyiniz...')
        setbtnText(true)
        setIsLoading(false)
        setShowModal(true)
        resetForm()
      } else if (result.data.message === 'telefon kaydı zaten mevcut!') {
        setDescpriction('Girmiş olduğunuz telefon numarası sistemde mevcut.')
        setbtnText(true)
        setIsLoading(false)
        setShowModal(true)
        resetForm()
      } else {
        setbtnText(true)
        setIsLoading(false)
        setDescpriction('Formunuz şuanda gönderilemiyor.')
        setShowModal(true)
        resetForm()
      }
    },
  })

  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const { data, isLoading, refetch } = useService('clubs', () =>
    allService.fetchClubs(),
  )

  return (
    <Card className="action-card">
      {menu === false ? (
        <div className="action-card_inner">
          <div className="action-cart_inner-form">
            <div className="action-card_title">
              <div
                style={{ position: 'relative', width: '100%', height: '100%' }}
              >
                <h1 className="text-center">HEMEN SPORTS'LU OL!</h1>
              </div>
            </div>
            <div className="form-container">
              <form className="form-list row" onSubmit={formik.handleSubmit}>
                <div className="form-element col-md-6 col-sm-12 mb-3">
                  <input
                    className={
                      formik.touched.fullname && formik.errors.fullname
                        ? 'form-input-calltoaction-error'
                        : 'form-input-calltoaction'
                    }
                    id="fullname"
                    placeholder="Ad Soyad"
                    name="fullname"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullname}
                  />
                </div>
                <div className="form-element col-md-6 col-sm-12 mb-3">
                  <input
                    className={
                      formik.touched.email && formik.errors.email
                        ? 'form-input-calltoaction-error'
                        : 'form-input-calltoaction'
                    }
                    id="email"
                    placeholder="E-Postanız"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                <div className="form-element col-md-6 col-sm-12 mb-3">
                  <input
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? 'form-input-calltoaction-error'
                        : 'form-input-calltoaction'
                    }
                    id="phone"
                    placeholder="0536XXX1919"
                    name="phone"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    pattern="[0-9]*"
                    value={formik.values.phone}
                  />
                </div>
                <div
                  className="form-element col-md-6 mb-3"
                  style={{ position: 'relative' }}
                >
                  <div className="option-box">
                    <SlArrowDown />
                  </div>
                  <select
                    className={
                      formik.touched.club_id && formik.errors.club_id
                        ? 'form-input-calltoaction-error'
                        : 'form-input-calltoaction'
                    }
                    id="club_id"
                    placeholder="Kulüp"
                    name="club_id"
                    type="select"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.club_id}
                  >
                    <option style={{ fontWeight: 'bold' }}>
                      Kulüp Seçiniz
                    </option>
                    {data?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-text">
                  <p className="text-white">
                    Lütfen aktif üye iseniz; İLETİŞİM FORMUNU doldurarak bizimle
                    iletişime geçiniz.
                  </p>
                  <p className="text-white">
                    Kişisel Verilerin Korunması Kanunu ile ilgili Bilgilendirme
                    Metnini okuduğumu beyanla, kişisel verilerimin bilgilendirme
                    metnine uygun olarak işlenmesine muvafakat ediyorum.
                  </p>
                  <div className="d-flex align-items-center">
                    <input
                      className={
                        formik.touched.club_id && formik.errors.club_id
                          ? 'input-chose'
                          : ''
                      }
                      type="checkbox"
                      id="kvkk"
                      name="kvkk"
                      style={{ marginRight: '10px' }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.kvkk}
                    />
                    {formik.touched.club_id && formik.errors.club_id && (
                      <div
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                          fontSize: '18px',
                        }}
                      >
                        !!!
                      </div>
                    )}
                    <p style={{ margin: '0px' }} className="text-white">
                      Tarafıma reklam, pazarlama ve tanıtım içerikli ticari
                      elektronik ileti gönderilmesine muvafakat ediyorum.
                    </p>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="col-md-3 form-button"
                  variant="light"
                >
                  {isLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <p style={{ margin: '0px' }}>Gönder</p>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="action-card_inner">
          <div
            className="option-box-close"
            onClick={() => setForm(!form)}
            style={{ cursor: 'pointer' }}
          >
            <AiFillCloseCircle color="#000" />
          </div>
          <div className="action-cart_inner-slide">
            <div className="row">
              <div className="col-md-12">
                <h2 className="slide-form-text text-left mt-5">
                  HEMEN <br /> SPORTS'LU OL!
                </h2>
              </div>
            </div>
            <div className="form-container-slide">
              <form className="form-list row" onSubmit={formik.handleSubmit}>
                <div className="form-element-side col-md-12 col-sm-12 mb-3">
                  <input
                    className={
                      formik.touched.fullname && formik.errors.fullname
                        ? 'form-input-calltoaction-side-error'
                        : 'form-input-calltoaction-side'
                    }
                    id="fullname"
                    placeholder="Ad Soyad"
                    name="fullname"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullname}
                  />
                </div>
                <div className="form-element-side col-md-12 col-sm-12 mb-3">
                  <input
                    className={
                      formik.touched.email && formik.errors.email
                        ? 'form-input-calltoaction-side-error'
                        : 'form-input-calltoaction-side'
                    }
                    id="email"
                    placeholder="E-Postanız"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                <div className="form-element-side col-md-12 col-sm-12 mb-3">
                  <input
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? 'form-input-calltoaction-side-error'
                        : 'form-input-calltoaction-side'
                    }
                    id="phone"
                    placeholder="Telefon Numaranız"
                    name="phone"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    pattern="[0-9]*"
                    value={formik.values.phone}
                  />
                </div>
                <div
                  className="form-element-side col-md-12 mb-3"
                  style={{ position: 'relative' }}
                >
                  <div className="option-box-side">
                    <SlArrowDown />
                  </div>
                  <select
                    className={
                      formik.touched.club_id && formik.errors.club_id
                        ? 'form-input-calltoaction-side-error'
                        : 'form-input-calltoaction-side'
                    }
                    id="club_id"
                    placeholder="Kulüp"
                    name="club_id"
                    type="select"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.club_id}
                  >
                    <option style={{ fontWeight: 'bold' }}>
                      Kulüp Seçiniz
                    </option>
                    {data?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-text-side">
                  <p className="text-white">
                    Lütfen aktif üye iseniz; İLETİŞİM FORMUNU doldurarak bizimle
                    iletişime geçiniz.
                  </p>
                  <p className="text-white">
                    Kişisel Verilerin Korunması Kanunu ile ilgili Bilgilendirme
                    Metnini okuduğumu beyanla, kişisel verilerimin bilgilendirme
                    metnine uygun olarak işlenmesine muvafakat ediyorum.
                  </p>
                  <div className="d-flex align-items-center">
                    <input
                      className={
                        formik.touched.club_id && formik.errors.club_id
                          ? 'input-chose'
                          : ''
                      }
                      type="checkbox"
                      id="kvkk"
                      name="kvkk"
                      style={{ marginRight: '10px' }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.kvkk}
                    />

                    <p style={{ margin: '0px' }} className="text-white">
                      Tarafıma reklam, pazarlama ve tanıtım içerikli ticari
                      elektronik ileti gönderilmesine muvafakat ediyorum.
                    </p>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="col-md-6 form-button"
                  variant="light"
                >
                  {isLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <p style={{ margin: '0px' }}>Gönder</p>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      <PhoneConfirm
        setShowModal={setShowModal}
        showModal={showModal}
        phone={formik.values.phone}
        handleClose={handleClose}
        descpriction={descpriction}
        btnText={btnText}
      />
    </Card>
  )
}

export default CallToAction
