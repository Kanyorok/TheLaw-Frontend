import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../redux/auth/loadUserSlice";

const User = () => {
  const dispatch = useDispatch();
  const { user: loggedInUser, isLoading } = useSelector(
    (state) => state.loadUser
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="main-container max-w-6xl mx-auto mt-4">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {isLoading ? "Loading..." : loggedInUser?.name}
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
           <i>Role: {loggedInUser?.role}</i>
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Full name</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {loggedInUser?.name}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {loggedInUser?.email}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Salary</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                $10,000
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">About</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                To get social media testimonials like these, keep your customers
                engaged with your social media accounts by posting regularly
                yourself
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default User;
