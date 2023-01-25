import React from 'react'
import FooterLogo from '../../assets/images/footer-logo.png'
import './footer.css'
import AppStore from '../../assets/images/footer-app-store.png'
import Android from '../../assets/images/footer-android.png'
import { TfiFacebook } from 'react-icons/tfi'
import { FiInstagram } from 'react-icons/fi'
import { RiTwitterFill } from 'react-icons/ri'
import footerSignature from '../../assets/images/footer-signature.png'
import { FaTiktok } from 'react-icons/fa'
import { AiFillYoutube } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { size } from 'lodash'

export const Footer = () => {
  const topScroll = () => {
    document.body.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="footer-logo">
                <img src={FooterLogo} alt="Logo" />
              </div>
            </div>
            <div className="col-md-8">
              <div className="footer-top_right d-flex justify-content-end">
                <img
                  className="footer-signature"
                  src={footerSignature}
                  alt="İhsan doğramacı"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="footer-list">
                <ul>
                  <h4>KURUMSAL</h4>
                  <li>
                    <a
                      onClick={() => topScroll()}
                      href="/kurumsal/kullanim-kosullari"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Kullanım Koşulları
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => topScroll()}
                      href="/kurumsal/kisisel-verilerin-korunmasi"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Kişisel Verilerin Korunması
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => topScroll()}
                      href="/kurumsal/kvkk-calisan-bilgilendirme"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      KVKK Çalışan Bilgilendirme
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => topScroll()}
                      href="http://www.sportsinternational.com.tr/FR.03.pdf"
                      target="blank"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      ISO 27001 Bilgi Güvenliği Politikaları
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => topScroll()}
                      href="/kurumsal/sitede-kullanilan-cerezler-hakkinda-bilgilendirme"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Sitede Kullanılan Çerezler Hakkında Bilgilendirme
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-list">
                <ul>
                  <h4>KULÜPLERİMİZ</h4>
                  <li>
                    <Link
                      onClick={() => topScroll()}
                      to="/kuluplerimiz/ankara-bilkent-sports-international"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Ankara, Bilkent Sports International
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => topScroll()}
                      to="/kuluplerimiz/i-zmir-mavisehir-sports-international"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      İzmir, Mavişehir Sports International
                    </Link>
                  </li>
                  <li>
                    {' '}
                    <Link
                      onClick={() => topScroll()}
                      to="/kuluplerimiz/i-stanbul-atakoy-sports-international"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      İstanbul, Ataköy Sports International
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => topScroll()}
                      to="/kuluplerimiz/ankara-cankaya-sports-international"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Ankara, Çankaya Sports International
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => topScroll()}
                      to="/kuluplerimiz/mersin-marina-sports-international"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Mersin, Marina Sports International
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => topScroll()}
                      to="/kuluplerimiz/ankara-kuzu-effect-sports-international"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Ankara, Kuzu Effect Sports International
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => topScroll()}
                      to="/kuluplerimiz/i-stanbul-kadikoy-sports-international"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      İstanbul, Kadıköy Sports International
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => topScroll()}
                      to="/kuluplerimiz/ankara-bilkent-rhythm-by-spa"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Ankara, Bilkent Rhythm by SPA
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => topScroll()}
                      to="/kuluplerimiz/ankara-cankaya-vadi-rhythm-by-spa"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Ankara, Çankaya Vadi Rhythm by SPA
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-5">
              <div className="footer_social-media">
                <ul>
                  <li>
                    <a
                      href="https://apps.apple.com/tr/app/sports-international/id1452480394?l=tr"
                      target="blank"
                    >
                      <img
                        alt=""
                        src={AppStore}
                        style={{ width: '140px', height: 'auto' }}
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://play.google.com/store/apps/details?id=infoart.worfact.sports&pli=1"
                      target="blank"
                    >
                      <img
                        alt=""
                        src={Android}
                        style={{ width: '140px', height: 'auto' }}
                      />
                    </a>
                  </li>
                </ul>
                <div>
                  <a
                    href="https://www.facebook.com/SportsInternationalClubs"
                    target="blank"
                  >
                    <TfiFacebook />
                  </a>
                  <a
                    href="https://www.instagram.com/sportsinternational/"
                    target="blank"
                  >
                    <FiInstagram />
                  </a>
                  <a href="https://twitter.com/sportsintclubs" target="blank">
                    <RiTwitterFill />
                  </a>
                  <a href="https://www.youtube.com/grupsports" target="blank">
                    <AiFillYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="pt-3 pb-3 text-center"
        style={{ background: '#002f4a', fontSize: '12px' }}
      >
        <span className="text-white">
          © {new Date().getFullYear()}, Tüm Hakları Sports International’a
          Aittir.{' '}
        </span>
        <span style={{ color: 'white' }}>
          Designed by{' '}
          <a
            href="https://www.socialthinks.com/tr"
            target="_blank"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Socialthinks
          </a>
        </span>
      </div>
    </div>
  )
}
