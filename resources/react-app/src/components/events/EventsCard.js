import React from 'react'
import "../../components/events/events-card.css"
import { Card } from 'react-bootstrap'
function EventsCard({ Img }) {
  return (
    <Card className=' event-card mb-4 mt-4' style={{ width: "100%" }}>
      <Card.Img src={Img} />
    </Card>
  )
}

export default EventsCard
