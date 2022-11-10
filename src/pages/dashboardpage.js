import React, { useEffect, useState } from 'react'
import DashboardLogin from '../components/DashboardLogin'
import { Button } from '@mui/material'
import DownloadsTable from '../components/DownloadsTable'
import ReactApexChart from 'react-apexcharts'
import LinesAnimation from '../components/LinesAnimation'
import LoadingButton from '@mui/lab/LoadingButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import { FaCalendarAlt } from "react-icons/fa"
import { BiLoader } from 'react-icons/bi'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


function QuickViewCard({ Title, Color, Number, numberTitle }) {
  return (
    <div className='DashboardCard' style={{ width: '90%', maxWidth: '220px', minHeight: '130px' }}>
      <p className='TotalNumbersTitle'  >{Title} : </p>
      <div style={{ fontSize: '60px', fontWeight: '900px', color: Color }} >
        {Number}
      </div>
      <div className='DashboardCardNumberTitle' style={{ color: Color }} >{numberTitle}</div>
    </div>
  )
}

function DashboardPage() {
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('admin') == 'true') { setSuccess(true) } else {
      setSuccess(false)
    }
  }, [])

  //get date in this format : yyyy-mm-dd
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var formattedDateToday = (Number(yyyy)) + '-' + (Number(mm)) + '-' + (Number(dd));
  var formattedDateYesterday = (Number(yyyy)) + '-' + (Number(mm)) + '-' + (Number(dd) - 1);
  var formattedDateTomorrow = (Number(yyyy)) + '-' + (Number(mm)) + '-' + (Number(dd) + 1);

  var formattedDateLastWeek = (Number(yyyy)) + '-' + (Number(mm)) + '-' + (Number(dd) - 7);
  var formattedDateLastMonth = (Number(yyyy)) + '-' + (Number(mm) - 1) + '-' + (Number(dd));
  var formattedDateLastYear = (Number(yyyy) - 1) + '-' + (Number(mm)) + '-' + (Number(dd));
  var formattedDateAllTime = '2022-10-10';

  const [customRangeStartDate,setCustomRangeStartDate] = useState('')
  const [customRangeEndDate,setCustomRangeEndDate] = useState('')


  //fetch donwloads data data
  const [downloadsData, setDownloadsData] = useState(null)
  const [downloadsDataLoading, setDownloadsDataLoading] = useState(false);
  const FetchDownloadsData = async (startDate, endDate) => {
    setDownloadsDataLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_SERVER + '/api/dashboard/range/' + startDate + '/' + endDate);
      const jsonData = await response.json();
      setDownloadsData(jsonData)
      setDownloadsData(jsonData)
      console.log(jsonData);
      console.log('%c downloads data fetched', 'color: green')

    } catch (err) {
      console.error(err.message);
      console.log('%c downloads data NOT fetched', 'color: red')
    }
    finally {
      setDownloadsDataLoading(false);
    }
  }

  useEffect(() => {
    FetchDownloadsData(formattedDateToday, formattedDateToday)
  }, [])

  //fetch data for different ranges of time
  const [dataRange, setDataRange] = useState('day')
  const [anotherCustomDate, setAnotherCustomDate] = useState(1);

  useEffect(() => {
    //fetch data in different ranges of time based on the value of dataRange with a switch case 


    switch (dataRange) {
      case 'day': FetchDownloadsData(formattedDateToday, formattedDateToday)
        break;

      case 'week': FetchDownloadsData(formattedDateLastWeek, formattedDateToday)
        break;

      case 'month': FetchDownloadsData(formattedDateLastMonth, formattedDateToday)
        break;

      case 'year': FetchDownloadsData(formattedDateLastYear, formattedDateToday)
        break;

      case 'alltime': FetchDownloadsData(formattedDateAllTime, formattedDateToday)

      case 'custom': FetchDownloadsData(customRangeStartDate, customRangeEndDate)
        break;
    }

  }, [dataRange, anotherCustomDate])

  //totals quick view data 
  const [totalNumberOfLinks, setTotalNumberOfLinks] = useState(0)
  const [totalNumberOfVideosDownloaded, setTotalNumberOfVideosDownloaded] = useState(0)
  const [totalNumberOfThumbnailsDownloaded, setTotalNumberOfThumbnailsDownloaded] = useState(0)

  const [totalNumberOfSingleThumbnails, setTotalNumberOfSingleThumbnails] = useState(0)
  const [totalNumberOfSingleVideos, setTotalNumberOfSingleVideos] = useState(0)
  const [totalNumberOfBulkThumbnails, setTotalNumberOfBulkThumbnails] = useState(0)
  const [totalNumberOfBulkVideos, setTotalNumberOfBulkVideos] = useState(0)

  useEffect(() => {
    if (!downloadsData) return;
    setTotalNumberOfLinks(0)
    setTotalNumberOfVideosDownloaded(0)
    setTotalNumberOfThumbnailsDownloaded(0)

    setTotalNumberOfSingleThumbnails(0)
    setTotalNumberOfSingleVideos(0)
    setTotalNumberOfBulkThumbnails(0)
    setTotalNumberOfBulkVideos(0)

    var numberOfLinks = 0;
    var numberOfVideosDownloaded = 0;
    var numberOfThumbnailsDownloaded = 0;

    var singleThumbnails = 0;
    var singleVideos = 0;
    var bulkThumbnails = 0;
    var bulkVideos = 0;


    downloadsData.map((download) => {
      numberOfLinks = numberOfLinks + download.download_number_of_links
      if (download.download_video) numberOfVideosDownloaded = numberOfVideosDownloaded + (download.download_number_of_links);
      if (download.download_cover) numberOfThumbnailsDownloaded = numberOfThumbnailsDownloaded + (download.download_number_of_links);

      if ((download.download_video) && download.download_type == 'single') singleVideos += (download.download_number_of_links);
      if ((download.download_cover) && download.download_type == 'single') singleThumbnails += (download.download_number_of_links);

      if ((download.download_video) && download.download_type == 'bulk') bulkVideos += (download.download_number_of_links);
      if ((download.download_cover) && download.download_type == 'bulk') bulkThumbnails += (download.download_number_of_links);

    })

    setTotalNumberOfLinks(numberOfLinks)
    setTotalNumberOfVideosDownloaded(numberOfVideosDownloaded)
    setTotalNumberOfThumbnailsDownloaded(numberOfThumbnailsDownloaded)

    setTotalNumberOfSingleThumbnails(singleThumbnails)
    setTotalNumberOfSingleVideos(singleVideos)
    setTotalNumberOfBulkThumbnails(bulkThumbnails)
    setTotalNumberOfBulkVideos(bulkVideos)

  }, [downloadsData?.length])


  //CHARTS 

  //get daily dates depending on the dateRange 
  var dateStart;
  var dateEnd;
  switch (dataRange) {
    case 'day': dateStart = new Date(formattedDateYesterday); dateEnd = new Date(formattedDateTomorrow); break;

    case 'week': dateStart = new Date(formattedDateLastWeek); dateEnd = new Date(formattedDateToday); break;

    case 'month': dateStart = new Date(formattedDateLastMonth); dateEnd = new Date(formattedDateToday); break;

    case 'year': dateStart = new Date(formattedDateLastYear); dateEnd = new Date(formattedDateToday); break;

    //all time start with first date on downloadsData and ends with today 
    case 'alltime': dateStart = new Date(formattedDateAllTime); dateEnd = new Date(formattedDateToday); break;

    case 'custom': dateStart = new Date(customRangeStartDate); dateEnd = new Date(customRangeEndDate); break;

    default: dateStart = new Date(formattedDateToday); break;
  }
  //get all the dates (daily) in a day object in this format 'dd/MM/yy HH:mm' between day start and date end 
  var dates = []
  var day = dateStart;
  while (day <= dateEnd) {
    dates.push(new Date(day))
    day.setDate(day.getDate() + 1);
  }


  //get downloads series for chart

  const [singleThumbnailsSeries, setSingleThumbnailsSeries] = useState([])
  const [singleVideosSeries, setSingleVideosSeries] = useState([]);

  const [bulkThumbnailsSeries, setBulkThumbnailsSeries] = useState([])
  const [bulkVideosSeries, setBulkVideosSeries] = useState([]);

  useEffect(() => {
    if (!downloadsData) return;


    setSingleThumbnailsSeries([])
    setSingleVideosSeries([])

    setBulkThumbnailsSeries([])
    setBulkVideosSeries([])

    var singleThumbnailsSeries = []
    var singleVideosSeries = []

    var bulkThumbnailsSeries = []
    var bulkVideosSeries = []

    //map through the dates, then map thourgh downloads data and check thumbnail was downloaded in the same day thenn add it to the series
    dates.map((date) => {
      var singleThumbnailDownload = 0;
      var singleVideoDownload = 0

      var bulkThumbnailDownload = 0
      var bulkVideoDownload = 0

      downloadsData.map((download) => {
        var downloadDate = new Date(download.download_date)
        downloadDate.setHours(0, 0, 0, 0);

        if (downloadDate.getDate() === date.getDate() && downloadDate.getMonth() === date.getMonth() && downloadDate.getFullYear() === date.getFullYear()) {
          if ((download.download_cover === true) && download.download_type == 'single') singleThumbnailDownload += download.download_number_of_links;
          if ((download.download_video === true) && download.download_type == 'single') singleVideoDownload += download.download_number_of_links;

          if ((download.download_cover === true) && download.download_type == 'bulk') bulkThumbnailDownload += download.download_number_of_links;
          if ((download.download_video === true) && download.download_type == 'bulk') bulkVideoDownload += download.download_number_of_links;

        }
      })

      singleThumbnailsSeries.push({ x: date.getTime(), y: singleThumbnailDownload, date: date })
      singleVideosSeries.push({ x: date.getTime(), y: singleVideoDownload, date: date })

      bulkThumbnailsSeries.push({ x: date.getTime(), y: bulkThumbnailDownload, date: date })
      bulkVideosSeries.push({ x: date.getTime(), y: bulkVideoDownload, date: date })


    })
    setSingleThumbnailsSeries(singleThumbnailsSeries)
    setSingleVideosSeries(singleVideosSeries)

    setBulkThumbnailsSeries(bulkThumbnailsSeries)
    setBulkVideosSeries(bulkVideosSeries)

  }, [downloadsData])

  const chartData1 = {

    series: [{
      name: 'Single Thumbnails',
      data: singleThumbnailsSeries.map((item) => item.y)
    }, {
      name: 'Single Videos',
      data: singleVideosSeries.map((item) => item.y)
    },
    {
      name: 'Bulk Thumbnails',
      data: bulkThumbnailsSeries.map((item) => item.y)
    },
    {
      name: 'Bulk Videos',
      data: bulkVideosSeries.map((item) => item.y)
    }
    ],


    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: singleThumbnailsSeries.map((item) => item.x)
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },


  };




  const chartData2 = {

    series: [totalNumberOfSingleThumbnails, totalNumberOfSingleVideos, totalNumberOfBulkThumbnails, totalNumberOfBulkVideos],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Single Thumbnails', 'Single Videos', 'Bulk Thumbnails', 'Bulk Videos'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },


  };

  function RangeButtons() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >
        <LoadingButton loading={downloadsDataLoading && (dataRange == 'day')} size='small' style={{ marginInline: '20px' }} variant={(!downloadsDataLoading && (dataRange == 'day')) ? 'contained' : 'outlined'} onClick={() => setDataRange('day')} > Today </LoadingButton>
        <LoadingButton loading={downloadsDataLoading && (dataRange == 'week')} size='small' style={{ marginInline: '20px' }} variant={(!downloadsDataLoading && (dataRange == 'week')) ? 'contained' : 'outlined'} onClick={() => setDataRange('week')}>  7 Days </LoadingButton>
        <LoadingButton loading={downloadsDataLoading && (dataRange == 'month')} size='small' style={{ marginInline: '20px' }} variant={(!downloadsDataLoading && (dataRange == 'month')) ? 'contained' : 'outlined'} onClick={() => setDataRange('month')}>  30 Days </LoadingButton>
        <LoadingButton loading={downloadsDataLoading && (dataRange == 'year')} size='small' style={{ marginInline: '20px' }} variant={(!downloadsDataLoading && (dataRange == 'year')) ? 'contained' : 'outlined'} onClick={() => setDataRange('year')}>  Year </LoadingButton>
        <LoadingButton loading={downloadsDataLoading && (dataRange == 'alltime')} size='small' style={{ marginInline: '20px' }} variant={(!downloadsDataLoading && (dataRange == 'alltime')) ? 'contained' : 'outlined'} onClick={() => setDataRange('alltime')}> All-time </LoadingButton>


      </div>
    )
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (dataRange) => {
    setDataRange(dataRange)
    setAnchorEl(null);
  };

  //CUSTOM RANGE 
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = (dataRange) => {
    if(dataRange) {
      //put random number in anotherCustomDAte
      setAnotherCustomDate(new Date().getSeconds());
      setDataRange(dataRange)}
    setOpenDialog(false);
  };



