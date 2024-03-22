import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReservation } from "../redux/reservation/reservationSlice";

const Reserve = () => {
  const dispatch = useDispatch();
  const { isError, message, error, loading } = useSelector((state) => state.reservation);
  const [reservationData, setReservationData] = useState({
    client_name: "",
    description: "",
    contact: "",
    appointment_date: "",
    services: "",
  });

  const handleSubmitReservation = (e) => {
    e.preventDefault();

    const formData = {
      ...reservationData
    }

    dispatch(createReservation(formData));
  }

  return (
    <div className="main-container max-w-6xl mx-auto mt-4">
      <section className="reservation-form">
        <form onSubmit={handleSubmitReservation}>
          <fieldset>
            <legend><h2 className="mb-5">Reservation Form:</h2></legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name of client"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name of Client
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    id="client_name"
                    value={reservationData.client_name}
                    onChange={(e) => setReservationData({ ...reservationData, client_name: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name of Client"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    id="description"
                    value={reservationData.description}
                    onChange={(e) => setReservationData({ ...reservationData, description: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter description"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="contact"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    id="contact"
                    value={reservationData.contact}
                    onChange={(e) => setReservationData({ ...reservationData, contact: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter contact details"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="appointment_date"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Appointment Date
                </label>
                <div className="relative">
                  <input
                    required
                    type="date"
                    id="appointment_date"
                    value={reservationData.appointment_date}
                    onChange={(e) => setReservationData({ ...reservationData, appointment_date: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="service_id"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select a Service
                </label>
                <div className="relative">
                  <select
                    required
                    id="services"
                    value={reservationData.services}
                    onChange={(e) => setReservationData({ ...reservationData, services: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select a service</option>
                    <option value="1">Inquiry</option>
                    <option value="2">Regular</option>
                    <option value="3">Premium</option>
                    <option value="4">Urgent Meeting</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </fieldset>
        </form>
        {loading ? (<p className="text-center mt-4">Loading...</p>) : isError ? (<p className="text-center mt-4">{error}</p>) : (<p className="text-center mt-4">{message}</p>)}
      </section>
    </div>
  );
};

export default Reserve;
