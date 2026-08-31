import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewBug from './pages/NewBug';
import Bugs from './pages/Bugs';
import BugDetail from './pages/BugDetail';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/bugs/new" element={<ProtectedRoute><NewBug /></ProtectedRoute>} />
        <Route path="/bugs" element={<ProtectedRoute><Bugs/></ProtectedRoute>}/>
        <Route path="/bugs/:id" element={<ProtectedRoute><BugDetail /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
