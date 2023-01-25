import React from 'react'
import { Card } from 'react-bootstrap'
import "../events/events-card.css"
function EventsCardFilter({FilteredList}) {
  return (
    <div>
         <Card className=' event-card mb-4 mt-4' style={{ width: "100%" }}>
      <Card.Img src={FilteredList.img} />
    </Card>
    </div>
  )
}

export default EventsCardFilter
