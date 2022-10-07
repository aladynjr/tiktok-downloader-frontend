import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import $ from 'jquery';
import { FaPlay } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';
import GetID from '../utilities/GetID';
import TiktokUrlValidator from '../utilities/TiktokUrlValidator';
import DownloadFromLink from '../utilities/DownloadFromLink';
import Skeleton from '@mui/material/Skeleton';
import VideoProgressBar from './VideoProgressBar';
import CoverProgressBar from './CoverProgressBar';
import { FiDownload } from 'react-icons/fi'
import clsx from 'clsx';


function SingleVideoDownloader({ mainUrlField, resetResults, setResetResults, startSingleDownload, setStartSingleDownload, videoCover, setVideoCover, singleDownloadRunning, setSingleDownloadRunning, socket, thumbnailProgress, setThumbnailProgress, videoProgress, setVideoProgress, singleVideoSize, setSingleVideoSize, requestID, setRequestID }) {

  //const [mainUrlField, setMainUrlField] = useState('');
  const [urlErrorMessage, setUrlErrorMessage] = useState('');

  console.log({ singleDownloadRunning })

  //RECEIVE SOCKET MESSAGE
  useEffect(() => {
    socket.on('thumbnailProgress', (data) => {
      //  console.log('thumbnail  :  ' + data)
      setThumbnailProgress(data)

    })

    socket.on('videoProgress', (data) => {
      //  console.log('video  :  ' + data)
      setVideoProgress(data)

    })

  }, [socket])

  //send url to get thumbnail
  const [responseID, setResponseID] = useState('')
  const [photoFilename, setPhotoFilename] = useState('')
  const sendUrlToGetPhoto = async (url) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER + '/api/single/url/photo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: url, requestID: requestID })
      })

      const jsonData = await response.json();

      if (jsonData.photosDownloadResult == 'success') {
        setVideoCover(jsonData.videoCover);
        setResponseID(jsonData.id)
        setPhotoFilename(jsonData.filename)
        console.log('%c success : PHOTO is here !', 'color: green');
        if (singleVideoSize) {
          setSingleDownloadRunning(false)
        }
        //setSingleDownloadRunning(false)
      }
    }
    catch (err) {
      console.log(err);
      setSingleDownloadRunning(false)
    }
  }

  //send url to get video
  const [videoFilename, setVideoFilename] = useState('')
  const sendUrlToGetVideo = async (url) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER + '/api/single/url/video', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: url })
      })

      const jsonData = await response.json();

      if (jsonData.videosDownloadResult == 'success') {
        //setVideoCover(jsonData.cover);
        if (videoCover) {
          setSingleDownloadRunning(false)
        }
        setVideoFilename(jsonData.filename)
        setSingleVideoSize(jsonData.size);
        setResponseID(jsonData.id)
        console.log('%c success : VIDEO is here !', 'color: green');
      }
    }
    catch (err) {
      console.log(err);
      setSingleDownloadRunning(false)
    }
  }

  //start download button clicked in parent component
  function StartDownloadButtonClicked() {

    setResetResults(true);
    setVideoCover('');
    setSingleVideoSize('');
    setUrlErrorMessage('')
    setSingleDownloadRunning(true);
    TiktokUrlValidator(mainUrlField, () => { sendUrlToGetPhoto(mainUrlField); sendUrlToGetVideo(mainUrlField) /*sendUrl(mainUrlField)*/ }, () => { setUrlErrorMessage('Error, The url is not a tiktok link!'); setSingleDownloadRunning(false) })

  }

  useEffect(() => {
    if (startSingleDownload) {
      StartDownloadButtonClicked();
    }
    setStartSingleDownload(false)
  }, [startSingleDownload])


  //reset when starting again in parent component
  useEffect(() => {
    if (resetResults) {
      setVideoCover('');
      setSingleVideoSize('');
      setResetResults(false);

    }
  }, [resetResults])

  //hide progress circle after 1 second of completing download 
  const [hideVideoProgress, setHideVideoProgress] = useState(false);
  const [hideCoverProgress, setHideCoverProgress] = useState(false);

  useEffect(() => {
    if (videoProgress >= 100) {
      setTimeout(() => {
        setHideVideoProgress(true)
      }, 1000)
    }
  }, [videoProgress])

  useEffect(() => {
    if (thumbnailProgress >= 100) {
      setTimeout(() => {
        setHideCoverProgress(true)
      }, 1000)
    }
  }, [thumbnailProgress])



  const [option, setOption] = useState(1);

  return (
    <div>
      {(videoCover || singleVideoSize) && <div style={{ marginBottom: '10px' }} >
        <button onClick={() => setOption(1)} >OPTION 1 </button>
        <button onClick={() => setOption(4)} >OPTION 2 </button>
        <button onClick={() => setOption(3)} >OPTION 3 </button>
        <button onClick={() => setOption(2)} >OPTION 4 </button>
      </div>}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '70%', margin: 'auto' }}>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: (videoCover || singleVideoSize) ? '84px' : '0' }} >
        {/* <TextField value={mainUrlField} onChange={(e) => { setMainUrlField(e.target.value) }} label="TikTok Video Url" variant="outlined" /> */}
        {urlErrorMessage && <b style={{ color: 'red' }} >{urlErrorMessage}</b>}


        {(videoCover || singleVideoSize) && <img src={videoCover} className={clsx(option == 1 && 'SingleResultsBackground', option == 2 && 'SingleResultsBackground otheroption', option == 3 && 'SingleResultsBackground otherotheroption', option == 4 && 'SingleResultsBackground otherotherotheroption')} />}
        <div className='SinglePhotoVideoResults'  >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: ' center' }} >
            {((singleDownloadRunning || singleVideoSize) && !hideVideoProgress) && <div className='SingleProgressContainer' > <VideoProgressBar videoProgress={videoProgress} singleVideoSize={singleVideoSize} /></div>}

            {(singleDownloadRunning && !singleVideoSize) && <Skeleton style={{ backgroundColor: '#f5f5f55c', marginBottom: '40px' }} variant="rectangular" width={200} height={400} />}

            {singleVideoSize && <video style={{ height: '300px', borderRadius: '10px' }} controls>
              <source src={process.env.REACT_APP_SERVER + '/api/single/display/video/' + videoFilename} type="video/mp4" />
              Your browser does not support HTML video.
            </video>}


            {/* {singleVideoSize && <LoadingButton
              endIcon={<FiDownload style={{ color: 'white', fontSize: '22px' }} />}
              variant="contained"
              style={{ marginBlock: '35px', backgroundColor: '#ff0050	', fontSize: '17px', width: 'fit-content', padding: '12px 20px' }} >

              <a target="_blank" style={{ textDecoration: 'none', color: 'white' }}
                href={process.env.REACT_APP_SERVER + '/api/single/download/video/' + videoFilename}  >
                Download Video</a>

            </LoadingButton>} */}

            {singleVideoSize && <div className="GradientButton" style={{ filter: 'hue-rotate(348deg)  ', marginLeft:'-16px', marginTop:'28px' }}>
              <div class="_9l28 snipcss-PjCMs" >
                <div class="_9l2w">
                  <div class="_8g86 _8kis _9o26 _a742" style={{ marginTop: '0', display: 'flex', height: '60px', alignItems: 'center', cursor: 'pointer' }}  >
                    <img class="  _8gj0 _8gj2 _9o2u _9o2w _9pju img snip-img full" src="https://static.xx.fbcdn.net/rsrc.php/yD/r/LM6M2GhE0cX.svg" />

                    <a role="button" className='GradientButtonText'   >
                      Download Video <FiDownload className='GradientButtonIcon'  />
                    </a>
                    <img class=" _8gj0 _8gj1 _9o2u _9o2x _9pju img border" src="https://static.xx.fbcdn.net/rsrc.php/ys/r/t-mEQ1-Zrdi.svg" />
                  </div>
                </div>

              </div>
            </div>}
           

            {/* <h3 style={{color:'whitesmoke'}} >{singleVideoSize}</h3> */}

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: ' center' }} >
            {((singleDownloadRunning || videoCover) && !hideCoverProgress) && <div className='SingleProgressContainer' ><CoverProgressBar thumbnailProgress={thumbnailProgress} videoCover={videoCover} /> </div>}

            {(singleDownloadRunning && !videoCover) && <Skeleton style={{ backgroundColor: '#f5f5f55c', marginBottom: '40px' }} variant="rectangular" width={200} height={400} />}
            {videoCover && <img src={videoCover} style={{ height: '300px', maxWidth: '80vw', borderRadius: '10px' }} />}
            {/* {videoCover && <LoadingButton
              endIcon={<FiDownload style={{ color: 'black', fontSize: '22px' }} />}
              variant="contained" style={{ marginBlock: '35px', backgroundColor: '#00f2ea	', color: 'black', width: 'fit-content', fontSize: '17px', padding: '12px 20px' }} >
              <a target="_blank " style={{ textDecoration: 'none', color: 'black', fontWeight: '900' }}
                href={process.env.REACT_APP_SERVER + '/api/single/download/photo/' + photoFilename}  >
                Download Cover</a>
            </LoadingButton>} */}

