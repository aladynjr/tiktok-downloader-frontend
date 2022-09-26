import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SingleVideoDownloader from '../components/SingleVideoDownloader';
import BulkVideoDownloader from '../components/BulkVideoDownloader';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import useThrottle from '../customhooks/useThrottle';
import { FaPlay } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';

function HomePage() {
  const navigate = useNavigate();

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
  //Start Bulk Downlaod 
  const [startBulkDownload, setStartBulkDownload] = useState(false)
  const [bulkDownloadRunning, setBulkDownloadRunning] = useState(false)
  const [detailsList, setDetailsList] = useState(null)




  return (
    <div>
      <h3>Homepage</h3>
      {!throttledManyUrls && <LoadingButton variant="contained" endIcon={<FaPlay />} loading={!videoCover && singleDownloadRunning}
        onClick={() => {
          setStartSingleDownload(true)
        }}  >Start Single Download</LoadingButton>}


  {throttledManyUrls && <LoadingButton variant="contained" 
      onClick={() => {
        setStartBulkDownload(true) }} endIcon={<FaPlay />} loading={bulkDownloadRunning && !detailsList} >Start Bulk Download</LoadingButton >}

      <TextField
        id="outlined-multiline-flexible"
        label="Tiktok Url(s)"
        multiline
        //maxRows={4}
        value={mainUrlField}
        onChange={(e) => { setMainUrlField(e.target.value) }}
      />

      <BulkVideoDownloader 
      mainUrlField={mainUrlField} 
      resetResults={resetResults} 
      setResetResults={setResetResults}
      startBulkDownload={startBulkDownload}
      setStartBulkDownload={setStartBulkDownload}
      setBulkDownloadRunning={setBulkDownloadRunning} 
      detailsList={detailsList} 
      setDetailsList={setDetailsList}/>
      <Divider style={{ width: '70%', margin: '50px auto' }} />
     
      <SingleVideoDownloader 
      mainUrlField={mainUrlField} 
      resetResults={resetResults} 
      setResetResults={setResetResults} 
      startSingleDownload={startSingleDownload} 
      setStartSingleDownload={setStartSingleDownload} 
      videoCover={videoCover} 
      setVideoCover={setVideoCover} 
      setSingleDownloadRunning={setSingleDownloadRunning} />



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