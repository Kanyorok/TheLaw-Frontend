import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { createCase } from "../redux/cases/casesSlice";

const Addcase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, message, } = useSelector((state) => state.cases);
  const [stakeholders, setStakeholders] = useState([
    { id: 1, firstName: "", lastName: "" },
  ]);
  const [caseData, setCaseData] = useState({
    title: "",
    description: "",
    status: "",
    stakeholders: [],
  });

  const handleAddStakeholder = () => {
    const newStakeholder = {
      id: stakeholders.length + 1,
      firstName: "",
      lastName: "",
    };
    setStakeholders([...stakeholders, newStakeholder]);
  };

  const handleFirstNameChange = (index, value) => {
    const updatedStakeholders = [...stakeholders];
    updatedStakeholders[index].firstName = value;
    setStakeholders(updatedStakeholders);
  };

  const handleLastNameChange = (index, value) => {
    const updatedStakeholders = [...stakeholders];
    updatedStakeholders[index].lastName = value;
    setStakeholders(updatedStakeholders);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedStakeholders = stakeholders.map(
      (stakeholder) => `${stakeholder.firstName} ${stakeholder.lastName}`
    );
    const formData = {
      ...caseData,
      stakeholders: JSON.stringify(formattedStakeholders), // Convert to JSON string
    };
    dispatch(createCase(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      navigate('/');
    }
  }, [isSuccess, message, navigate]);

  return (
    <div className="main-container">
      <section className="reservation-form">
        <form className="max-w-md w-full mx-auto" onSubmit={handleSubmit}>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="title"
              id="floating_client"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={caseData.title}
              onChange={(e) =>
                setCaseData({ ...caseData, title: e.target.value })
              }
              placeholder=" "
              required
            />
            <label
              for="title"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <textarea
              type="text"
              name="description"
              id="description"
              value={caseData.description}
              onChange={(e) =>
                setCaseData({ ...caseData, description: e.target.value })
              }
              rows={3}
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="description"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <select
              name="options"
              id="options"
              value={caseData.status}
              onChange={(e) =>
                setCaseData({ ...caseData, status: e.target.value })
              }
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            >
              <option value="">Select a Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <label
              for="options"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Status
            </label>
          </div>
          <div className="flex justify-center mb-3">
            <h1 className="text-lg font-medium mr-2">Stakeholders</h1>
            <button
              type="button"
              className="text-blue-500 focus:outline-none rounded-full border-blue-500 border hover:bg-blue-500 hover:text-white w-8 h-8 flex items-center justify-center"
              onClick={handleAddStakeholder}
            >
              +
            </button>
          </div>
          {stakeholders.map((stakeholder, index) => (
            <div className="grid grid-cols-2 gap-6" key={stakeholder.id}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name={`floating_first_name_${index}`}
                  id={`floating_first_name_${index}`}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={stakeholder.firstName}
                  onChange={(e) => handleFirstNameChange(index, e.target.value)}
                  required
                />
                <label
                  htmlFor={`floating_first_name_${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name={`floating_last_name_${index}`}
                  id={`floating_last_name_${index}`}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={stakeholder.lastName}
                  onChange={(e) => handleLastNameChange(index, e.target.value)}
                  required
                />
                <label
                  htmlFor={`floating_last_name_${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name
                </label>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Addcase;
