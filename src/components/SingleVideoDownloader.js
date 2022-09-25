import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import $ from 'jquery';
import { FaPlay } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';
import GetID from '../utilities/GetID';
import TiktokUrlValidator from '../utilities/TiktokUrlValidator';
import DownloadFromLink from '../utilities/DownloadFromLink';

function SingleVideoDownloader() {

    //opearation status 
    const [singleDownloadRunning, setSingleDownloadRunning] = useState(false)
    console.log({ singleDownloadRunning })
    
    //check if url is valid then send url to backend 
    const [tiktokUrl, setTiktokUrl] = useState('');
    const [urlErrorMessage, setUrlErrorMessage] = useState('');
  
    //send url to backend to get video link from api 
    const [videoCover, setVideoCover] = useState('')
    const [singleVideoSize, setSingleVideoSize] = useState('')
  
    const sendUrl = async (url) => {
      try {
        let response = await fetch(process.env.REACT_APP_SERVER + '/api/single/url', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ link: url })
        })
  
        const jsonData = await response.json();
  
        if (jsonData.download == 'success') {
          setVideoCover(jsonData.cover);
          setSingleVideoSize(jsonData.progress);
  
          console.log('%c success : video downlaoded to server !', 'color: green');
  
          setSingleDownloadRunning(false)
        }
  
      }
      catch (err) {
        console.log(err);
        setSingleDownloadRunning(false)
  
      }
    }

  return (
    <div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <TextField value={tiktokUrl} onChange={(e) => { setTiktokUrl(e.target.value) }} label="TikTok Video Url" variant="outlined" />
    <b style={{color:'red'}} >{urlErrorMessage}</b>
        <LoadingButton variant="contained" endIcon={<FaPlay />} loading={!videoCover && singleDownloadRunning}
          onClick={() => {
            setVideoCover(''); 
            setSingleVideoSize('');
            setUrlErrorMessage('')
            setSingleDownloadRunning(true);
            TiktokUrlValidator(tiktokUrl,()=>{sendUrl(tiktokUrl)} , () => {setUrlErrorMessage('Error, The url is not a tiktok link!'); setSingleDownloadRunning(false)})
          }}  >Start</LoadingButton>

        <h3>{singleVideoSize}</h3>

        {videoCover && <img src={videoCover} alt="cover" width='320' />}
        {videoCover && <Button variant="contained" color='success' target="_blank"  > <a onClick={() => { console.log(process.env.REACT_APP_SERVER + '/api/single/download/' + GetID(tiktokUrl)); window.location = process.env.REACT_APP_SERVER + '/api/single/download/' + GetID(tiktokUrl); }}  >Download One Video</a></Button>}
        {videoCover && <Button variant="contained" color='success'  > <a onClick={() => DownloadFromLink(videoCover, videoCover + '.png')}  >Download Thumbnail</a></Button>}
      </div>
    </div>
  )
}

export default SingleVideoDownloader