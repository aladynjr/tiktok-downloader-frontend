import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Button, buttonBaseClasses } from '@mui/material';
import GetID from '../utilities/GetID';
import LoadingButton from '@mui/lab/LoadingButton';
import { FaPlay } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';


function BulkVideoDownloader({ mainUrlField, resetResults, setResetResults, startBulkDownload, setStartBulkDownload, bulkDownloadRunning, setBulkDownloadRunning, detailsList, setDetailsList, photosDownloadResult, setPhotosDownloadResult, socket, setThumbnailProgress, setVideoProgress }) {

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

  //JOIN THIS REQUEST'S ROOM 
const [requestID, setRequestID] = useState(uuidv4());
  const JoinRoom = (roomNumber) => {
    socket.emit('join_room', { roomNumber });
  }

  useEffect(() => {
    console.log('request id changed with value : ' + requestID)
    JoinRoom(requestID)
  }, [requestID])

  //RECEIVE SOCKET MESSAGE
   useEffect(() => {
     socket.on('thumbnailProgress', (data) => {
       console.log(data)
       setThumbnailProgress(data)

     })

     socket.on('videoProgress', (data) => {
    //    console.log(data)
        setVideoProgress(data)
      
      })

   }, [socket])

  //SEND URL TO GET PHOTOS 
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
       // setBulkDownloadRunning(false)

        console.log('%c success : PHOTOS downlaoded to server !', 'color: green');

      }

    }
    catch (err) {
      console.log(err);
      setBulkDownloadRunning(false)

    }
  }




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
        setDetailsList(jsonData.detailsList);
        setBulkDownloadRunning(false)

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
    setPhotosDownloadResult(null)
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
      setDetailsList(null)
      setResetResults(false)
      setVideoProgress(0)
      setThumbnailProgress(0)
    }
  }, [resetResults])



  return (
    <div>

      <div>
        {detailsList && detailsList.map((details, i) => {

          return (
            <p key={i}>
              <b>{details.author}</b> - <b>{details.title}</b> - <b>{details.id}</b>
            </p>
          )
        })}
      </div>



       {(photosDownloadResult || detailsList) && <LoadingButton loading={!detailsList} variant="contained" color='success' target="_blank"  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0])); window.location = process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0]); }}  >Download All Videos </a></LoadingButton>} 
      {(photosDownloadResult || detailsList) && <LoadingButton loading={!photosDownloadResult} variant="contained" color='success' target="_blank"  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0])); window.location = process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0]) + 'photos'; }}  >Download All Photos</a></LoadingButton>}

    </div>
  )
}

export default BulkVideoDownloader