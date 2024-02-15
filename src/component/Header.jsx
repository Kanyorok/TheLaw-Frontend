import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import homeicon from '../assets/law.png';

const Header = () => {
  const loc = useLocation();
  function activeNavLink(path) {
    if (path === loc.pathname) {
      return 'underline';
    }
    return '';
  }
  return (
    <div className="bg-white border-b-2 pt-3 pb-3">
      <header className="flex justify-between px-4 max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 cursor-pointer ${activeNavLink('/')}`}>
          <img src={homeicon} alt="Main Logo" width="50" />
          <h1>Lawyer&apos; Hub</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4">
            <ul className="flex items-center divide-x-4 divide-[#1c1c1d]">
              <li
                className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] border-b-[3px] border-b-transparent ${activeNavLink('/')}`}
              >
                <NavLink to="/">Cases</NavLink>
              </li>
              <li
                className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] ${activeNavLink('/addcases')}`}
              >
                <NavLink to="/addcases">Add Case</NavLink>
              </li>
              <li
                className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] ${activeNavLink('/reserve')}`}
              >
                <NavLink to="/reserve">Reserve Appointment</NavLink>
              </li>
              <li
                className={`cursor-pointer py-3 px-4 text-sm font-semibold text-[#3d97ff] ${activeNavLink('/completecases')}`}
              >
                <NavLink to="/completecases">Completed Cases</NavLink>
              </li>
            </ul>
          </div>
          <div className="px-6">
            <form className="relative">
              <input type="search" placeholder="Search..." className="pl-10 px-3 border-[3px] rounded-full" />
              <span className="absolute left-0 top-0 ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </form>
          </div>
          <div className={`px-4 cursor-pointer py-3 text-sm font-semibold text-[#3d97ff] ${activeNavLink('/user')}`}>
            <NavLink to="/user">User</NavLink>
          </div>
        </div>

      </header>
    </div>
  );
};

export default Header;
