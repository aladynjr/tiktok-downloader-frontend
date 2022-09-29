import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Button, buttonBaseClasses } from '@mui/material';
import GetID from '../utilities/GetID';
import LoadingButton from '@mui/lab/LoadingButton';
import { FaPlay } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';


function BulkVideoDownloader({ mainUrlField, resetResults, setResetResults, startBulkDownload, setStartBulkDownload, bulkDownloadRunning, setBulkDownloadRunning, detailsList, setDetailsList, photosDownloadResult, setPhotosDownloadResult, socket }) {

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
    sendUrlsToGetPhotos(cleanTiktokBulkUrls)
  }
  const [donePhotos, setDonePhotos] = useState([])

  //JOIN THIS REQUEST'S ROOM 
  var requestID;

  const JoinRoom = (roomNumber) => {
    socket.emit('join_room', { roomNumber });
  }

  useEffect(() => {
    requestID = uuidv4();
    JoinRoom(requestID)
  }, [])

  //RECEIVE SOCKET MESSAGE
   var lastSocketMessage;
   useEffect(() => {
     socket.on('thumbnailProgress', (data) => {
       console.log(data)


     })

   }, [socket])


  //SEND URL TO GET PHOTOS 
  const sendUrlsToGetPhotos = async (urls) => {
    console.log('%c sent urls', 'color: blue')
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
        setBulkDownloadRunning(false)

        console.log('%c success : PHOTOS downlaoded to server !', 'color: green');

      }

    }
    catch (err) {
      console.log(err);
      setBulkDownloadRunning(false)

    }
  }




  const sendUrls = async (urls) => {
    console.log('%c sent urls', 'color: blue')
    try {
      let response = await fetch(process.env.REACT_APP_SERVER + '/api/bulk/urls', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: urls })
      })

      const jsonData = await response.json();

      if (jsonData.download == 'success') {
        //setVideoCover(jsonData.cover);
        setDetailsList(jsonData.detailsList);
        setBulkDownloadRunning(false)

        console.log('%c success : video downlaoded to server !', 'color: green');

      }

    }
    catch (err) {
      console.log(err);
      setBulkDownloadRunning(false)

    }
  }

  //start download button clicked in parent component
  function StartDownloadButtonClicked() {
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
      setDetailsList(null)
      setResetResults(false)
    }
  }, [resetResults])



  return (
    <div>

      <div>
        {detailsList && detailsList.map((details, i) => {

          return (
            <p key={i}>
              <b>{details.title}</b>-<b>{details.author}</b>
            </p>
          )
        })}
      </div>



      {/* {detailsList && <Button variant="contained" color='success' target="_blank"  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0])); window.location = process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0]); }}  >Download All Videos </a></Button>} */}
      {photosDownloadResult && <Button variant="contained" color='success' target="_blank"  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0])); window.location = process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0]) + 'photos'; }}  >Download All Photos</a></Button>}

    </div>
  )
}

export default BulkVideoDownloader