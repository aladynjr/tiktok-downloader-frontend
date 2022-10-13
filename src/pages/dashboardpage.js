import React, { useEffect, useState } from 'react'
import DashboardLogin from '../components/DashboardLogin'
import { Button } from '@mui/material'
import DownloadsTable from '../components/DownloadsTable'
import ReactApexChart from 'react-apexcharts'
import LinesAnimation from '../components/LinesAnimation'

function QuickViewCard({Title, Color, Number, numberTitle}){
  return (
    <div className='DashboardCard' style={{width:'90%', maxWidth:'220px', minHeight:'130px'}}>
    <p className='TotalNumbersTitle'  >{Title} : </p>
    <div style={{fontSize:'60px', fontWeight:'900px', color:Color}} >
  {Number}
  </div>
  <div className='DashboardCardNumberTitle' style={{color: Color}} >{numberTitle}</div>
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
  var formattedDateAllTime = '2022-10-01';


  //fetch donwloads data data
  const [downloadsData, setDownloadsData] = useState(null)

  const FetchDownloadsData = async (startDate, endDate) => {

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
  }

  useEffect(() => {
    FetchDownloadsData(formattedDateToday, formattedDateToday)
  }, [])

  //fetch data for different ranges of time
  const [dataRange, setDataRange] = useState('day')

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
        break;
    }

  }, [dataRange])


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

    default: dateStart = new Date(formattedDateToday); break;
  }
  //get all the dates (daily) in a day object in this format 'dd/MM/yy HH:mm' between day start and date end 
  var dates = []
  var day = dateStart;
  while (day <= dateEnd) {
    dates.push(new Date(day))
    day.setDate(day.getDate() + 1);
  }


  console.log({ dates })

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

  console.log({ bulkThumbnailsSeries })
  console.log({ bulkVideosSeries })
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

  return (
    <div style={{ backgroundColor: '#f1f5f9', marginTop: '-16px' }} className='DashboardPage' >
      {success ? <div>
   

<div className='QuickViewCards' >
        <QuickViewCard Title={'Bulk Videos'} Color={'#ff4560'} Number={totalNumberOfBulkVideos} numberTitle={'Videos'} />
        <QuickViewCard Title={'Bulk Thumbnails'} Color={'#feb019'} Number={totalNumberOfBulkThumbnails} numberTitle={'Thumbnails'} />
        <QuickViewCard Title={'Single Videos'} Color={'#00e396'} Number={totalNumberOfSingleVideos} numberTitle={'Videos'} />
        <QuickViewCard Title={'Single Thumbnails'} Color={'#008ffb'} Number={totalNumberOfSingleThumbnails} numberTitle={'Thumbnails'} />
        <QuickViewCard Title={'Total Thumbnails'} Color={'rgb(14 56 72)'} Number={totalNumberOfThumbnailsDownloaded} numberTitle={'Thumbnails'} />
        <QuickViewCard Title={'Total Videos'} Color={'rgb(14 56 72)'} Number={totalNumberOfVideosDownloaded} numberTitle={'Videos'} />
</div>
<div style={{display:'flex', flexWrap:'wrap', justifyContent:'center' }} >
        <Button size='small' style={{marginInline:'20px'}} variant='outlined' onClick={() => setDataRange('day')} > Today </Button>
        <Button size='small' style={{marginInline:'20px'}} variant='outlined' onClick={() => setDataRange('week')}> Last 7 Days </Button>
        <Button size='small' style={{marginInline:'20px'}} variant='outlined' onClick={() => setDataRange('month')}> Last 30 Days </Button>
        <Button size='small' style={{marginInline:'20px'}} variant='outlined' onClick={() => setDataRange('year')}> Last Year </Button>
        <Button size='small' style={{marginInline:'20px'}} variant='outlined' onClick={() => setDataRange('alltime')}> All-time </Button>
</div>
        <ReactApexChart options={chartData2.options} series={chartData2.series} type="pie" width={380} className='DashboardCard' style={{ width: 'fit-content' }} />

        <ReactApexChart options={chartData1.options} series={chartData1.series} type="area" height={350} className='DashboardCard' style={{ width: '90%' }} />


        {downloadsData && <DownloadsTable rows={downloadsData} />}

      </div>

        : <div>             <DashboardLogin success={success} setSuccess={setSuccess} /></div>}


      {success && <Button size='medium' color='error' style={{ position: 'absolute', right: '20px' }} onClick={() => { localStorage.setItem('admin', 'false'); setSuccess(false) }} >Logout</Button>}

    </div>
  )
}

export default DashboardPage