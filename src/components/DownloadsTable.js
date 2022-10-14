import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { BsImage, BsCameraVideoFill } from 'react-icons/bs'
import { GiEmptyChessboard } from 'react-icons/gi'
import Link from '@mui/material/Link';
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from '@mui/material'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

/*const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/

export default function DownloadsTable({ rows }) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //organise rows which is an array of object to an array with first item is name of fields for exporting to csv

  let rowsNames = []

  Object.keys(rows[0]).map(i => {

    rowsNames.push(i)
  })


  const players = [
    {
      name:"Tom Latham",age:29,team:"New Zealand"
    },
    {
      name:"Devon Conway",age:30,team:"New Zealand"
    },
    {
      name:"Kane Williamson",age:31,team:"New Zealand"
    },
    {
      name:"Will Young",age:29,team:"New Zealand"
    }
  ]
//download_id,"download_date","download_type","download_links","download_link","download_number_of_links","download_cover","download_video","download_video_duration","download_thumbnail_duration"
  const headers = [
    {
      label:" ID", key:"download_id"
    },
    {
      label:" Date", key: "download_date"
    },
    {
      label:" Type",key:"download_type"
    },
    {
      label:" Links", key:"download_links"
    },
    {
      label:" Link", key:"download_link"
    },
    {
      label:" Number of Links", key:"download_number_of_links"
    },
    {
      label:" Cover", key:"download_cover"
    },
    {
      label:" Video", key:"download_video"
    },
    {
      label:" Video Duration", key:"download_video_duration"
    },
    {
      label:" Thumbnail Duration", key:"download_thumbnail_duration"
    }

   
  ]
   
  const csvLink = {
    headers: headers,
    data: rows,
    filename:"csvfile.csv"
  }

  const [downloadCSV, setDownloadCSV] = useState(false)
  useEffect(() => {
    if (!downloadCSV) return
    setDownloadCSV(false)
  }, [downloadCSV])


  return (
    <Paper className='DashboardCard' style={{ width: '90%' }}>
      <Button variant="outlined" size="small" onClick={() => downloadCSV(true)}  >Download CSV</Button>
      <CSVLink {...csvLink}>Export to CSV</CSVLink>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell align="center" >Type</TableCell>
              <TableCell align="center" >Quantity</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Thumbnail(s) Duration</TableCell>
              <TableCell align="center">Video(s) Duration</TableCell>
              <TableCell align="center">Link(s)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              //sort by date
              ?.sort(function (a, b) { return a.download_id < b.download_id ? 1 : a.download_id > b.download_id ? -1 : 0; })
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, i) => (
                <TableRow key={row?.download_id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: (row?.download_type == 'bulk') ? '#5e5e5e0d' : 'auto' }} >
                  <TableCell align="center" style={{ textTransform: 'capitalize' }} >{row?.download_type}  </TableCell>
                  <TableCell align="center"> {row.download_cover && <b>{row?.download_number_of_links} <BsImage className='TableIcons ' style={{ color: '#ff0050' }} /></b>} {row.download_video && <b>{row?.download_number_of_links} <BsCameraVideoFill className='TableIcons' style={{ color: 'rgb(0, 183, 255)' }} /></b>}  </TableCell>
                  <TableCell align="center">{new Date(row?.download_date).toLocaleString()}</TableCell>
                  <TableCell align="center">{row?.download_thumbnail_duration && <div>{row?.download_thumbnail_duration}s</div>} {!row?.download_thumbnail_duration && <GiEmptyChessboard style={{ opacity: '0.7', marginBottom: '-3.5px' }} />}</TableCell>
                  <TableCell align="center">{row?.download_video_duration && <div>{row?.download_video_duration}s</div>} {!row?.download_video_duration && <GiEmptyChessboard style={{ opacity: '0.7', marginBottom: '-3.5px' }} />}</TableCell>

                  <TableCell align="center" style={{ textAlign: 'left' }} >
                    {(row?.download_number_of_links == 1) ?
                      <Link underline='hover' href={row?.download_link} target={'_blank'}  >
                        {row?.download_link.substring((row?.download_link.includes('https://') ? 8 : 0), 45)}...
                      </Link>
                      : <div style={{ display: 'grid',textAlign: 'left' }}>
                        {(row?.download_links).map((link) => {
                          return (
                            <Link underline='hover' href={link} target={'_blank'} >
                              {link.substring((link.includes('https://') ? 8 : 0), 45)}...
                            </Link>
                          )
                        })}
                      </div>

                    }</TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="Paper"
        count={rows?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}