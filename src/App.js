import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/Header";
import Addcase from "./pages/Addcase";
import Cases from "./pages/Cases";
import Completecase from "./pages/Completecase";
import Reserve from "./pages/Reserve";
import User from "./pages/User";
import Casedetails from "./pages/Casedetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./component/PrivateRoute";
import ReserveDetails from "./pages/ReserveDetails";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Cases />} />
            <Route path="/cases/:id" element={<Casedetails />} />
            <Route path="/Search/:keyword" Component={Cases} />
            <Route path="/addcases" element={<Addcase />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/reserve/:id" element={<ReserveDetails />} />
            <Route path="/completecases" element={<Completecase />} />
            <Route path="/user" element={<User />} />
          </Route>          
          {/* Redirect all other URLs to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
