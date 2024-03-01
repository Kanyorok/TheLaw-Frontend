import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import homeicon from "../assets/law.png";
import { logout, reset } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Dropdown, initTE, } from "tw-elements";

const Header = () => {
  initTE({ Collapse, Dropdown });
  const loc = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);

  function activeNavLink(path) {
    if (path === loc.pathname) {
      return "underline";
    }
    return "";
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setUserOpen(!isUserOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  useEffect(() => {
    if (loc.pathname !== "/login" && loc.pathname !== "/register") {
      setIsLogoutOpen(true);
      setIsDropdownOpen(false);
    } else {
      setIsLogoutOpen(false);
    }
  }, [loc.pathname]);

  const handleLogout = async () => {
    // Add confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      try {
        // Dispatch logout action
        await dispatch(logout());
        await dispatch(reset());

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        // Handle errors gracefully
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again later.");
      }
    }
  };

  return (
      <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent12"
            aria-controls="navbarSupportedContent12"
            aria-expanded={isDropdownOpen ? "true" : "false"} // Set aria-expanded based on dropdown visibility
            aria-label="Toggle navigation"
            onClick={toggleDropdown}
          >
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>
          <div
            className={`${
              isDropdownOpen ? "!visible" : "hidden"
            } flex-grow basis-[100%] items-center lg:!flex lg:basis-auto`}
            id="navbarSupportedContent12"
            data-te-collapse-item
          >
            <a
              className="mb-4 cursor-pointer ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
              Link
              to="/"
            >
              <img
                src={homeicon}
                style={{ height: "50px" }}
                alt="Main Logo"
                loading="lazy"
              />
              <h1>Lawyer&apos;s Hub</h1>
            </a>
            <ul
              className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
              data-te-navbar-nav-ref
            >
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <NavLink
                  className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] border-b-[3px] border-b-transparent ${activeNavLink(
                    "/"
                  )}`}
                  data-te-nav-link-ref
                  to="/"
                >
                  Cases
                </NavLink>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <NavLink
                  className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] ${activeNavLink(
                    "/addcases"
                  )}`}
                  data-te-nav-link-ref
                  to="/addcases"
                >
                  Add Case
                </NavLink>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <NavLink
                  className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] ${activeNavLink(
                    "/reserve"
                  )}`}
                  data-te-nav-link-ref
                  to="/reserve"
                >
                  Reserve Appointment
                </NavLink>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <NavLink
                  className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] ${activeNavLink(
                    "/completecases"
                  )}`}
                  data-te-nav-link-ref
                  to="/completecases"
                >
                  Completed Cases
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="relative flex items-center">
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
            <div
              className="relative"
              data-te-dropdown-ref
              data-te-dropdown-alignment="end"
            >
              <NavLink
                className="hidden-arrow mr-4 flex items-center text-secondary-500 transition duration-200 hover:text-secondary-400 hover:ease-in-out focus:text-secondary-400 disabled:text-black/30 motion-reduce:transition-none"
                href="#"
                id="dropdownMenuButton1"
                role="button"
                data-te-dropdown-toggle-ref
                aria-expanded="false"
                onClick={toggleNotification}
              >
                <span className="[&>svg]:w-5" onClick={toggleNotification}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                  1
                </span>
              </NavLink>
              <ul
                className={`absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block ${
                  isNotificationOpen ? "" : "hidden"
                }`}
                aria-labelledby="dropdownMenuButton1"
                data-te-dropdown-menu-ref
              >
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                    href="#"
                    data-te-dropdown-item-ref
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                    href="#"
                    data-te-dropdown-item-ref
                  >
                    Another action
                  </a>
                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                    href="#"
                    data-te-dropdown-item-ref
                  >
                    Something else here
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="relative"
              data-te-dropdown-ref
              data-te-dropdown-alignment="end"
            >
              {isLogoutOpen ? (
                <>
                  <NavLink
                    className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                    href="#"
                    id="dropdownMenuButton2"
                    role="button"
                    data-te-dropdown-toggle-ref
                    aria-expanded="true"
                    onClick={toggleUserDropdown}
                  >
                    <img
                      src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                      className="rounded-full"
                      style={{ height: "25px", width: "25px" }}
                      alt=""
                      loading="lazy"
                    />
                  </NavLink>
                  <ul
                    className={`absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block ${
                      isUserOpen ? "" : "hidden"
                    }`}
                    aria-labelledby="dropdownMenuButton2"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <NavLink
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                        data-te-dropdown-item-ref
                        to="/user"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                        onClick={handleLogout}
                        data-te-dropdown-item-ref
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
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
        </div>
      </nav>
  );
};

export default Header;
