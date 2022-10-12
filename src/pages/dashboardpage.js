import React, { useEffect, useState } from 'react'
import DashboardLogin from '../components/DashboardLogin'
import { Button } from '@mui/material'
import DownloadsTable from '../components/DownloadsTable'
import ReactApexChart from 'react-apexcharts'

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

    var formattedDateLastWeek = (Number(yyyy)) + '-' + (Number(mm)) + '-' + (Number(dd) - 7);
    var formattedDateLastMonth = (Number(yyyy)) + '-' + (Number(mm) - 1) + '-' + (Number(dd));
    var formattedDateLastYear = (Number(yyyy) - 1) + '-' + (Number(mm)) + '-' + (Number(dd));
    var formattedDateAllTime = '2001-12-11';

    //fetch donwloads data data
    const [downloadsData, setDownloadsData] = useState(null)
    console.log({downloadsData})
    const FetchDownloadsData = async (startDate, endDate) => {

        try {
            const response = await fetch(process.env.REACT_APP_SERVER + '/api/dashboard/range/' + startDate + '/' + endDate);
            const jsonData = await response.json();
            setTodayData(jsonData)
            setDownloadsData(jsonData)
            console.log(jsonData);
            console.log('%c downloads data fetched', 'color: green')

        } catch (err) {
            console.error(err.message);
            console.log('%c downloads data NOT fetched', 'color: red')
        }
    }

useEffect(()=>{
    FetchDownloadsData(formattedDateToday,formattedDateToday)
},[])

    //data in different date ranges 
    const [todayData, setTodayData] = useState(null)
    const [weekData, setWeekData] = useState(null)
    const [monthData, setMonthData] = useState(null)
    const [yearData, setYearData] = useState(null)
    const [allTimeData, setAllTimeData] = useState(null)


    //todays quick view data 
    const [todayNumberOfLinks, setTodayNumberOfLinks] = useState(0)
    const [todayNumberOfVideosDownloaded, setTodayNumberOfVideosDownloaded] = useState(0)
    const [todayNumberOfThumbnailsDownloaded, setTodayNumberOfThumbnailsDownloaded] = useState(0)

    useEffect(() => {
        if (!todayData) return;
        setTodayNumberOfLinks(0)
        setTodayNumberOfVideosDownloaded(0)
        setTodayNumberOfThumbnailsDownloaded(0)

        var numberOfLinks = 0;
        var numberOfVideosDownloaded = 0;
        var numberOfThumbnailsDownloaded = 0;

        todayData.map((download) => {
            numberOfLinks = numberOfLinks + download.download_number_of_links
            if (download.download_video) numberOfVideosDownloaded = numberOfVideosDownloaded + (download.download_number_of_links);
            if (download.download_cover) numberOfThumbnailsDownloaded = numberOfThumbnailsDownloaded + (download.download_number_of_links);
        })

        setTodayNumberOfLinks(numberOfLinks)
        setTodayNumberOfVideosDownloaded(numberOfVideosDownloaded)
        setTodayNumberOfThumbnailsDownloaded(numberOfThumbnailsDownloaded)
    }, [todayData?.length])


//chart 
const chartData1 = {
          
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
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
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  
  
  };

  const chartData2 = {
          
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  
  
  };


    return (
        <div>
            <DashboardLogin success={success} setSuccess={setSuccess} />
            {success && <div>
                <p>Today Number Of Links : {todayNumberOfLinks}</p>
                <p>Today Number Of Videos Downloaded : {todayNumberOfVideosDownloaded}</p>
                <p>Today Number Of Thumbnails Downloaded : {todayNumberOfThumbnailsDownloaded}</p>

                <Button size='small' onClick={() => FetchDownloadsData(formattedDateToday, formattedDateToday)} > Today </Button>
                <Button size='small' onClick={() => FetchDownloadsData(formattedDateLastWeek, formattedDateToday)} > Last Week </Button>
                <Button size='small' onClick={() => FetchDownloadsData(formattedDateLastMonth, formattedDateToday)} > Last Month </Button>
                <Button size='small' onClick={() => FetchDownloadsData(formattedDateLastYear, formattedDateToday)} > Last Year </Button>
                <Button size='small' onClick={() => FetchDownloadsData(formattedDateAllTime, formattedDateToday)} > All Time </Button>



                <ReactApexChart options={chartData1.options} series={chartData1.series} type="area" height={350} />

                <ReactApexChart options={chartData2.options} series={chartData2.series} type="pie" width={380} />

               {downloadsData &&  <DownloadsTable rows={downloadsData} />}

            </div>}
            {success && <Button size='medium' color='error' style={{ position: 'absolute',  right: '20px' }} onClick={() => { localStorage.setItem('admin', 'false'); setSuccess(false) }} >Logout</Button>}

        </div>
    )
}

export default DashboardPage