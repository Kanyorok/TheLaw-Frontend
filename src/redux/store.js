import { configureStore } from '@reduxjs/toolkit';
import casesReducer from './cases/casesSlice';
import caseDetailsReducer from './cases/caseDetailsSlice';
import authReducer from './auth/authSlice';
import loadUserReducer from './auth/loadUserSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cases: casesReducer,
    caseDetails: caseDetailsReducer,
    loadUser: loadUserReducer,
  },
});
export default store;