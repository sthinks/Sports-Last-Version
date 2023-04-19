import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'
import './confirmModal.css'

function ErrorModal({ showModalError, setShowModalError, handleCloseError }) {
  const scrollToTop = () => {
    setShowModalError(false)
  }

  return (
    <Modal show={showModalError} onHide={() => handleCloseError()}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#ff6c6c' }}>
          Formunuz iletilemedi.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Form gönderilirken bir hata meydana geldi, lütfen tekrar deneyiniz.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="white" onClick={() => scrollToTop()}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ErrorModal
