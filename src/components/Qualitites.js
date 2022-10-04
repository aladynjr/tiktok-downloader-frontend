import React from 'react'
import {FcLike} from 'react-icons/fc'
import {FcMultipleCameras} from 'react-icons/fc'
import {FcAndroidOs} from 'react-icons/fc'

function Qualitites() {
  return (
    <div className='QualityContainer' >

    {/* <div className='QualityCards' >
        
<div  className='QualityCard' >
    <FcLike style={{fontSize:'100px'}} />
    <h2>Placeholder</h2>
    <p>Download videos in the best quality available.</p>
</div>

<div  className='QualityCard' >
    <FcMultipleCameras style={{fontSize:'100px'}} />
    <h2>Placeholder</h2>
    <p>Download videos in multiple formats.</p>

</div>

<div  className='QualityCard' >
    <FcAndroidOs style={{fontSize:'100px'}} />
    <h2>Placeholder</h2>
    <p>Download videos on your android device.</p>
    </div>

</div> */}

<div class="main-highlights snipcss-pOU4h" style={{maxWidth: '900px', margin: '0 auto' }}>
  <div class="responsive">
    <div class="is-center u-m-bottom img-wrapper">
      <img src="https://ssstik.io/images/endless.png" loading="lazy" height="125" width="137" class="snip-img"/>
    </div>
    <div class="content is-center">
      <h4 class="text-color--main u-bigger-text snip-h4">
        Selling Point 1
      </h4>
      <div>
        Save as many videos as you need, no limits or any other restrictions.
      </div>
    </div>
  </div>
  <div class="responsive">
    <div class="is-center u-m-bottom img-wrapper">
      <img src="https://ssstik.io/images/no-watermark.png" loading="lazy" height="125" width="134.25" class="snip-img" />
    </div>
    <div class="content is-center">
      <h4 class="text-color--main u-bigger-text snip-h4">
        Selling Point 2
      </h4>
      <div>
        Download TikTok without watermark, remove a TT logo.
      </div>
    </div>
  </div>
  <div class="responsive">
    <div class="is-center u-m-bottom img-wrapper">
      <img src="https://ssstik.io/images/audio.png" loading="lazy" height="125" width="150" class="snip-img" />
    </div>
    <div class="content is-center">
      <h4 class="text-color--main u-bigger-text snip-h4">
        Selling Point 3
      </h4>
      <div>
        Save videos in hd quality, MP4 file format or convert to audio MP3.
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Qualitites