import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';


const Specificcase = ({ caseList }) => {
  const isOddRow = caseList.itemNumber % 2 === 1;

  return (
    <TableRow className={isOddRow ? 'bg-neutral-100' : ''}>
      <TableCell className="w-1/6 font-bold whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        {caseList.itemNumber}
      </TableCell>
      <TableCell className="w-1/6 font-bold whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        <Link to={caseList ? `/cases/${caseList.case_id}` : '/'} className="card-link discover-link">
          {caseList.case_title}
        </Link>
      </TableCell>
      <TableCell className="w-3/6 whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        {caseList.description}
      </TableCell>
    <TableCell className="w-3/6 whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
      <ul>
        {caseList.stakeholders && caseList.stakeholders.map((stakeholder, index) => (
          <li key={index}>{index+1}. {stakeholder}</li>
        ))}
      </ul>
    </TableCell>
      <td className="w-3/6 whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        {caseList.status}
      </td>
    </TableRow>
  );
};

export default Specificcase;