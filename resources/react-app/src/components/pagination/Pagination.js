import React from 'react'
import './pagination.css'
import { Link } from 'react-router-dom'
function Pagination({ totalPosts, postPerPage, setCurrentPage, currentPage }) {
  let pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i)
  }
  return (
    <div className="containers-pagination">
      <ul
        className={
          pages.length === 0
            ? 'pagination-list-none mt-4'
            : 'pagination-list mt-4'
        }
      >
        {pages?.map((item) => (
          <li className="page-item" key={item}>
            <a
              className={currentPage == item ? 'page-link-active' : 'page-link'}
              href="#events"
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
