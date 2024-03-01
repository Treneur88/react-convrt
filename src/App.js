import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Home from './/pages/home';
import Signup from './pages/signup';
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div className="container-fluid ghij">
            <a className="navbar-brand" href="/"><img src='/logo.png' className='logo'></img></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse float-right" id="navbarNav" >
              <ul className="navbar-nav ms-auto float-right justify-content-end"> {/* Add justify-content-end class */}
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/public">Recent Uploads</a>
                  </li>
                  <li className="nav-item">
                    <a className="signup" href="/signup" style={{ display: userExists ? 'none' : 'block' }}>Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="login" href="/login" style={{ display: userExists ? 'none' : 'block' }}>Login</a>
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
          <Route path="/login" element={<Login />} />
          <Route path="/share/:name" element={<Image />} />
          <Route path="/animation" element={<Anim />} />
          <Route path="/public" element={<Pub />} />
        </Routes>
      </Router>

      <footer class="footer-black foot">
        <div class="container">
          <div className='foot-s-a'>
          <p className='foot-s'>Information</p>
          <p className='foot-a'>Terms of Service</p>
          <p className='foot-a'>Privacy Policy</p>
          <p className='foot-a'>F.A.Q</p>
          </div>
          <p class="text-center">© 2024 All rights reserved Picto</p>
          <div className='foot-a-s'>
            <p className='foot-s'>Images uploaded</p>
            <p className='foot-a'>0</p>
            <p className='foot-s'>Screenshots taken</p>
            <p className='foot-a'>0</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;

