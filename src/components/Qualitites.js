import React from 'react'
import { FcLike } from 'react-icons/fc'
import { FcMultipleCameras } from 'react-icons/fc'
import { FcAndroidOs } from 'react-icons/fc'
import Pic1 from '../assets/point1.png'
import Pic2 from '../assets/point2.png'
import Pic3 from '../assets/point3.png'
function Qualitites() {
  var height = 160;
  return (
    <div className='QualityContainer' style={{ marginTop: '-27px' }} >


      <div className="main-highlights snipcss-pOU4h" style={{ maxWidth: '900px', margin: '0 auto', flexWrap:'wrap' }}>
        <div className="responsive">
          <div className="is-center u-m-bottom img-wrapper">
            <img src={Pic2} loading="lazy" height={height} className="snip-img" />
          </div>
          <div className="content is-center">
            <h4 className="text-color--main u-bigger-text snip-h4">
              Multi Download
            </h4>
            <div style={{ textAlign: 'left' }}  >
              Save time by downloading multiple videos at once.
            </div>
          </div>
        </div>
        <div className="responsive">
          <div className="is-center u-m-bottom img-wrapper">
            <img src={Pic3} loading="lazy" height={height} className="snip-img" />
          </div>
          <div className="content is-center">
            <h4 className="text-color--main u-bigger-text snip-h4">
              Unlimited Downloads
            </h4>
            <div style={{ textAlign: 'left' }} >
              Download unlimited TikTok videos with NO watermark.
            </div>
          </div>
        </div>
        <div className="responsive">
          <div className="is-center u-m-bottom img-wrapper">
            <img src={Pic1} loading="lazy" height={height} className="snip-img" />
          </div>
          <div className="content is-center">
            <h4 className="text-color--main u-bigger-text snip-h4">
              Download Cover Images
            </h4>
            <div style={{ textAlign: 'left' }} >
              Download the cover images of any TikTok video with 1 click!

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Qualitites