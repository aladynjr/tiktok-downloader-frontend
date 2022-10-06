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
import GetID from '../utilities/GetID';
import TextareaAutosize from 'react-textarea-autosize';

import { BsFillCaretDownFill } from 'react-icons/bs'
import { FiDownload } from 'react-icons/fi'
import FAQ from '../components/FAQ';
import Qualitites from '../components/Qualitites';
import HowToBox from '../components/HowToBox';

const socket = io(process.env.REACT_APP_SERVER);

function HomePage() {
  const navigate = useNavigate();
  //SOCKET IO  
  const [requestID, setRequestID] = useState();
  console.log('requestID  :  ' + requestID)

  //JOIN THIS REQUEST'S ROOM 
  const JoinRoom = (roomNumber) => {
    socket.emit('join_room', { roomNumber });
  }

  // useEffect(() => {
  //   console.log('request id changed with value : ' + requestID)
  //   JoinRoom(requestID)
  // }, [requestID])


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

  useEffect(() => {
    let lines = mainUrlField.split(/\r?\n/);
    let cleanTiktokBulkUrls = [];
    lines.map((line) => {
      if (line !== "") {
        cleanTiktokBulkUrls.push(line);
      }
    })
    if (cleanTiktokBulkUrls[0]?.includes('tiktok.com/t') || cleanTiktokBulkUrls[0]?.includes('vm.tiktok.com') || cleanTiktokBulkUrls[0]?.includes('www.tiktok.com/@')) {
      setRequestID(GetID(cleanTiktokBulkUrls[0]))
      //check if it contains a tiktok url 
    }
  }, [mainUrlField])

  const throttledManyUrls = useThrottle(ManyUrls(), 0)

  const [resetResults, setResetResults] = useState(false)

  //Start Single Download 
  const [startSingleDownload, setStartSingleDownload] = useState(false)
  const [singleDownloadRunning, setSingleDownloadRunning] = useState(false)
  console.log({ singleDownloadRunning })
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
        <div className="MainPart">

       
        <h1 style={{ color: 'white' }} >Download TikTok Videos & Cover Images</h1>
        <h2 style={{ color: 'white' }} className='HomepageSubtitle' > No Watermarks - Bulk Download Videos & Cover Images</h2>

        <div className='ButtonsAndMainInput' >
          <div className='maininputfield' >

            <TextareaAutosize
              maxRows={4}
              placeholder={`Enter TikTok Url(s) Here

                     ` }
              /* www.tiktok.com/@user/video/325876398923320581
               www.tiktok.com/@user/video/35478928923327777
               www.tiktok.com/t/ZTlmHPdAS
               ...*/
              className='glasscard'
              multiline
              minRows={6.5}
              value={mainUrlField}
              onChange={(e) => { setMainUrlField(e.target.value) }}
              style={{ outline: 'none', width: '90vw', maxWidth: '800px', margin: '20px auto' }}
            />

          </div>
          <div className='DownloadButtonsAndPaste' >
            <div>
              <Button variant="contained"
                style={{ padding: '5px 6px', marginRight: '-10px', backgroundColor: 'white', color: '#b340c2', textTransform: 'none', fontSize: '13px' }}
                onClick={() => { Paste() }} >Paste <MdContentPaste style={{ fontSize: '18px' }} /> </Button>
            </div>
            <div className='DownloadButtons' >

              <div  >
                {!throttledManyUrls && <LoadingButton variant="contained" endIcon={<FiDownload style={{ fontSize: '25px' }} />}
                  sx={{ padding: '14px 27px', marginInline: '20px', textTransform: 'none', fontSize: '17px', borderRadius: '6px' }}
                  loading={!videoCover && !singleVideoSize && singleDownloadRunning}
                  onClick={() => {
                    JoinRoom(requestID)
                    setStartSingleDownload(true)
                  }}  >Download</LoadingButton>}
              </div>

              <div>
                {throttledManyUrls && <LoadingButton variant="contained" sx={{ padding: '14px 27px', marginInline: '20px', textTransform: 'none', fontSize: '17px', borderRadius: '6px' }}
                  onClick={() => {
                    JoinRoom(requestID)
                    setStartBulkDownload(true);
                    setPhotosDownloadResult(false)
                  }} endIcon={<FiDownload style={{ fontSize: '25px' }} />} loading={bulkDownloadRunning && !detailsList}
                >Download</LoadingButton >}
              </div>

            </div>


          </div>

        </div>
          <p className='UnderSubtitle' >Paste your TikTok links above and download in bulk</p>
        </div>

        {/* <Divider style={{ width: '70%', margin: '20px auto' }} /> */}

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
          setSingleDownloadRunning={setSingleDownloadRunning}

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

        <Qualitites />
        <HowToBox />

        <FAQ />

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