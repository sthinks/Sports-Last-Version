import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import allService from '../../service/services'
import { useNavigate } from 'react-router-dom'
import './phoneConfirm.css'

function PhoneConfirm({
  showModal,
  setShowModal,
  phone,
  handleClose,
  descpriction,
  btnText,
  btnTitle,
}) {
  const navigate = useNavigate()
  const [phoneVerify, setPhoneVerify] = useState()
  const [textColor, setTextColor] = useState()
  const [confirmValidate, setConfirmValidate] = useState(false)
  const [confirmText, setConfirmText] = useState()
  const validationPhoneHandler = async () => {
    const result = await allService.joinUsPhoneValidation(phoneVerify)

    if (result.data.message === 'hatalı kod girdiniz') {
      console.log('hatalı kod girdiniz')
      setConfirmValidate(true)
      setConfirmText('Hatalı kod girdiniz, Tekrar deneyiniz.')
      setTextColor(false)
      setTimeout(navigate(0), 5000)
    } else {
      setConfirmValidate(true)
      setConfirmText('Doğrulama başarılı')
      setTextColor(true)
      setTimeout(navigate(0), 1000)
    }
  }
  return (
    <Modal
      show={showModal}
      onHide={() => {
        handleClose()
        setTimeout(navigate(0), 1000)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {btnTitle && (
            <p
              style={
                btnTitle === 'Uyarı'
                  ? { color: '#d10000' }
                  : { color: '#2a9100' }
              }
            >
              {btnTitle}
            </p>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {descpriction ? (
          <div>{descpriction}</div>
        ) : (
          <>
            <div>
              Üyeliğinizi tamamlamak için telefonunuza gelen doğrulama kodunu
              giriniz.
            </div>
            <input
              className="modal-phone-verify-input"
              placeholder="Doğrulama Kodu"
              value={phoneVerify}
              onChange={(e) => setPhoneVerify(e.target.value)}
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!btnText ? (
          <Button variant="white" onClick={() => validationPhoneHandler()}>
            Gönder
          </Button>
        ) : (
          <Button
            variant="white"
            onClick={() => {
              setShowModal(!showModal)
              setTimeout(navigate(0), 1000)
            }}
          >
            Kapat
          </Button>
        )}
        {confirmValidate && (
          <p
            className={
              textColor ? 'phone-confirm-accept' : 'phone-confirm-reject'
            }
          >
            {confirmText}
          </p>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default PhoneConfirm
