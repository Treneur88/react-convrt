import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Home from './/pages/home';
import Signup from './pages/signup';
import Cropper from './pages/cropper';
import Login from './pages/login';
import Image from './pages/images';
import Anim from './pages/animation';
import Pub from './pages/public';

function App() {
  const userExists = localStorage.getItem("username") == null ? false : true;
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = localStorage.getItem("username");
  console.log(userExists, userName);

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    window.open("/", "_self");
  }

  return (
    <div className="App">
      <div className="home">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/"><img src='/logo.png' className='logo'></img></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse float-right" id="navbarNav">
              <ul className="navbar-nav ml-auto float-right">
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/public">Recent Uploads</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link signup" href="/signup" style={{ display: userExists ? 'none' : 'block' }}>Signup</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link login" href="/login" style={{ display: userExists ? 'none' : 'block' }}>Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" style={{ display: userExists ? 'block' : 'none' }}>{userName}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" style={{ display: userExists ? 'block' : 'none' }} onClick={logout}>Logout</a>
                  </li>
                </>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cropper" element={<Cropper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/image/:name" element={<Image />} />
          <Route path="/animation" element={<Anim />} />
          <Route path="/public" element={<Pub />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
 