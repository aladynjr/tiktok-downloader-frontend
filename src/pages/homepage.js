import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import $ from 'jquery';
import { FaPlay } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';

function HomePage() {
  const navigate = useNavigate();

  //get video id from any tiktok url
  function GetID(link) {
    const getTiktokID = /tiktok\.com(.*)\/video\/(\d+)/gm.exec(link);
    console.log(getTiktokID[2])
    return getTiktokID[2];
  }

  //opearation status 
  const [singleDownloadRunning, setSingleDownloadRunning] = useState(false)
  console.log({ singleDownloadRunning })
  //check if url is valid then send url to backend 
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [urlErrorMessage, setUrlErrorMessage] = useState('');

  function handleUrl() {
    setSingleDownloadRunning(true)
    let domain = tiktokUrl.split('/')[2];

    if (domain === 'www.tiktok.com' || domain === 'vm.tiktok.com') {
      sendUrl(tiktokUrl);
    } else {
      setUrlErrorMessage('Error, The url is not a tiktok link!')
      setSingleDownloadRunning(false)
    }
  }

  //send url to backend to get video link from api 

  const [videoCover, setVideoCover] = useState('')
  const [singleVideoSize, setSingleVideoSize] = useState('')

  const sendUrl = async (url) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER + '/api/single/url', {
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
        setSingleVideoSize(jsonData.progress);

        console.log('%c success : video downlaoded to server !', 'color: green');

        setSingleDownloadRunning(false)
      }
 
    }
    catch (err) {
      console.log(err);
      setSingleDownloadRunning(false)

    }
  }

  //download image from link 
  function DownloadFromLink(link, type) {
    $.ajax({
      url: link,
      type: 'GET',
      xhrFields: {
        responseType: 'blob'
      },
      success: function (data) {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(data);
        a.href = url;
        a.download = type;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

  return (
    <div>
      <h3>Homepage</h3>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <TextField value={tiktokUrl} onChange={(e) => { setTiktokUrl(e.target.value) }} label="TikTok Video Url" variant="outlined" />

        <LoadingButton variant="contained" endIcon={<FaPlay />} loading={!videoCover && singleDownloadRunning} onClick={() => { setVideoCover(''); setSingleVideoSize(''); handleUrl() }}  >Start</LoadingButton>
        <h3>{singleVideoSize}</h3>

        {videoCover && <img src={videoCover} alt="cover" width='320' />}
        {videoCover && <Button variant="contained" color='success' target="_blank"  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/download/' + GetID(tiktokUrl)); window.location = process.env.REACT_APP_SERVER + '/api/download/' + GetID(tiktokUrl); }}  >Download One Video</a></Button>}
        {videoCover && <Button variant="contained" color='success'  > <a onClick={() => DownloadFromLink(videoCover, videoCover + '.png')}  >Download Thumbnail</a></Button>}
      </div>

    </div>
  )
}

export default HomePage




/*
function DownloadFromLink(link , type){
  //download image locally from link 
  $.ajax({
    url: link,
    type: 'GET',
    xhrFields: {
      responseType: 'blob'
    },
    success: function (data) {
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(data);
      a.href = url;
      a.download = type;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  });
}
*/

{/* { <Button variant="contained"  > <a target="_blank" onClick={() => window.location = (process.env.REACT_APP_SERVER + '/api/download/' + GetID(tiktokUrl))}  >Download</a></Button>} */ }