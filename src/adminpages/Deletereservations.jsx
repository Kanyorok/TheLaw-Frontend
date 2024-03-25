import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/reservation/reservationSlice';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

const Deletereservations = () => {
  return (
    <div>Deletereservations</div>
  )
}

export default Deletereservations