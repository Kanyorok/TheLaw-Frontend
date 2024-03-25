import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/reservation/reservationSlice';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Reservation from './Reservation';
import Searchreservation from './Searchreserve';

const Deletereservations = () => {
  const { reservations, loading, error, isError, totalPages } = useSelector((state) => state.reservation);
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 5;
  
  const { keyword } = useParams();

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetchReservations({ currentPage, reservationsPerPage, keyword }))
  }, [dispatch, currentPage, reservationsPerPage, keyword])
  
  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <TableContainer component={Paper}>
        <Table aria-label="cases table">
          <TableHead>
            <TableRow>
            <TableCell colSpan="5" className="text-center py-4">
              <Searchreservation/>
            </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reservation</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            loading ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-4">
                  {error.message}
                </TableCell>
              </TableRow>
            ) : keyword ? (
              reservations?.map((reserveList) => (
                <Reservation key={reserveList.itemNumber || uuidv4()} reserveList={reserveList} />
              ))
          ) : (
            reservations?.map((reserveList) => (
              <Reservation key={reserveList.itemNumber || uuidv4()} reserveList={reserveList} />
            ))
          )
          }
          </TableBody>
      </Table>
       </TableContainer>
       <div className="flex justify-center mt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
        <Button>{currentPage} / {totalPages}</Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>
    </div>
  )
}

export default Deletereservations