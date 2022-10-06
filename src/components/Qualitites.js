import React from 'react'
import {FcLike} from 'react-icons/fc'
import {FcMultipleCameras} from 'react-icons/fc'
import {FcAndroidOs} from 'react-icons/fc'
// import Pic1 from '../assets/point1.png'
// import Pic2 from '../assets/point2.png'
// import Pic3 from '../assets/point3.png'
function Qualitites() {
  var height = 160;
  return (
    <div className='QualityContainer' style={{marginTop:'-27px'}} >


<div class="main-highlights snipcss-pOU4h" style={{maxWidth: '900px', margin: '0 auto' }}>
  <div class="responsive">
    <div class="is-center u-m-bottom img-wrapper">
      {/* <img src={Pic1} loading="lazy" height={height} class="snip-img"/> */}
    </div>
    <div class="content is-center">
      <h4 class="text-color--main u-bigger-text snip-h4">
      Bulk Download
      </h4>
      <div  >
      Download more than 1 video / cover image at a time with our bulk download.
      </div>
    </div>
  </div>
  <div class="responsive">
    <div class="is-center u-m-bottom img-wrapper">
      {/* <img src={Pic2} loading="lazy" height={height} class="snip-img" /> */}
    </div>
    <div class="content is-center">
      <h4 class="text-color--main u-bigger-text snip-h4">
      Unlimited Downloads
      </h4>
      <div>
      Download as many videos as you want with NO watermark instantly.

      </div>
    </div>
  </div>
  <div class="responsive">
    <div class="is-center u-m-bottom img-wrapper">
      {/* <img src={Pic3} loading="lazy" height={height}  class="snip-img" /> */}
    </div>
    <div class="content is-center">
      <h4 class="text-color--main u-bigger-text snip-h4">
      Download Cover Images
      </h4>
      <div>
      Download the cover images of any TikTok video in 1 click!

      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Qualitites