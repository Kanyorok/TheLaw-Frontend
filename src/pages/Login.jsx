import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/auth/authSlice";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import useToken from "../component/useToken"; // Import the useToken hook

const Login = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && user) {
      toast.success(message);
      navigate("/");
    }
  }, [user, isSuccess, isError, message, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (token) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return "loading....";
  }

  return (
    <section className="bg-[f4f7ff] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-[#1d1d1d] mb-5">Login</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="******************"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-[#5a67d8] hover:bg-[#4754b6] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <div>
              <NavLink to="/register"
                className="inline-block align-baseline font-bold text-sm text-[#5a67d8] hover:text-[#4754b6]"
              >
                Register
              </NavLink> /
              <NavLink to="#"
                className="inline-block align-baseline font-bold text-sm text-[#5a67d8] hover:text-[#4754b6]"
              >
                Forgot Password?
              </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