{videoCover && <div className="GradientButton" style={{ filter: 'hue-rotate(298deg)  ', marginLeft:'-16px', marginTop:'28px' }}>
              <div class="_9l28 snipcss-PjCMs" >
                <div class="_9l2w">
                  <div class="_8g86 _8kis _9o26 _a742" style={{ marginTop: '0', display: 'flex', height: '60px', alignItems: 'center', cursor: 'pointer' }}  >
                    <img class="  _8gj0 _8gj2 _9o2u _9o2w _9pju img snip-img full" src="https://static.xx.fbcdn.net/rsrc.php/yD/r/LM6M2GhE0cX.svg" />

                    <a role="button" className='GradientButtonText'   >
                      Download Cover <FiDownload className='GradientButtonIcon'  />
                    </a>
                    <img class=" _8gj0 _8gj1 _9o2u _9o2x _9pju img border" src="https://static.xx.fbcdn.net/rsrc.php/ys/r/t-mEQ1-Zrdi.svg" />
                  </div>
                </div>

              </div>
            </div>}

          </div>

        </div>


      </div>

    </div>
  )
}

export default SingleVideoDownloader


{/* {videoCover && <Button variant="contained"   > <a onClick={() => DownloadFromLink(videoCover, videoCover + '.png')}  >Download Thumbnail</a></Button>} */ }