import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import GetID from '../utilities/GetID';
import LoadingButton from '@mui/lab/LoadingButton';
import { FaPlay } from 'react-icons/fa'


function BulkVideoDownloader() {

  const [tiktokBulkUrlsText, setTiktokBulkUrlsText] = useState(``);

  const [tiktokBulkUrls, setTiktokBulkUrls] = useState([]);

  function SplitUrls() {
    let lines = tiktokBulkUrlsText.split(/\r?\n/);

    let cleanTiktokBulkUrls = [];
    lines.map((line) => {
      if (line !== "") {
        cleanTiktokBulkUrls.push(line);
      }
    })
    setTiktokBulkUrls(cleanTiktokBulkUrls);
    sendUrls(cleanTiktokBulkUrls)

  }

  console.log(tiktokBulkUrls)

  const [bulkDownloadRunning, setBulkDownloadRunning] = useState(false)
  const [detailsList, setDetailsList] = useState(null)
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

  return (
    <div>BulkVideoDownloader


      <TextField
        id="outlined-multiline-flexible"
        label="Tiktok Bulk Urls"
        multiline
        //maxRows={4}
        value={tiktokBulkUrlsText}
        onChange={(e) => { setTiktokBulkUrlsText(e.target.value) }}
      />

      <LoadingButton variant="contained" onClick={() => { setBulkDownloadRunning(true); setDetailsList(null); SplitUrls() }} endIcon={<FaPlay />} loading={bulkDownloadRunning && !detailsList} >Start</LoadingButton >
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
      {detailsList && <Button variant="contained" color='success' target="_blank"  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0])); window.location = process.env.REACT_APP_SERVER + '/api/bulk/download/' + GetID(tiktokBulkUrls[0])+'photos'; }}  >Download All Photos</a></Button>}

    </div>
  )
}

export default BulkVideoDownloader