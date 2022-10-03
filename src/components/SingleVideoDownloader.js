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
import {FiDownload} from 'react-icons/fi'
function SingleVideoDownloader({ mainUrlField, resetResults, setResetResults, startSingleDownload, setStartSingleDownload, videoCover, setVideoCover, singleDownloadRunning, setSingleDownloadRunning, socket,thumbnailProgress, setThumbnailProgress,videoProgress, setVideoProgress, singleVideoSize, setSingleVideoSize, requestID, setRequestID }) {

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


  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '70%', margin: 'auto' }}>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        {/* <TextField value={mainUrlField} onChange={(e) => { setMainUrlField(e.target.value) }} label="TikTok Video Url" variant="outlined" /> */}
        <b style={{ color: 'red' }} >{urlErrorMessage}</b>



        <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'center', width: '80%', flexWrap: "wrap", padding:'30px' }} >

          <div style={{ display: 'flex', flexDirection: 'column', marginInline:'55px' }} >
            {((singleDownloadRunning || singleVideoSize ) && !hideVideoProgress) && <div className='SingleProgressContainer' > <VideoProgressBar videoProgress={videoProgress}  singleVideoSize={singleVideoSize} /></div>}

            {(singleDownloadRunning && !singleVideoSize) && <Skeleton style={{ backgroundColor: '#f5f5f55c' }} variant="rectangular" width={400} height={700} />}

            {singleVideoSize && <video style={{width:'400px', maxWidth:'80vw'}} controls>
              <source src={process.env.REACT_APP_SERVER + '/api/single/display/video/' + videoFilename} type="video/mp4" />
              Your browser does not support HTML video.
            </video>}
            {/*(videoCover || singleVideoSize)*/singleVideoSize && <LoadingButton endIcon={<FiDownload style={{color:'white'}} />} variant="contained" color='success' style={{ margin: '7px' }} > <a target="_blank" style={{ textDecoration: 'none', color: 'white' }} href={process.env.REACT_APP_SERVER + '/api/single/download/video/' + videoFilename}  >Download Video</a></LoadingButton>}
            {/* <h3 style={{color:'whitesmoke'}} >{singleVideoSize}</h3> */}

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginInline:'55px' }} >
            {((singleDownloadRunning || videoCover) && !hideCoverProgress) &&<div className='SingleProgressContainer' ><CoverProgressBar thumbnailProgress={thumbnailProgress}  videoCover={videoCover} /> </div>}

            {(singleDownloadRunning && !videoCover) && <Skeleton style={{ backgroundColor: '#f5f5f55c' }} variant="rectangular" width={400} height={700} />}
            {videoCover && <img src={videoCover} style={{width:'400px', maxWidth:'80vw'}} />}
            {/*(videoCover || singleVideoSize)*/videoCover && <LoadingButton endIcon={<FiDownload style={{color:'white'}} />} variant="contained" color='success' style={{ margin: '7px' }} > <a target="_blank " style={{ textDecoration: 'none', color: 'white' }} href={process.env.REACT_APP_SERVER + '/api/single/download/photo/' + photoFilename}  >Download Thumbnail</a></LoadingButton>}
          </div>

        </div>


      </div>
    </div>
  )
}

export default SingleVideoDownloader


{/* {videoCover && <Button variant="contained" color='success'  > <a onClick={() => DownloadFromLink(videoCover, videoCover + '.png')}  >Download Thumbnail</a></Button>} */ }