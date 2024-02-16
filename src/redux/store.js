import { configureStore } from '@reduxjs/toolkit';
import casesReducer from './cases/casesSlice';
import caseDetailsReducer from './cases/caseDetailsSlice';

const store = configureStore({
  reducer: {
    cases: casesReducer,
    caseDetails: caseDetailsReducer,
  },
});
export default store;