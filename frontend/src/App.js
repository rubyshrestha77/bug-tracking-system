import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewBug from './pages/NewBug';
import Bugs from './pages/Bugs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bugs/new" element={<NewBug />} />
        <Route path="/bugs" element={<Bugs/>} />
      </Routes>
    </Router>
  );
}

export default App;
