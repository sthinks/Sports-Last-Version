import React from 'react'
import visionFlag from '../assets/images/visionMission/vision-flags.png'
import '../components/visionMission/visionMission.css'

function VizionMission() {
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="vision-mission-container d-flex justify-content-center">
            <div className="col-lg-9 col-sm-12 vision-mission-content">
              <div className="col-lg-5" style={{ marginTop: '10%' }}>
                <div className="vision-text">
                  <h1 className="vision-mission-header-title">Vizyon</h1>
                  <p className="vision-mission-text">
                    Sağlıklı, mutlu, güçlü, kendini iyi hisseden nesiller için;{' '}
                    <br />
                    spot ve sağlıklı yaşam kültürünü, her gün ileriye giden{' '}
                    <br />
                    hizmet anlayışımızla geniş kitlelere ulaştırmak.
                  </p>
                </div>
                <div className="mission-text">
                  <h1 className="vision-mission-header-title">Misyon</h1>
                  <p className="vision-mission-text">
                    Sağlıklı bir hayatın gerekliliği olarak değişen ve gelişen{' '}
                    <br />
                    hayat tarzları için sport sektöründe; üye memnuniyeti ve{' '}
                    <br />
                    kalite anlayışı ışığında, tüm takım arkadaşlarının en <br />
                    değerli kaynak olduğu bilinciyle büyüyerek, sürdürülebilir{' '}
                    <br />
                    marka kimliğimizle Bilkent Üniversitesi için gerekli <br />
                    kaynağı yaratmak.
                  </p>
                </div>
              </div>
              <div className="col-lg-5">
                <img className="vision-mission-right-image" src={visionFlag} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VizionMission
