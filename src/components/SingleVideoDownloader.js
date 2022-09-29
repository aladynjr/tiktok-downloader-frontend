import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import $ from 'jquery';
import { FaPlay } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';
import GetID from '../utilities/GetID';
import TiktokUrlValidator from '../utilities/TiktokUrlValidator';
import DownloadFromLink from '../utilities/DownloadFromLink';

function SingleVideoDownloader({ mainUrlField, resetResults, setResetResults, startSingleDownload, setStartSingleDownload, videoCover, setVideoCover, setSingleDownloadRunning }) {


  //check if url is valid then send url to backend 
  //const [mainUrlField, setMainUrlField] = useState('');
  const [urlErrorMessage, setUrlErrorMessage] = useState('');



//send url to get thumbnail
const sendUrlToGetPhoto = async (url) => {
  try {
    let response = await fetch(process.env.REACT_APP_SERVER + '/api/single/url/photo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link: url })
    })

    const jsonData = await response.json();

    if (jsonData.download == 'success') {
      setVideoCover(jsonData.cover);

      console.log('%c success : PHOTO is here !', 'color: green');
      //setSingleDownloadRunning(false)
    }
  }
  catch (err) {
    console.log(err);
    setSingleDownloadRunning(false)
  }
}

//send url to get video
  const [singleVideoSize, setSingleVideoSize] = useState('')

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

    if (jsonData.download == 'success') {
      //setVideoCover(jsonData.cover);
      setSingleDownloadRunning(false)
      setSingleVideoSize(jsonData.progress);

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
  return (
    <div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        {/* <TextField value={mainUrlField} onChange={(e) => { setMainUrlField(e.target.value) }} label="TikTok Video Url" variant="outlined" /> */}
        <b style={{ color: 'red' }} >{urlErrorMessage}</b>


        <h3>{singleVideoSize}</h3>
        {videoCover && <b style={{ opacity: '0.5' }} >preview</b>}
        {videoCover && <img src={videoCover} alt="cover" width='320' />}
        {videoCover && <LoadingButton variant="contained" color='success' target="_blank" loading={!singleVideoSize}  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/single/download/' + GetID(mainUrlField)); window.location = process.env.REACT_APP_SERVER + '/api/single/download/' + GetID(mainUrlField); }}  >Download One Video</a></LoadingButton>}
        {videoCover && <Button variant="contained" color='success'  > <a onClick={() => DownloadFromLink(videoCover, videoCover + '.png')}  >Download Thumbnail</a></Button>}
      </div>
    </div>
  )
}

export default SingleVideoDownloader