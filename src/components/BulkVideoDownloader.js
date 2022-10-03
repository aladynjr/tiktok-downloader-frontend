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
  useEffect(() => {
    socket.on('thumbnailProgress', (data) => {
      console.log('thumbnail  :  ' + data)
      setThumbnailProgress(data)

    })

    socket.on('videoProgress', (data) => {
      console.log('video  :  ' + data)
      setVideoProgress(data)

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
  console.log({videosFolderName})

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
  console.log({ detailsList })
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

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap:"wrap" }} >
        <div>

          {/*(photosDownloadResult || detailsList)*/ (videosFolderName) && <LoadingButton endIcon={<FiDownload />} variant="contained" color='success' style={{ margin: '7px' }}  > <a target="_blank" style={{ textDecoration: 'none', color: 'white' }} href={process.env.REACT_APP_SERVER + '/api/bulk/download/' + videosFolderName}  >Download All Videos </a></LoadingButton>}
         <div style={{margin:'20px'}}  >

          {(bulkDownloadRunning && !videosFolderName  ) && <div className='BulkProgressContainer' style={{    marginLeft: '-6px'}} > <VideoProgressBar videoProgress={videoProgress} detailsList={videosFolderName} /></div>}
          {(bulkDownloadRunning && !videosFolderName ) && <Skeleton style={{ backgroundColor: '#f5f5f55c', marginTop:'-200px', marginRight:'-5px' }} variant="rectangular" width={200} height={200} />}
         </div>
        </div>
        <div>

          {/*(photosDownloadResult || detailsList)*/ photosDownloadResult && <LoadingButton endIcon={<FiDownload />} variant="contained" color='success' style={{ margin: '7px' }}  > <a target="_blank" style={{ textDecoration: 'none', color: 'white' }} href={process.env.REACT_APP_SERVER + '/api/bulk/download/' + photosFolderName}  >Download All Photos</a></LoadingButton>}
        
        <div style={{margin:'20px'}} >

          {(bulkDownloadRunning && !photosDownloadResult ) && <div className='BulkProgressContainer' style={{    marginLeft: '-6px'}} ><CoverProgressBar thumbnailProgress={thumbnailProgress} photosDownloadResult={photosDownloadResult} /> </div>}
          {(bulkDownloadRunning && !photosDownloadResult) && <Skeleton style={{ backgroundColor: '#f5f5f55c', marginTop:'-200px' , marginRight:'-5px'}} variant="rectangular" width={200} height={200} />}

        </div>

        </div>
      </div>

      <div>
        {detailsList && detailsList.map((detail, i) => {

          return (
            <div key={i} style={{ backgroundColor: 'whitesmoke', padding: '10px', borderRadius: '10px', width: 'fit-content', margin: 'auto', marginTop: '25px' }} >
              <b> {detail.title}</b>
              <p style={{ fontSize: '12px' }} >ID : {detail.id}</p>
              <img src={detail.cover} style={{ width: 'fit-content', maxWidth: '90vw' }} />
            </div>
          )
        })}
      </div>



    </div>
  )
}

export default BulkVideoDownloader