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
//sort rows based on id from big to small 
  const handleSort = () => rows
  return (
    <Paper className='DashboardCard' style={{width:'90%'}}>
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
              ?.sort(function(a, b){	return a.download_id < b.download_id ? 1 : a.download_id > b.download_id ? -1 : 0;})
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, i) => (
                <TableRow key={row?.download_id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: (row?.download_type == 'bulk') ? '#5e5e5e0d' : 'auto'}} >
                  <TableCell align="center" style={{ textTransform: 'capitalize' }} >{row?.download_type}  </TableCell>
                  <TableCell align="center"> {row.download_cover && <b>{row?.download_number_of_links} <BsImage className='TableIcons ' style={{ color: '#ff0050' }} /></b>} {row.download_video && <b>{row?.download_number_of_links} <BsCameraVideoFill className='TableIcons' style={{ color: 'rgb(0, 183, 255)' }} /></b>}  </TableCell>
                  <TableCell align="center">{new Date(row?.download_date).toLocaleString()}</TableCell>
                  <TableCell align="center">{row?.download_thumbnail_duration && <div>{row?.download_thumbnail_duration}s</div>} {!row?.download_thumbnail_duration && <GiEmptyChessboard style={{ opacity: '0.7', marginBottom: '-3.5px' }} />}</TableCell>
                  <TableCell align="center">{row?.download_video_duration && <div>{row?.download_video_duration}s</div>} {!row?.download_video_duration && <GiEmptyChessboard style={{ opacity: '0.7', marginBottom: '-3.5px' }} />}</TableCell>

                  <TableCell align="center" >
                    {(row?.download_number_of_links == 1 ) ?
                      <Link underline='hover' href={row?.download_link} target={'_blank'} >
                        {row?.download_link.substring((row?.download_link.includes('https://') ? 8 : 0), 45)}...
                      </Link>
                      : <div style={{display:'grid'}}>
                        {(row?.download_links).map((link)=>{
                          return(
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