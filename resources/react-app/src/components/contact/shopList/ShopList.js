import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

function ShopList({ item }) {
  return (
    <div>
      <Accordion defaultActiveKey="0" className="mt-3">
        <Accordion.Item eventKey="1">
          <Accordion.Header className="">{item.name}</Accordion.Header>
          <Accordion.Body>
            <div className="contact-shop-description d-flex justify-content-between collapse show">
              <div className="shop-address">{item.address}</div>
              <div className="shop-phone-number">T: {item.phone}</div>
              <div className="shop-map">
                <a href={item.map} target="_blank">
                  <button className="map-button">Harita</button>
                </a>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default ShopList
