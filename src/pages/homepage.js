import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SingleVideoDownloader from '../components/SingleVideoDownloader';
import BulkVideoDownloader from '../components/BulkVideoDownloader';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import useThrottle from '../customhooks/useThrottle';
import { FaPlay } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';
import { useStopwatch } from 'react-timer-hook';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function HomePage() {
  const navigate = useNavigate();
  //socket
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");




  const [mainUrlField, setMainUrlField] = useState('')

  function ManyUrls() {
    let lines = mainUrlField.split(/\r?\n/);
    let cleanTiktokBulkUrls = [];
    lines.map((line) => {
      if (line !== "") {
        cleanTiktokBulkUrls.push(line);
      }
    })
    if (cleanTiktokBulkUrls.length > 1) {
      return true
    }
    else {
      return false
    }
  }

  const throttledManyUrls = useThrottle(ManyUrls(), 1000)

  const [resetResults, setResetResults] = useState(false)

  //Start Single Download 
  const [startSingleDownload, setStartSingleDownload] = useState(false)
  const [singleDownloadRunning, setSingleDownloadRunning] = useState(false)
  const [videoCover, setVideoCover] = useState('')
  const [singleVideoSize, setSingleVideoSize] = useState('')

  //Start Bulk Downlaod 
  const [startBulkDownload, setStartBulkDownload] = useState(false)
  const [bulkDownloadRunning, setBulkDownloadRunning] = useState(false)
  const [detailsList, setDetailsList] = useState(null)
  const [photosDownloadResult, setPhotosDownloadResult] = useState(false)

  //timer 
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  //start timerr when a download is running and stop it when download finishes 
  useEffect(() => {
    if (singleDownloadRunning || bulkDownloadRunning) {
      reset(); start();
    }
    else {
      pause();
    }
  }, [singleDownloadRunning, bulkDownloadRunning])

  //PROGRESS COUNTER 
  const [thumbnailProgress, setThumbnailProgress] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  return (
    <div>
      <h3>Homepage</h3>
      <div style={{ fontSize: '20px' }}><p>time : {seconds}</p></div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '70%', margin: 'auto' }}>
        <div style={{ width: '170px', height: '170px', margin: '0 auto', marginInline: '10px' }}>

          <CircularProgressbarWithChildren value={videoProgress} styles={buildStyles({ pathColor: '#00f2ea		' })}  >
            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
            <img style={{ width: 40, marginTop: -5 }} src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png" alt="doge" />
            <div style={{ fontSize: 12, marginTop: 5 }}>
              <strong>{videoProgress}%</strong>
            </div>
          </CircularProgressbarWithChildren>

        </div>

        <div style={{ width: '170px', height: '170px', margin: '0 auto', marginInline: '10px' }}>

          <CircularProgressbarWithChildren value={thumbnailProgress} styles={buildStyles({ pathColor: '#ff0050	' })} >
            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
            <img style={{ width: 40, marginTop: -5 }} src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png" alt="doge" />
            <div style={{ fontSize: 12, marginTop: 5 }}>
              <strong>{thumbnailProgress}%</strong>
            </div>
          </CircularProgressbarWithChildren>

        </div>
      </div>
      <div style={{ marginBlock: '20px' }} >
        <TextField
          id="outlined-multiline-flexible"
          label="Tiktok Url(s)"
          multiline
          //maxRows={4}
          value={mainUrlField}
          onChange={(e) => { setMainUrlField(e.target.value) }}
        />
      </div>

      <div>  
        {!throttledManyUrls && <LoadingButton variant="contained" endIcon={<FaPlay />} loading={!videoCover && !singleVideoSize && singleDownloadRunning}
        onClick={() => {
          setStartSingleDownload(true)
        }}  >Start Single Download</LoadingButton>}
      </div>

      <div>
        {throttledManyUrls && <LoadingButton variant="contained"
          onClick={() => {
            setStartBulkDownload(true);
            setPhotosDownloadResult(false)
          }} endIcon={<FaPlay />} loading={bulkDownloadRunning && !detailsList} >Start Bulk Download</LoadingButton >}
      </div>
      <BulkVideoDownloader
        mainUrlField={mainUrlField}
        resetResults={resetResults}
        setResetResults={setResetResults}
        startBulkDownload={startBulkDownload}
        setStartBulkDownload={setStartBulkDownload}
        bulkDownloadRunning={bulkDownloadRunning}
        setBulkDownloadRunning={setBulkDownloadRunning}
        detailsList={detailsList}
        setDetailsList={setDetailsList}
        photosDownloadResult={photosDownloadResult}
        setPhotosDownloadResult={setPhotosDownloadResult}
        socket={socket}
        setThumbnailProgress={setThumbnailProgress}
        setVideoProgress={setVideoProgress}

      />
      <Divider style={{ width: '70%', margin: '50px auto' }} />

      <SingleVideoDownloader
        mainUrlField={mainUrlField}
        resetResults={resetResults}
        setResetResults={setResetResults}
        startSingleDownload={startSingleDownload}
        setStartSingleDownload={setStartSingleDownload}
        videoCover={videoCover}
        setVideoCover={setVideoCover}
        setSingleDownloadRunning={setSingleDownloadRunning}
        socket={socket}
        setThumbnailProgress={setThumbnailProgress}
        setVideoProgress={setVideoProgress}
        singleVideoSize={singleVideoSize}
        setSingleVideoSize={setSingleVideoSize}
      />


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