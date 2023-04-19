import React, { useEffect, useState } from 'react'
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
  const [showModal, setShowModal] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [btnTitle, setBtnTitle] = useState('')
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
      fullname: Yup.string()
        .min(5, 'Ad soyad en az 5 karakter olmalı.')
        .required('Zorunlu alan.'),
      phone: Yup.string()
        .required('Zorunlu alan.')
        .matches(
          phoneRegExp,
          'Lütfen telefon numaranızı istenilen formatta giriniz. Örn: 0530---1515',
        ),
      email: Yup.string()
        .email('Lütfen geçerli bir email adresi giriniz.')
        .required('Zorunlu alan.'),
      club_id: Yup.string().required('Zorunlu alan.'),
      kvkk: Yup.boolean().oneOf([true]).required('Zorunlu alan.'),
    }),

    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true)
      try {
        const result = await allService.joinUsPost(values)
        // if (result.data.isVerificationRequired === true) {
        //   setIsLoading(false)
        //   setShowModal(true)
        //   resetForm()
        // } else if (result.data.isVerificationRequired === false) {
        //   setDescpriction('Sms hatası ! Tekrar deneyiniz...')
        //   setbtnText(true)
        //   setIsLoading(false)
        //   setShowModal(true)
        //   resetForm()
        // } else if (result.data.message === 'telefon kaydı zaten mevcut!') {
        //   setDescpriction(
        //     'Girdiğiniz telefon numarası ile sistemimize daha önce kayıt yapılmış. Girmiş olduğunuz bilgiler tekrardan tarafımıza iletildi, Teşekkürler.',
        //   )
        //   setbtnText(true)
        //   setIsLoading(false)
        //   setShowModal(true)
        //   resetForm()
        // } else if (result.data.message === 'sms hatası code  alınamıyor...') {
        //   setbtnText(true)
        //   setIsLoading(false)
        //   setDescpriction(
        //     `Sms doğrulama kodunuz çok fazla tekrardan dolayı gönderilemiyor, lütfen gün içinde tekrar deneyiniz.`,
        //   )
        //   setShowModal(true)
        //   resetForm()
        // } else {
        //   setbtnText(true)
        //   setIsLoading(false)
        //   setDescpriction('Formunuz şuanda gönderilemiyor.')
        //   setShowModal(true)
        //   resetForm()
        // }
        if (result.status === 200) {
          setDescpriction('Formunuz başarıyla gönderilmiştir.')
          setbtnText(true)
          setIsLoading(false)
          setShowModal(true)
          setBtnTitle('Teşekkürler')
          resetForm()
        } else if (result.status === 500) {
          setDescpriction('Formunuz hata verdi.')
          setbtnText(true)
          setIsLoading(false)
          setBtnTitle('Uyarı')
          setShowModal(true)
          resetForm()
        }
      } catch (error) {
        console.log(error)
      }
    },
  })

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
                  <div
                    className="form-error-content"
                    style={{
                      color: 'red',

                      marginLeft: '5px',
                    }}
                  >
                    {formik.touched.fullname && formik.errors.fullname}
                  </div>
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
                  <div
                    className="form-error-content"
                    style={{
                      color: 'red',

                      marginLeft: '5px',
                    }}
                  >
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="form-element col-md-6 col-sm-12 mb-3">
                  <input
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? 'form-input-calltoaction-error'
                        : 'form-input-calltoaction'
                    }
                    id="phone"
                    placeholder="0500-000-00-00"
                    name="phone"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    pattern="[0-9]*"
                    value={formik.values.phone}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <div
                      className="form-error-content"
                      style={{
                        color: 'red',

                        marginLeft: '5px',
                      }}
                    >
                      {formik.errors.phone}
                    </div>
                  )}
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
                  <div
                    className="form-error-content"
                    style={{
                      color: 'red',

                      marginLeft: '5px',
                    }}
                  >
                    {formik.touched.club_id &&
                      formik.errors.club_id &&
                      'Lütfen kulüp seçiniz.'}
                  </div>
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
                        formik.touched.kvkk && formik.errors.kvkk
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

                    <p
                      style={{ margin: '0px', cursor: 'pointer' }}
                      className="text-white "
                    >
                      Tarafıma reklam, pazarlama ve tanıtım içerikli ticari
                      elektronik ileti gönderilmesine muvafakat ediyorum.
                    </p>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="col-md-3 form-button"
                  variant="light"
                  id="message"
                >
                  {loading ? (
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
        <div className="action-card_inner action-card_inner-right">
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
              <form
                className="form-list form-list-right row"
                onSubmit={formik.handleSubmit}
              >
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
                    placeholder="0500-000-00-00"
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
                        formik.touched.kvkk && formik.errors.kvkk
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

                    <p
                      style={{ margin: '0px', cursor: 'pointer' }}
                      className="text-white"
                    >
                      Tarafıma reklam, pazarlama ve tanıtım içerikli ticari
                      elektronik ileti gönderilmesine muvafakat ediyorum.
                    </p>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="col-md-6 form-button"
                  variant="light"
                  id="message"
                >
                  {loading ? (
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
        btnTitle={btnTitle}
      />
    </Card>
  )
}

export default CallToAction
