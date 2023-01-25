import React from 'react'
import hakanÖztürk from '../assets/images/gmmessage/Hakan.png'
import Banner from '../components/banner/Banner'
import '../components/GMmessage/gmMessage.css'
import BannerImage from '../assets/images/banner/brief-intro.png'

function GMmessage() {
  return (
    <div className="gm-message-parent-container">
      <Banner
        image={BannerImage}
        title="Genel Müdür Mesajı"
        bread="Genel Müdür Mesajı"
      />
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
                <h5>Consectetur magna</h5>
                <p>
                  velit fugiat. Dolor anim dolore ipsum quis aliquip non minim
                  consequat cillum et veniam voluptate reprehenderit. Labore
                  cupidatat mollit quis ad enim amet nisi non duis culpa
                  proident ipsum magna voluptate.
                </p>
                <p>
                  Ullamco excepteur in culpa proident commodo aliqua irure. Sunt
                  adipisicing enim ad officia quis aliquip elit officia dolor do
                  non nulla ut occaecat. Consequat commodo elit reprehenderit
                  deserunt ea. Ipsum id ea deserunt occaecat sint exercitation.
                  Non labore amet incididunt magna consectetur anim incididunt
                  ex nostrud tempor dolor id nostrud.Consectetur magna elit
                </p>
                <p>
                  deserunt occaecat sint exercitation. Non labore amet
                  incididunt magna consectetur anim incididunt ex nostrud tempor
                  dolor id nostrud. Consectetur magna elit incididunt consequat
                  ad eiusmod cupidatat labore laborum enim incididunt voluptate.
                  Incididunt nostrud commodo officia ullamco magna cillum fugiat
                </p>
                <p>
                  deserunt occaecat sint exercitation. Non labore amet
                  incididunt magna consectetur anim incididunt ex nostrud tempor
                  dolor id nostrud. Consectetur magna elit incididunt consequat
                  ad eiusmod cupidatat labore laborum enim incididunt voluptate.
                  Incididunt nostrud commodo officia ullamco magna cillum fugiat
                </p>
                <p>
                  velit fugiat. Dolor anim dolore ipsum quis aliquip non minim
                  consequat cillum et veniam voluptate reprehenderit. Labore
                  cupidatat mollit quis ad enim amet nisi non duis culpa
                  proident ipsum magna voluptate.
                </p>
                <p>
                  velit fugiat. Dolor anim dolore ipsum quis aliquip non minim
                  consequat cillum et veniam voluptate reprehenderit. Labore
                  cupidatat mollit quis ad enim amet nisi non duis culpa
                  proident ipsum magna voluptate.
                </p>
                <p>
                  deserunt occaecat sint exercitation. Non labore amet
                  incididunt magna consectetur anim incididunt ex nostrud tempor
                  dolor id nostrud. Consectetur magna elit incididunt consequat
                  ad eiusmod cupidatat labore laborum enim incididunt voluptate.
                  Incididunt nostrud commodo officia ullamco magna cillum fugiat
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
