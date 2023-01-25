import { Card } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import './banner.css'
const Banner = ({ image, title, bread, space, talks, noBread }) => {
  return (
    <div className={space ? 'page-banner' : 'page-banner mb-5'}>
      <img src={image} alt="" className="page-img" />
      <div className="page-banner-title-content">
        <h1>{title}</h1>{' '}
      </div>
      {!noBread && (
        <div
          className={!talks ? 'page-banner_title' : 'page-banner_title_talks'}
        >
          <h6>
            Anasayfa / <span>{bread}</span>
          </h6>
        </div>
      )}
      {/* <div className='page-banner_content'>Sports International>Etkinlikler</div> */}
    </div>
  )
}

export default Banner
