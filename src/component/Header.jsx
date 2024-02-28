import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import homeicon from "../assets/law.png";
import { logout, reset } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import useToken from "./useToken";

const Header = () => {
  const { token } = useToken();
  const loc = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  function activeNavLink(path) {
    if (path === loc.pathname) {
      return "underline";
    }
    return "";
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="bg-white border-b-2 pt-3 pb-3">
      <header className="flex justify-between px-4 max-w-6xl mx-auto">
        <div
          className={`flex items-center gap-3 cursor-pointer ${activeNavLink(
            "/"
          )}`}
        >
          <img src={homeicon} alt="Main Logo" width="50" />
          <h1>Lawyer&apos; Hub</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4">
            <ul className="flex items-center divide-x-4 divide-[#1c1c1d]">
              <li
                className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] border-b-[3px] border-b-transparent ${activeNavLink(
                  "/"
                )}`}
              >
                <NavLink to="/">Cases</NavLink>
              </li>
              <li
                className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] ${activeNavLink(
                  "/addcases"
                )}`}
              >
                <NavLink to="/addcases">Add Case</NavLink>
              </li>
              <li
                className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] ${activeNavLink(
                  "/reserve"
                )}`}
              >
                <NavLink to="/reserve">Reserve Appointment</NavLink>
              </li>
              <li
                className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] ${activeNavLink(
                  "/completecases"
                )}`}
              >
                <NavLink to="/completecases">Completed Cases</NavLink>
              </li>
            </ul>
          </div>
          <div className="px-6 relative">
            <form className="max-w-lg mx-auto">
              <div className="flex">
                {/* Dropdown for All categories */}
                <button
                  id="dropdown-button"
                  onClick={toggleCategories}
                  className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  type="button"
                >
                  All categories
                  <svg
                    className={`w-2.5 h-2.5 ms-2.5 transition-transform transform ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search..."
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-black bg-white-700 rounded-e-lg border border-white-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
              <div
                id="dropdown"
                className={`z-10 ${
                  isCategoriesOpen ? "" : "hidden"
                } absolute left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Closed Cases
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Open Cases
                    </button>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div className="relative">
            {/* Dropdown for User */}
            {token ? (
              <>
                <div
                  className={`px-4 cursor-pointer py-3 text-sm font-semibold text-[#3d97ff] relative ${activeNavLink(
                    "/user"
                  )}`}
                  onClick={toggleDropdown}
                >
                  User
                  <div
                    className={`absolute z-10 right-0 mt-2 w-48 bg-white rounded-lg shadow-xl ${
                      isDropdownOpen ? "" : "hidden"
                    }`}
                  >
                    <div className="py-1">
                      <NavLink
                        to="/user"
                        className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                        activeClassName="bg-indigo-500 text-white"
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
