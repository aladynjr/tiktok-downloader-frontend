import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import GetID from '../utilities/GetID';
import LoadingButton from '@mui/lab/LoadingButton';
import { FaPlay } from 'react-icons/fa'


function BulkVideoDownloader({ mainUrlField, resetResults, setResetResults, startBulkDownload, setStartBulkDownload, setBulkDownloadRunning, detailsList, setDetailsList }) {

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
    sendUrls(cleanTiktokBulkUrls)

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

      {detailsList && <Button variant="contained" color='success' target="_blank"  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0])); window.location = process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0]); }}  >Download All Videos </a></Button>}
      {detailsList && <Button variant="contained" color='success' target="_blank"  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0])); window.location = process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0]) + 'photos'; }}  >Download All Photos</a></Button>}

    </div>
  )
}

export default BulkVideoDownloader