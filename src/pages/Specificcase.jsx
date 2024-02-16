import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Specificcase = ({ caseList }) => {
  const isOddRow = caseList.itemNumber % 2 === 1;

  return (
    <tr className={isOddRow ? 'bg-neutral-100' : ''}>
      <td className="w-1/6 font-bold whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        {caseList.itemNumber}
      </td>
      <td className="w-1/6 font-bold whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        <Link to={caseList ? `/cases/${caseList.case_id}` : '/services'} className="card-link discover-link">
          {caseList.case_title}
        </Link>
      </td>
      <td className="w-3/6 whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        {caseList.description}
      </td>
    <td className="w-3/6 whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        <ul>
            {caseList.stakeholders.map((stakeholder, index) => (
                <li key={index}>{index+1}. {stakeholder}</li>
            ))}
        </ul>
    </td>
      <td className="w-3/6 whitespace-wrap border-b border-r px-6 py-4 dark:border-neutral-500">
        {caseList.status}
      </td>
    </tr>
  );
};

Specificcase.propTypes = {
  caseList: PropTypes.shape().isRequired,
};

export default Specificcase;