const handleDatePickerChangeStartDate = (newValue) => {
  var date = new Date(newValue)
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();

  date = yyyy + '-' + mm + '-' + dd;

  setCustomRangeStartDate(date);

};

const handleDatePickerChangeEndDate = (newValue) => {
  var date = new Date(newValue)
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();

  date = yyyy + '-' + mm + '-' + dd;

  setCustomRangeEndDate(date);
}

  return (
    <div style={{ backgroundColor: '#f1f5f9', marginTop: '-16px', paddingBlock: '40px 200px', minHeight:'100vh' }} className='DashboardPage' >
      {success ? <div>



        <Fab variant="extended" 
          onClick={handleClick}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          color="secondary"
          disabled={downloadsDataLoading}
        >
          {(!downloadsDataLoading) && <FaCalendarAlt style={{ fontSize: '19px', marginInline: '10px', marginTop: '-2px' }} />}
          {downloadsDataLoading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
          {(dataRange == 'day') && 'Today'}
          {(dataRange == 'week') && '7 Days'}
          {(dataRange == 'month') && '1 Month'}
          {(dataRange == 'year') && 'Year'}
          {(dataRange == 'alltime') && 'All Time'}
          {(dataRange == 'custom') && 'Custom Range'}
          
        </Fab>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {(dataRange !== 'day') && <MenuItem onClick={() => handleClose('day')}>Today</MenuItem>}
          {(dataRange !== 'week') && <MenuItem onClick={() => handleClose('week')}>7 Days</MenuItem>}
          {(dataRange !== 'month') && <MenuItem onClick={() => handleClose('month')}>1 Month</MenuItem>}
          {(dataRange !== 'year') && <MenuItem onClick={() => handleClose('year')}>Year</MenuItem>}
          {(dataRange !== 'alltime') && <MenuItem onClick={() => handleClose('alltime')}>All Time</MenuItem>}
          { <MenuItem onClick={()=>{handleClickOpen(); setAnchorEl(null);}}>Custom Range</MenuItem>}

        </Menu>

        <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Enter Custom Date Range
        </DialogTitle>
        <DialogContent>

            {/* <p style={{opacity:'0.7'}} >
            IMPORTANT : Dates must be in this EXACT format : yyyy-mm-dd          </p> */}
       {/* <TextField fullWidth margin="dense" value={customRangeStartDate}  label="Start Date"  onChange={(e) => {setCustomRangeStartDate(e.target.value);}} />
       <TextField fullWidth margin="dense" value={customRangeEndDate}  label="End Date"  onChange={(e) => {setCustomRangeEndDate(e.target.value);}} /> */}
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
        
          label="Start Date"
          inputFormat="MM/DD/YYYY"
          value={customRangeStartDate}
          onChange={handleDatePickerChangeStartDate}
          renderInput={(params) => <TextField fullWidth
            margin="dense" {...params} />}
        />
        <DesktopDatePicker
        fullWidth
        margin="dense"
          label="End Date"
          inputFormat="MM/DD/YYYY"
          value={customRangeEndDate}
          onChange={handleDatePickerChangeEndDate}
          renderInput={(params) => <TextField fullWidth
            margin="dense" {...params} />}
        />
    </LocalizationProvider>

        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleDialogClose()}>Cancel</Button>
          <Button onClick={()=>{setDataRange(''); handleDialogClose('custom')}} autoFocus>
            Set
          </Button>
        </DialogActions>
      </Dialog>


        <h2 className='DashboardComponentTitle'  >Quick Reports : </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', maxWidth: '1450px', margin: 'auto' }} >
          <div className='QuickViewCards' >
            <QuickViewCard Title={'Bulk Videos'} Color={'#ff4560'} Number={totalNumberOfBulkVideos} numberTitle={'Videos'} />
            <QuickViewCard Title={'Bulk Thumbnails'} Color={'#feb019'} Number={totalNumberOfBulkThumbnails} numberTitle={'Thumbnails'} />
            <QuickViewCard Title={'Single Videos'} Color={'#00e396'} Number={totalNumberOfSingleVideos} numberTitle={'Videos'} />
            <QuickViewCard Title={'Single Thumbnails'} Color={'#008ffb'} Number={totalNumberOfSingleThumbnails} numberTitle={'Thumbnails'} />
            <QuickViewCard Title={'Total Thumbnails'} Color={'rgb(14 56 72)'} Number={totalNumberOfThumbnailsDownloaded} numberTitle={'Thumbnails'} />
            <QuickViewCard Title={'Total Videos'} Color={'rgb(14 56 72)'} Number={totalNumberOfVideosDownloaded} numberTitle={'Videos'} />
          </div>

          <ReactApexChart options={chartData2.options} series={chartData2.series} type="pie" width={380} className='DashboardCard' style={{ width: 'fit-content', height: 'fit-content' }} />
        </div>
        <h2 className='DashboardComponentTitle'  > Single Videos vs Single Thumbnails vs Bulk Videos vs Bulk Thumbnails : </h2>

        <ReactApexChart options={chartData1.options} series={chartData1.series} type="area" height={350} className='DashboardCard' style={{ width: '90%' }} />

          <h2 className='DashboardComponentTitle'  >History</h2>
        {downloadsData && <DownloadsTable rows={downloadsData} />}

      </div>

        : <div>             <DashboardLogin success={success} setSuccess={setSuccess} /></div>}


      {success && <Button size='medium' color='error' style={{ position: 'absolute', right: '20px', top:'10px' }} onClick={() => { localStorage.setItem('admin', 'false'); setSuccess(false) }} >Logout</Button>}

    </div>
  )
}

export default DashboardPage