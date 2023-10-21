
import './App.css';

//Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//hooks
import { useAuth } from './hooks/useAuth';

//Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

//Pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile.js';
import Photo from './pages/Photo/Photo';
import Search from './pages/Search/Search';



function App() {
  const { auth, loading } = useAuth();
  console.log(loading);
  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
            <Route path="/profile" element={auth ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
            <Route path="/search" element={auth ? <Search/> : <Navigate to="/login" />} />
            <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
