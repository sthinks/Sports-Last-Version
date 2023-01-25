import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'
import './confirmModal.css'

function ConfirmModal({ showModal, setShowModal, handleClose }) {
  const scrollToTop = () => {
    navigate('/')
    document.body.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  const navigate = useNavigate()
  return (
    <Modal show={showModal} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#0080c8' }}>
          Formunuz başarıyla iletildi.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        İletişim isteğiniz başarıyla gönderildi. En kısa zamanda geri dönüş
        yapılacaktır.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="white" onClick={() => scrollToTop()}>
          Anasayfa
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
