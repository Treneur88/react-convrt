import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './signup.css'; // Add this line to import the CSS file
import axios from 'axios';// Import the database module

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    
 const handleLogin = () => {
    // Perform login logic here
    axios.get(`https://back-1-7wvo.onrender.com/checkUsername/${username}`)
    .then((response) => {
        if (response.data.exists) {
            console.log('Username already exists');
            axios.get(`https://back-1-7wvo.onrender.com/checkUsername/${username}`)
    .then((response) => {
        if (response.data.exists) {
            console.log('Username already exists');
                        // Check if password is correct for the username in the user table
                        axios.get(`https://back-1-7wvo.onrender.com/checkPassword/${username}/${password}`)
                        .then((response) => {
                            if (response.status === 200) {
                                console.log('Password is correct');
                                localStorage.setItem('username', username);
                                window.open('/', '_self');
                                // Handle successful login
                            } else {
                                console.log('Password is incorrect');
                                // Handle incorrect password
                            }
                        })
                        .catch((error) => {
                            document.getElementById('already').style.display = 'block';
                        });
                    } else {
                        console.log('Username does not exist');
                        document.getElementById('already').style.display = 'block';
                    }
                });     
            // Handle the case where the username already exists
        } else {
            console.log('Username does not exist');
            document.getElementById('already').style.display = 'block';
        }
    });
    };
    

        
        


            return (
                <div className='login-form'>
                    <div className='already-registered' id='already'>
                        <p>Wrong username or password.</p>
                    </div>

                    <h1>Log in</h1>
                    <br />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <a href="/signup">Dont have an account? Signup here</a>
                </div>
            );
        }


export default Login;
        
   