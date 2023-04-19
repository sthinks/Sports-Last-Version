import React from 'react'
import CallToAction from '../components/calltoaction/CallToAction'
import First from '../assets/images/aboutus/brief-intro/first.png'
import Second from '../assets/images/aboutus/brief-intro/second.png'
import Third from '../assets/images/aboutus/brief-intro/third.png'
import MoveOnBg from '../assets/images/aboutus/brief-intro/move-on-bg.png'
import MoveOnIcon from '../assets/images/aboutus/brief-intro/move-on-icon.png'
import '../components/briefintro/brief-intro.css'
import { Helmet } from 'react-helmet'

export const BriefIntro = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Kısaca Biz</title>
        <link rel="canonical" href="/kisaca-biz" />
        <meta name="description" content="Sports International" />
        <meta name="description" content="Kısaca Biz" />
      </Helmet>
      <div>
        <div className="brief-intro_text">
          <div className="text-center">
            <h4>Sports International Ailesi olarak;</h4>
            <p style={{ margin: '0px' }}>
              1994 yılından bu yana her gün daha da ileriye giderek, kalite ve
              müşteri memnuniyeti anlayışımız ile büyümeye devam ediyoruz.
            </p>
          </div>
        </div>
        <div className="brief-intro_images">
          <div className="brief-intro-card_item">
            <img src={First} />
            <div className="brief-intro-card_text">
              <p>
                Spor ve sağlıklı yaşam konularında alanında uzman eğitmenlerimiz
                ve tüm destek personelimizle;
              </p>
              <p>
                İstanbul, Ankara, İzmir ve Mersin’de olmak üzere toplam 9 farklı
                tesisimizde güler yüzlü bir hizmet sağlıyoruz.
              </p>
            </div>
          </div>
          <div className="brief-intro-card_item">
            <img src={Second} />
          </div>
          <div className="brief-intro-card_item">
            <img src={Third} />
          </div>
          <div className="brief-intro-card_item">
            <img src={First} />
            <div className="brief-intro-card_text">
              <p style={{ fontSize: '20px' }}>
                Mutlulukla çalışma motivasyonumuzu değerli üyelerimizin
                enerjisinden alıyor, her gün büyüyen bir aile olmamızın sırrını
                içimizdeki Sports aşkıyla açıklıyoruz.
              </p>
            </div>
          </div>
          <div className="brief-intro-card_item">
            <img src={MoveOnBg} />
            <img className="dream-move-on-img" src={MoveOnIcon} />
          </div>
        </div>
        <CallToAction menu={false} />
      </div>
    </>
  )
}
