import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col} from 'react-bootstrap';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import homeicon from '../assets/law.png';
import { fetchCaseDetails } from '../redux/cases/caseDetailsSlice';

const Casedetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const service = useSelector((state) => state.caseDetails.data);
  const status = useSelector((state) => state.caseDetails.status);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          await dispatch(fetchCaseDetails(id));
        }
      } catch (error) {
        throw new Error(`Error fetching service details: ${error}`);
      }
    };

    fetchDetails();
  }, [dispatch, id]);

  if (!id || status === 'loading' || !service) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <Row className="service-details flex justify-center space-x-10 mt-5">
      <Col md={8}>
        <img
          src={homeicon}
          alt="service"
          className="service-image"
          style={{
            width: '80%', height: '70vh', borderRadius: '5%', border: '3px solid #6297ff',
          }}
        />
      </Col>
      <Col md={4}>
        <div className="right-side-details">
          <h2 className="bigger-stronger-heading">{service.title}</h2>
          <em className="smaller-min-cost">
            {' '}
            Case Number:
            {' '}
            {service.id}
          </em>
          <p className="service-description">Description: {service.description}</p>
          <p className="service-description">Stakeholders:
          {service.stakeholders && (
            <ul>
              {service.stakeholders.map((stakeholder, index) => (
                <li key={index}>{index+1}. {stakeholder}</li>
              ))}
            </ul>
          )}
          </p>
          <p className="service-description">Assigned Lawyer: {service.lawyer}</p>
          <p className="service-description">Status: {service.status}</p>
          <Link to="/" className="discover-link">Discover More Cases</Link>
          <br />
          <button
            type="button" 
            className="reserve-button bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Reserve Appointment <FaRegArrowAltCircleRight />
          </button>
        </div>
      </Col>
    </Row>
  );
};

Casedetails.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

Casedetails.defaultProps = {
  params: {},
};

export default Casedetails;