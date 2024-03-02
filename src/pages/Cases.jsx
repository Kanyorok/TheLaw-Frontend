import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { displayCases } from '../redux/cases/casesSlice';
import Specificcase from './Specificcase';
import MonthCalendar from '../component/MonthCalendar';

const Cases = () => {
  const { cases, loading, error, isError } = useSelector((state) => state.cases);
  const [currentPage, setCurrentPage] = useState(1);
  const [casesPerPage] = useState(5);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cases.length === 0) {
      dispatch(displayCases());
    }
  }, [dispatch, cases.length]);

  // Get current cases
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = cases.slice(indexOfFirstCase, indexOfLastCase);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto">
      <table className="table-fixed border dark:border-neutral-500 mt-4 mb-4">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th
              scope="col"
              className="border-r px-6 py-4 dark:border-neutral-500"
            >
              Case Number
            </th>
            <th
              scope="col"
              className="border-r px-6 py-4 dark:border-neutral-500"
            >
              Cases
            </th>
            <th
              scope="col"
              className="border-r px-6 py-4 dark:border-neutral-500"
            >
              Case Description
            </th>
            <th
              scope="col"
              className="border-r px-6 py-4 dark:border-neutral-500"
            >
              Stakeholders
            </th>
            <th
              scope="col"
              className="border-r px-6 py-4 dark:border-neutral-500"
            >
              {' '}
            </th>
          </tr>
        </thead>
        <tbody>
        {
  loading ? (
    <tr>
      <td colSpan="5" className="text-center py-4">
        Loading...
      </td>
    </tr>
  ) : isError ? (
    <tr>
      <td colSpan="5" className="text-center py-4">
        {error.message}
      </td>
    </tr>
  ) : (
    currentCases.map((caseList) => (
      <Specificcase key={caseList.itemNumber || uuidv4()} caseList={caseList} />
    ))
  )
}
        </tbody>
      </table>
      <div className="flex justify-center">
        <nav className="mt-4">
          <ul className="inline-flex -space-x-px text-sm">
            {currentPage > 1 && (
              <li className="page-item">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className="page-link flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
            )}
            {Array.from({ length: Math.ceil(cases.length / casesPerPage) }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`page-link ${currentPage === index + 1 ? 'flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {currentPage < Math.ceil(cases.length / casesPerPage) && (
              <li className="page-item">
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="page-link flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="flex mt-5 mb-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Upcoming Case</h1>
          <div className="flex">

          </div>
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
