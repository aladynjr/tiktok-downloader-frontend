import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { v4 as uuidv4 } from 'uuid';
import { BsImage, BsCameraVideoFill } from 'react-icons/bs'
function CoverProgressBar({thumbnailProgress, photosDownloadResult, videoCover,}) {
  return (
    <div>
          <div className='ProgressLoader'>

<CircularProgressbarWithChildren value={thumbnailProgress} styles={buildStyles({ pathColor: ((photosDownloadResult || videoCover) ? 'limegreen' : '#ff0050	') , trailColor:'transparent'})} >

  <div className='tiktoklogo' style={{ fontSize: '40px', color: (photosDownloadResult || videoCover) ? 'limegreen' : '#00fff8' }} >

    <BsImage className='tiktokicon' />
    <BsImage className='tiktokicon' />
  </div>

  <div style={{ fontSize: 12, marginTop: 5 }}>
    {/* <strong>{thumbnailProgress}%</strong> */}
  </div>
</CircularProgressbarWithChildren>

</div>
    </div>
  )
}

export default CoverProgressBar