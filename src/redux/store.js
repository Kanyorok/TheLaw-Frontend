import { configureStore } from '@reduxjs/toolkit';
import casesReducer from './cases/casesSlice';
import caseDetailsReducer from './cases/caseDetailsSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cases: casesReducer,
    caseDetails: caseDetailsReducer,
  },
});
export default store;