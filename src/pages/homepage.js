import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SingleVideoDownloader from '../components/SingleVideoDownloader';
import BulkVideoDownloader from '../components/BulkVideoDownloader';
function HomePage() {
  const navigate = useNavigate();


  return (
    <div>
      <h3>Homepage</h3>
<BulkVideoDownloader />

        <SingleVideoDownloader />  



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