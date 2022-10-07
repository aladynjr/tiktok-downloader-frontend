import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { v4 as uuidv4 } from 'uuid';
import { BsImage, BsCameraVideoFill } from 'react-icons/bs'

function VideoProgressBar({videoProgress, detailsList, singleVideoSize,numberOfDownloadedVideos, totalNumberOfLinks }) {
  return (
    <div>
         <div  className='ProgressLoader' >

<CircularProgressbarWithChildren value={videoProgress} styles={buildStyles({ pathColor: (detailsList || singleVideoSize) ? 'limegreen' : '#00f2ea', trailColor:'transparent' })}  >
  <div className='tiktoklogo' style={{ color: (detailsList || singleVideoSize) ? 'limegreen' : '#00fff8' }} >

    <BsCameraVideoFill className='tiktokicon' />
    <BsCameraVideoFill className='tiktokicon' />
  </div>

  <div style={{ fontSize: 18, marginTop: -5, opacity:'0.9' }}>
     <strong>{numberOfDownloadedVideos} / {totalNumberOfLinks?.length}   </strong>
  </div>
</CircularProgressbarWithChildren>

</div>
    </div>
  )
}

export default VideoProgressBar