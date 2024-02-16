import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Addcase from './pages/Addcase';
import Cases from './pages/Cases';
import Completecase from './pages/Completecase';
import Reserve from './pages/Reserve';
import User from './pages/User';
import Casedetails from './pages/Casedetail';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Cases />} />
          <Route path="/cases/:id" element={<Casedetails />} />
          <Route path="/addcases" element={<Addcase />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/completecases" element={<Completecase />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;