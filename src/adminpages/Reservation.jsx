import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TableCell, TableRow, Button } from '@mui/material';

const Reservation = ({ reserveList }) => {
    const isOddRow = reserveList.itemNumber % 2 === 1;
  return (
    <TableRow className={isOddRow ? 'bg-neutral-100' : ''}>
      <TableCell className="w-1/6 font-bold whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        {reserveList.description}
      </TableCell>
      <TableCell className="w-1/6 font-bold whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
          {reserveList.user_name}
      </TableCell>
      <TableCell className="w-3/6 whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        {reserveList.date}
      </TableCell>
    <TableCell className="w-3/6 whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
      <Button>Delete</Button>
    </TableCell>
    </TableRow>
  )
}

export default Reservation