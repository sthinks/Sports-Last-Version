import React from 'react'
import { Link } from 'react-router-dom';
import "../../components/events/event-card-pagination.css"
function EventsCardPagination({ dataPerPage, totalPosts, paginate }) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPosts / dataPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <>
            <div className='containers mb-5 mt-5'> {(pageNumber.length !== 1) ? <>
                <div className='line'></div>
                <ul className='pagination-list mt-4'>
                    {
                        pageNumber.map(number => {
                            return (
                                <li key={number} className="page-item">
                                    <Link onClick={() => paginate(number)} className='page-link' href="#"  >
                                        {number}
                                    </Link>
                                </li>
                            )

                        })
                    }



                </ul></> : ""}
            </div>
        </>
    )
}

export default EventsCardPagination
