import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './signup.css'; // Add this line to import the CSS file
import axios from 'axios';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    
const handleLogin = () => {
    // Perform login logic here
    console.log('Logging in...');
    
    // Add code to check if the username already exists in the user table
    axios.get(`https://back-1-7wvo.onrender.com/checkUsername/${username}`)
        .then((response) => {
            if (response.data.exists) {
                console.log('Username already exists');
                document.getElementById('already').style.display = 'block';
                // Handle the case where the username already exists
            } else {
                console.log('Username does not exist');
                // Handle the case where the username does not exist
                // Add code to insert new data into the user table in the MySQL database
                axios.post('https://back-1-7wvo.onrender.com/signup', {
                    name: username,
                    password: password,
                    email: email
                }).then((response) => {
                    console.log(response);
                    window.open('/', '_self');
                    localStorage.setItem('user', JSON.stringify(response.data));
                    localStorage.setItem('username', username);
                    console.log(JSON.stringify(response.data));
                });
            }
        });
};
        
        


            return (
                <div className='login-form'>
                    <div className='already-registered' id='already'>
                        <p>Username already exists. Please use a different username</p>
                    </div>

                    <h1>Sign up</h1>
                    <br />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button onClick={handleLogin}>Sign up</button>
                    <br />
                    <a href="/login">Already have an account? Login here</a>
                </div>
            );
        }


export default Login;
        
   