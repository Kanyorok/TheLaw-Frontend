import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayCases } from '../redux/cases/casesSlice';
import Specificcase from './Specificcase';
import { v4 as uuidv4 } from 'uuid';
import MonthCalendar from '../component/MonthCalendar';
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Cases = () => {
  const { cases, loading, error, isError, totalPages } = useSelector((state) => state.cases);
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 5;
  const { keyword } = useParams();
  
  const Keyword = keyword;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayCases({ currentPage, casesPerPage, Keyword }));
  }, [dispatch, currentPage, casesPerPage, Keyword]);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  console.log('current page in component', currentPage);

  return (
    <div className="max-w-6xl mx-auto">
      <TableContainer component={Paper}>
        <Table aria-label="cases table">
          <TableHead>
            <TableRow>
              <TableCell>Case Number</TableCell>
              <TableCell>Cases</TableCell>
              <TableCell>Case Description</TableCell>
              <TableCell>Stakeholders</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((caseList) => (
              <Specificcase key={caseList.itemNumber || uuidv4()} caseList={caseList} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center mt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
        <Button>{currentPage} / {totalPages}</Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>
      <div className="flex mt-5 mb-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Upcoming Case</h1>
          <div className="flex"></div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-center">Month: {new Date().toLocaleString('default', { month: 'long' })}</h2>
          <MonthCalendar />
        </div>
      </div>
    </div>
  );
};

export default Cases;
