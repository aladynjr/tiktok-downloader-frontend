import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SingleVideoDownloader from '../components/SingleVideoDownloader';
import BulkVideoDownloader from '../components/BulkVideoDownloader';
import { Button, Divider } from '@mui/material';
import { TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

import useThrottle from '../customhooks/useThrottle';
import { FaPlay } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';
import { useStopwatch } from 'react-timer-hook';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { v4 as uuidv4 } from 'uuid';
import { BsImage, BsCameraVideoFill } from 'react-icons/bs'
import Footer from '../components/Footer';
import io from 'socket.io-client';
import { MdContentPaste } from 'react-icons/md'

const socket = io(process.env.REACT_APP_SERVER);

function HomePage() {
  const navigate = useNavigate();
  //SOCKET IO  
  const [requestID, setRequestID] = useState(uuidv4());


  //JOIN THIS REQUEST'S ROOM 
  const JoinRoom = (roomNumber) => {
    socket.emit('join_room', { roomNumber });
  }

  useEffect(() => {
    console.log('request id changed with value : ' + requestID)
    JoinRoom(requestID)
  }, [requestID])


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

  const throttledManyUrls = useThrottle(ManyUrls(), 0)

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

  //paste clipboard 
  function Paste() {
    navigator.clipboard.readText().then(clipText => {
      setMainUrlField(clipText)
    });
  }

  return (
    <div className='HomepageContainer' >
      <div className='Homepage' >
        <h1 style={{ color: 'white' }} >Download TikTok Videos & Thumbnails</h1>
        <h2 style={{ color: 'white' }} > With No Watermark Fast & Free</h2>
        <div>



          <div style={{ marginBlock: '20px' }} className='maininputfield' >
            <OutlinedInput
              id="outlined-multiline-flexible"
              placeholder={`Enter TikTok Url(s) Here

www.tiktok.com/@user/video/325876398923320581
www.tiktok.com/@user/video/35478928923327777
www.tiktok.com/t/ZTlmHPdAS
... ` }
              className='glasscard'
              multiline
              minRows={6}
              sx={{
                '&:hover fieldset': {
                  borderColor: 'grey',
                },
              }}
              value={mainUrlField}
              onChange={(e) => { setMainUrlField(e.target.value) }}
            />
          </div>
          <Button variant="contained"
            style={{ padding: '2px 6px', backgroundColor: 'white', color: '#b340c2', textTransform: 'none', fontSize: '13px', marginTop: '-150px' }}
            onClick={() => { Paste() }} >Paste <MdContentPaste style={{ fontSize: '18px' }} /> </Button>

          <div  >
            {!throttledManyUrls && <LoadingButton variant="contained" endIcon={<FaPlay />} sx={{ padding: '14px 50px', marginTop: '-55px' }} loading={!videoCover && !singleVideoSize && singleDownloadRunning}
              onClick={() => {
                setStartSingleDownload(true)
              }}  >Start</LoadingButton>}
          </div>

          <div  >
            {throttledManyUrls && <LoadingButton variant="contained" sx={{ padding: '14px 50px', marginTop: '-55px' }}
              onClick={() => {
                setStartBulkDownload(true);
                setPhotosDownloadResult(false)
              }} endIcon={<FaPlay />} loading={bulkDownloadRunning && !detailsList} >Start</LoadingButton >}
          </div>

        </div>


<Divider style={{width:'70%', margin:'20px auto'}} />

        {/* <div style={{ fontSize: '20px' }}><p>time : {seconds}</p></div> */}



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
          thumbnailProgress={thumbnailProgress}
          setThumbnailProgress={setThumbnailProgress}
          videoProgress={videoProgress}
          setVideoProgress={setVideoProgress}
          requestID={requestID}
          setRequestID={setRequestID}

        />
        {/* <Divider style={{ width: '70%', margin: '50px auto' }} /> */}

        <SingleVideoDownloader
          mainUrlField={mainUrlField}
          resetResults={resetResults}
          setResetResults={setResetResults}
          startSingleDownload={startSingleDownload}
          setStartSingleDownload={setStartSingleDownload}
          videoCover={videoCover}
          setVideoCover={setVideoCover}
          setSingleDownloadRunning={setSingleDownloadRunning}
          singleDownloadRunning={singleDownloadRunning}
          socket={socket}
          thumbnailProgress={thumbnailProgress}
          setThumbnailProgress={setThumbnailProgress}
          videoProgress={videoProgress}
          setVideoProgress={setVideoProgress}
          singleVideoSize={singleVideoSize}
          setSingleVideoSize={setSingleVideoSize}
          requestID={requestID}
          setRequestID={setRequestID}
        />




        {/* <div style={{ marginTop: '500px' }} ></div> */}
        <Footer />
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