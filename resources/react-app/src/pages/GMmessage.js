import React from 'react'
import hakanÖztürk from '../assets/images/gmmessage/Hakan.png'
import Banner from '../components/banner/Banner'
import '../components/GMmessage/gmMessage.css'
import BannerImage from '../assets/images/banner/brief-intro.png'

function GMmessage() {
  return (
    <div className="gm-message-parent-container mt-5">
      <div className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="gm-image-content">
                <img
                  className="gm-image"
                  alt="Hakan Öztürk"
                  src={hakanÖztürk}
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="gm-message-text">
                <h5>Değerli Sportslular,</h5>
                <p>
                  Sports International olarak her biri alanında uzman tüm takım
                  arkadaşlarımızla birlikte sektöründe lider bir kuruluşuz ve
                  1994 yılından bu yana sizleri misafir etmekten mutluluk
                  duyuyoruz.
                </p>
                <p>
                  Üyelerimize, çalışma arkadaşlarımıza, çevreye ve topluma karşı
                  sorumluluklarımızın bilincinde; teknolojiyi etkili kullanan,
                  kalitesinden asla ödün vermeyen, ulusal & uluslararası
                  standartlara uygun hizmetler sunan ve kendini bir yaşam alanı
                  olarak adlandıran Sports International Ailesi olarak, değerli
                  üyelerimizin memnuniyetini artırmak için çalışıyoruz.
                </p>
                <p>
                  Aynı kalite standardı ve anlayışla yönetilen tüm
                  tesislerimizde; üyelerimize ve yeni nesillere spor alışkanlığı
                  kazandırmayı, sağlıklı bir yaşam tarzına sahip olmalarına
                  yardımcı olmayı amaçlıyor ve bunun yanında insanların iş
                  dünyası dışında kendilerine vakit ayıracakları, sosyal
                  hayatlarını geçirebilecekleri güvenli ve hijyenik bir ortam
                  sağlıyoruz.
                </p>
                <p>
                  Tüm faaliyetlerimizi sistematik ve düzenli bir şekilde
                  değerlendirmek, çalışan eğitim ve gelişim programları ile
                  desteklemek, hizmet standartlarımızı daha iyiye doğru
                  yöneltmek; her zaman yolumuza ışık oluyor.
                </p>
                <p>
                  Ben de aktif spor yapan biri olarak sporun toplum sağlığına
                  kattığı değerin artması için biz ve bizim gibi kaliteli,
                  güvenilir ve saygın kuruluşların artması ve desteklenmesi
                  gerektiğini düşünüyorum. Bununla ilgili hem tesislerimize hem
                  de çalışanlarımıza yönelik yatırımlarımızı hiç durmadan
                  planlıyor ve gerçekleştiriyoruz.
                </p>
                <p>Saygılarımla,</p>
                <p style={{ color: '#0080c8' }}>
                  Genel Müdür <br /> Hakan Öztürk
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GMmessage
