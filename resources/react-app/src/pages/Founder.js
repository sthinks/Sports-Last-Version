import React from 'react'
import ourFounder from '../assets/images/founder/kurucumuz.png'
import signature from '../assets/images/founder/imza.png'
import BilkentLogo from '../assets/images/founder/bilkent-holding-logo.png'
import Bilkent from '../assets/images/founder/bilkent.png'
import ServicesBilkent from '../assets/images/founder/services-bilkent.png'
import CompanyPolicy from '../assets/images/founder/company-policy.png'
import '../components/founder/founder.css'
import BannerImage from '../assets/images/banner/brief-intro.png'
import Banner from '../components/banner/Banner'

function Founder() {
  return (
    <div className="">
      <Banner image={BannerImage} title="Kurucumuz" bread="Kurucumuz" />
      <div className="container">
        <div className="mt-4 mb-5">
          <h2 className="our-founder-title">Kurucumuz</h2>
          <p className="our-founder-text">
            Yaşamın mileetine, bilime, çocuklara, gençlere, tüm insanlığa adamış
            olan Prof. Dr. İhsan Doğramacı, 1968 yılında inşaat sektöründe
            faaliyet göstermek üzere temelleri atılan Dilek İnşaat ile yola
            çıkmıştır. 1969 yılında Tepe Ağaç Metal ve Makine Sanayi ile
            Meteksan şirketleri kurulmuştur ve 1986 yılında gerçekleşen
            yapılanmayla tüm şirketler Bilkent Holding çatısı altında
            toplanmıştır.
          </p>
          <p>
            Sayın Prof.Dr.İhsan Doğramacı: tüm dünyada katkı sağladığı sağlık,
            eğitim ve bilim kurumlarıyla daima saygıyla hatırlanacaktır.
          </p>
          <img
            className="founder-image"
            src={ourFounder}
            alt="İhsan Doğramacı"
          />
        </div>
      </div>
      <div className="signature">
        <img className="signature-image" src={signature} alt="Signature" />
      </div>
      <div className="founder-card-container">
        <div className="row">
          <div className="col-md-6" style={{ padding: '0' }}>
            <div className="founder-card-left">
              <img
                src={Bilkent}
                style={{ width: '100%', height: 'auto' }}
                alt="Bilkent Holding"
              />
              <div className="bilkent-card-inner">
                <img src={BilkentLogo} alt="Logo" />
                <button className="founder-card-left-button">
                  DETAYLARI GÖR
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="d-flex flex-column justify-content-between"
              style={{ height: '100%' }}
            >
              <div className="founder-card-right-policy">
                <img
                  src={ServicesBilkent}
                  alt=""
                  style={{ width: '100%', height: 'auto' }}
                />
                <div className="bilkent-card-inner">
                  <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    ŞİRKET POLİTİKASI
                  </h3>
                  <button
                    className="founder-card-left-button"
                    style={{ color: 'black' }}
                  >
                    DETAYLARI GÖR
                  </button>
                </div>
              </div>
              <div className="founder-card-right-information-service">
                <img
                  src={CompanyPolicy}
                  alt=""
                  style={{ width: '100%', height: 'auto' }}
                />
                <div className="bilkent-card-inner">
                  <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    BİLGİ TOPLUM HİZMETLERİ
                  </h3>
                  <button className="founder-card-left-button">
                    DETAYLARI GÖR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Founder
