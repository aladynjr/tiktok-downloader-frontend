import React from 'react'
 import YouTube from 'react-youtube';
// import Plyr from "plyr-react";
// import "plyr-react/dist/plyr.css";

const videoSrc = {
  type: "video",
  sources: [
    {
      src: "rjjjlJw2cgM",
      provider: "youtube"
    }
  ]
};

function HowToBox() {

  return (
    <div>
      <div className='HowToBoxContainer' >
        <section className="text snipcss-vfnyj">
          <div className="text__container">
            <h2 className="snip-h2">
              How to download TikTok Videos & Cover Images without watermarks?
            </h2>
            <div className="text__desc">
              TOKdownloads is a free tool helping you download TikTok Videos and Cover Images without watermarks. You can even download more than 1 video at time by pasting your links at one time. TOKdownloads will automatically download them all for you with 1 click of a button! Save TikTok Videos with the best quality in HD resolution. Just copy and paste your TikTok video links up above and hit download! It’s that simple.    </div>
            {/* <div className="info-arrow">
      It's so simple, you can save your videos in three easy steps 
      <img src="https://ssstik.io/images/info-arrow.png" alt="" className="snip-img"/>
    </div> */}
          </div>
          <div className='VideoContainer' >

          <YouTube videoId="rjjjlJw2cgM" />
          </div>

          <div /*className="blue__block"*/>
            {/* <h3 className="snip-h3">
      How to download TikTok without watermark?
    </h3> */}
            {/* <ol>
      <li>
        <b>
          Find a TikTok
        </b>
        - play a video that you want to save to your mobile device, using the TT app
      </li>
      <li>
        <b>
          Copy the link
        </b>
        - tap "Share" (the arrow button on top of a chosen video), and then tap "Copy link"
      </li>
      <li>
        <b>
          Download
        </b>
        - go back to sssTikTok and paste the link in the text field on the page and tap on the "Download" button
      </li>
    </ol> */}
            {/* <Plyr source={videoSrc} /> */}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HowToBox