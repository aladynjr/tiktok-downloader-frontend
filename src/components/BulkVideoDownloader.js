import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Button, buttonBaseClasses } from '@mui/material';
import GetID from '../utilities/GetID';
import LoadingButton from '@mui/lab/LoadingButton';
import { FaPlay } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';
import { FiDownload } from 'react-icons/fi'
import VideoProgressBar from './VideoProgressBar';
import CoverProgressBar from './CoverProgressBar';
import Skeleton from '@mui/material/Skeleton';

function BulkVideoDownloader({ mainUrlField, resetResults, setResetResults, startBulkDownload, setStartBulkDownload, bulkDownloadRunning, setBulkDownloadRunning, detailsList, setDetailsList, photosDownloadResult, setPhotosDownloadResult, socket, thumbnailProgress, setThumbnailProgress, videoProgress, setVideoProgress, requestID, setRequestID, setSingleDownloadRunning }) {

  // const [setMainUrlField, setMainUrlField] = useState(``);

  const [tiktokBulkUrls, setTiktokBulkUrls] = useState([]);

  function SplitUrls() {
    let lines = mainUrlField.split(/\r?\n/);

    let cleanTiktokBulkUrls = [];
    lines.map((line) => {
      if (line !== "") {
        cleanTiktokBulkUrls.push(line);
      }
    })
    setTiktokBulkUrls(cleanTiktokBulkUrls);
    sendUrlsToGetPhotos(cleanTiktokBulkUrls);
    sendUrlsToGetVideos(cleanTiktokBulkUrls);
  }
  const [donePhotos, setDonePhotos] = useState([])



  //RECEIVE SOCKET MESSAGE
  const [numberOfDownloadedVideos, setNumberOfDownloadedVideos] = useState(0);
  const [numberOfDownloadedPhotos, setNumberOfDownloadedPhotos] = useState(0);
  useEffect(() => {
    socket.on('thumbnailProgress', (data) => {
      //console.log('thumbnail  :  ' + data)
      setThumbnailProgress(data)

    })
    socket.on('thumbnailOrder', (data) => {
      console.log('thumbnail  :  ' + data)
      setNumberOfDownloadedPhotos(data)

    })

    socket.on('videoProgress', (data) => {
     // console.log('video  :  ' + data)
      setVideoProgress(data)

    })
    socket.on('videoOrder', (data) => {
      // console.log('video order :  ' + data)
       setNumberOfDownloadedVideos(data)
     })

  }, [socket])

  //SEND URL TO GET PHOTOS 
  const [photosFolderName, setPhotosFolderName] = useState('')

  const sendUrlsToGetPhotos = async (urls) => {
    console.log('%c sent urls to get photos', 'color: blue')
    try {
      let response = await fetch(process.env.REACT_APP_SERVER + '/api/bulk/urls/photos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: urls, requestID: requestID })
      })

      const jsonData = await response.json();

      if (jsonData.photosDownloadResult == 'success') {
        //setVideoCover(jsonData.cover);
        setPhotosDownloadResult(jsonData.photosDownloadResult);
        setPhotosFolderName(jsonData.photosFolderName)

        setDetailsList(jsonData.detailsList);

        // setBulkDownloadRunning(false)

        console.log('%c success : PHOTOS downlaoded to server !', 'color: green');

      }

    }
    catch (err) {
      console.log(err);
      setBulkDownloadRunning(false)

    }
  }

  const [videosFolderName, setVideosFolderName] = useState('')

  const sendUrlsToGetVideos = async (urls) => {
    console.log('%c sent urls to get videos', 'color: blue')
    try {
      let response = await fetch(process.env.REACT_APP_SERVER + '/api/bulk/urls/videos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: urls, requestID: requestID })
      })

      const jsonData = await response.json();

      if (jsonData.videosDownloadResult == 'success') {
        //setVideoCover(jsonData.cover);
        setBulkDownloadRunning(false)
        setVideosFolderName(jsonData.videosFolderName)

        console.log('%c success : videos downloaded to server !', 'color: green');

      }

    }
    catch (err) {
      console.log(err);
      setBulkDownloadRunning(false)

    }
  }

  //start download button clicked in parent component
  function StartDownloadButtonClicked() {
    setSingleDownloadRunning(false)
    setPhotosDownloadResult(null)
    setPhotosFolderName('')
    setVideosFolderName('')
    setResetResults(true);
    setDetailsList(null);
    setBulkDownloadRunning(true);
    SplitUrls();
  }

  useEffect(() => {
    if (startBulkDownload) {
      StartDownloadButtonClicked();
    }
    setStartBulkDownload(false)
  }, [startBulkDownload])


  //reset when starting again in parent component
  useEffect(() => {
    if (resetResults) {
      setNumberOfDownloadedVideos(0)
      setPhotosDownloadResult(null)
      setPhotosFolderName('')
      setVideosFolderName('')
      setDetailsList(null)
      setResetResults(false)
      setVideoProgress(0)
      setThumbnailProgress(0)
    }
  }, [resetResults])



  return (
    <div>

      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center', maxWidth: '1000px', margin: 'auto', flexWrap:'wrap', marginBlock:'25px'}} >
        <div>

         {/* {(videosFolderName) && <LoadingButton
            endIcon={<FiDownload style={{ color: 'white', marginLeft:'15px', fontSize:'22px' }} />}
            variant="contained"  style={{ margin: '7px',marginTop:'26px' , background: ' #ff0050', fontSize:'19px', padding:'15px 20px' }}  >
            <a target="_blank" style={{ textDecoration: 'none', color: 'white' }}
              href={process.env.REACT_APP_SERVER + '/api/bulk/download/' + videosFolderName}  >
              Download All Videos </a>
          </LoadingButton>} */}

          {videosFolderName && <div className="GradientButton" style={{ filter: 'hue-rotate(348deg)  ', marginLeft:'-16px', marginTop:'17px' }}>
              <div class="_9l28 snipcss-PjCMs" >
                <div class="_9l2w">
                  <div class="_8g86 _8kis _9o26 _a742" style={{ marginTop: '0', display: 'flex', height: '60px', alignItems: 'center', cursor: 'pointer' }}  >
                    <img class="  _8gj0 _8gj2 _9o2u _9o2w _9pju img snip-img full" src="https://static.xx.fbcdn.net/rsrc.php/yD/r/LM6M2GhE0cX.svg" />

                    <a role="button" className='GradientButtonText' target="_blank" href={process.env.REACT_APP_SERVER + '/api/bulk/download/' + videosFolderName}    >
                      DOWNLOAD ALL VIDEOS 
                    </a>
                    <img class=" _8gj0 _8gj1 _9o2u _9o2x _9pju img border" src="https://static.xx.fbcdn.net/rsrc.php/ys/r/t-mEQ1-Zrdi.svg" />
                  </div>
                </div>

              </div>
            </div>}

          <div style={{ margin: '20px' }}  >

            {(bulkDownloadRunning && !videosFolderName) && <div
              className='BulkProgressContainer'
              style={{ marginLeft: '-6px' }} >
              <VideoProgressBar videoProgress={videoProgress} detailsList={videosFolderName} numberOfDownloadedVideos={numberOfDownloadedVideos} totalNumberOfLinks={tiktokBulkUrls} />
            </div>}
            {(bulkDownloadRunning && !videosFolderName) && <Skeleton style={{ backgroundColor: '#f5f5f55c', marginTop: '-200px', marginRight: '-5px' }} variant="rectangular" width={200} height={200} />}
          </div>
        </div>
        <div>

          {/* {photosDownloadResult && <LoadingButton
            endIcon={<FiDownload style={{ color: 'black', marginLeft:'15px', fontSize:'22px' }} />}
            variant="contained" 
            style={{ margin: '7px',marginTop:'26px', background: '#00f2ea ', fontSize:'19px' , padding:'15px 20px' }}  >
            <a target="_blank"
              style={{ textDecoration: 'none', color:'black', fontWeight:'900' }}
              href={process.env.REACT_APP_SERVER + '/api/bulk/download/' + photosFolderName}  >
              Download All Covers</a>
          </LoadingButton>} */}
          {photosDownloadResult && <div className="GradientButton" style={{ filter: 'hue-rotate(298deg)  ', marginLeft:'-16px', marginTop:'17px' }}>
              <div class="_9l28 snipcss-PjCMs" >
                <div class="_9l2w">
                  <div class="_8g86 _8kis _9o26 _a742" style={{ marginTop: '0', display: 'flex', height: '60px', alignItems: 'center', cursor: 'pointer' }}  >
                    <img class="  _8gj0 _8gj2 _9o2u _9o2w _9pju img snip-img full" src="https://static.xx.fbcdn.net/rsrc.php/yD/r/LM6M2GhE0cX.svg" />

                    <a role="button" className='GradientButtonText' target="_blank " href={process.env.REACT_APP_SERVER + '/api/bulk/download/' + photosFolderName}   >
                      DOWNLOAD ALL COVERS {/*<FiDownload className='GradientButtonIcon'  />*/}
                    </a>
                    <img class=" _8gj0 _8gj1 _9o2u _9o2x _9pju img border" src="https://static.xx.fbcdn.net/rsrc.php/ys/r/t-mEQ1-Zrdi.svg" />
                  </div>
                </div>

              </div>
            </div>}

          <div style={{ margin: '20px' }} >

            {(bulkDownloadRunning && !photosDownloadResult) && <div
              className='BulkProgressContainer'
              style={{ marginLeft: '-6px' }} >
              <CoverProgressBar thumbnailProgress={thumbnailProgress} photosDownloadResult={photosDownloadResult} numberOfDownloadedPhotos={numberOfDownloadedPhotos} totalNumberOfLinks={tiktokBulkUrls} />
            </div>}
            {(bulkDownloadRunning && !photosDownloadResult) && <Skeleton style={{ backgroundColor: '#f5f5f55c', marginTop: '-200px', marginRight: '-5px' }} variant="rectangular" width={200} height={200} />}

          </div>

        </div>
      </div>

      <div  className='BulkResultPhotos' >
        {detailsList && detailsList.map((detail, i) => {
          var Title = detail.title.toString();
          if (Title.length > 20) {
            Title = Title.substring(0, 20) + '...'
          }
          return (
            <div key={i} className='BulkResultPhotoCard' >
              <p style={{ fontSize: '12px', margin:'0', opacity:'0.5',fontWeight:'900', marginTop:'-5px', marginBottom:'5px' }} > {i+1}</p>
              <img src={detail.cover} style={{ width: '170px' }} />
            </div>
          )
        })}
      </div>



    </div>
  )
}

export default BulkVideoDownloader