import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "./homes.css";
export default function Home() {
    const [image, setImage] = useState('');
    function handleApi(e) {
        if (localStorage.getItem('username') == null || localStorage.getItem('username') == '') {
            console.log('not logged in')
            function naming() {
                var name = uuidv4();
                return name.slice(0, 10);

            }
            document.getElementById("up").innerHTML = "Uploading..."

            var namerl = naming();
            const checkName = async (name) => {
                name = name + ".jpg";




                console.log('The name does not exist in the database.');
                const file = document.getElementById('imageUpload').files[0];
                console.log(file);
                const data = new FormData();
                data.append('file', file);
                data.append('name', name);
                var date = Date.now();


                var namer = { name: name, user: "not-signed", public1: false, date: Date.now() };
                axios.post('https://back-1-7wvo.onrender.com/logImage/', namer).then((response) => {
                    console.log("Public name added to the database.")
                });


                axios.post('https://back-1-7wvo.onrender.com/uploads/', data)
                    .then((response) => {
                        console.log(response);
                        console.log(name)
                        window.open("/share/" + name, "_self")
                    });
            }
        } else {
            if (document.getElementById('checkPublic').checked) {
                console.log('checked')
                localStorage.setItem('public', 'true');
            }
            else {
                console.log('not checked')
                localStorage.setItem('public', 'false');
            }

            function naming() {
                var name = uuidv4();
                return name.slice(0, 10);

            }
            document.getElementById("up").innerHTML = "Uploading..."

            var namerl = naming();
            const checkName = async (name) => {
                name = name + ".jpg";




                console.log('The name does not exist in the database.');
                const file = document.getElementById('imageUpload').files[0];
                console.log(file);
                const data = new FormData();
                data.append('file', file);
                data.append('name', name);
                var date = Date.now();

                if (localStorage.getItem('public') == 'true') {
                    var namer = { name: name, user: localStorage.getItem('username'), public1: true, date: Date.now() };
                    axios.post('https://back-1-7wvo.onrender.com/logImage/', namer).then((response) => {
                        console.log("Public name added to the database.")
                    });

                } else {
                    var namer = { name: name, user: localStorage.getItem('username'), public1: false, date: Date.now() };
                    axios.post('https://back-1-7wvo.onrender.com/logImage/', namer).then((response) => {
                        console.log("Public name added to the database.")
                    });
                }

                axios.post('https://back-1-7wvo.onrender.com/uploads/', data)
                    .then((response) => {
                        console.log(response);
                        console.log(name)
                        window.open("/share/" + name, "_self")
                    });


            };



            checkName(namerl);
            const file = document.getElementById('imageUpload').files[0];
            console.log(file);
        }

    }

    

    function handleApi(e) {
        if (localStorage.getItem('username') === '' || localStorage.getItem('username') === null) {
            // Username "localhost" exists

            function naming() {
                var name = uuidv4();
                return name.slice(0, 10);

            }
            document.getElementById("up").innerHTML = "Uploading..."

            var namerl = naming();
            const checkName = async (name) => {
                name = name + ".jpg";
                console.log('The name does not exist in the database.');
                const file = document.getElementById('imageUpload').files[0];
                console.log(file);
                const data = new FormData();
                data.append('file', file);
                data.append('name', name);
                var date = Date.now();


                var namer = { name: name, user: "not-signed", public1: false, date: Date.now() };
                axios.post('https://back-1-7wvo.onrender.com/logImage/', namer).then((response) => {
                    console.log("Public name added to the database.")
                });


                axios.post('https://back-1-7wvo.onrender.com/uploads/', data)
                    .then((response) => {
                        console.log(response);
                        console.log(name)
                        window.open("/share/" + name, "_self")
                    });
            }

            checkName(namerl);
            const file = document.getElementById('imageUpload').files[0];
            console.log(file);
        }
        else {
            if (document.getElementById('checkPublic').checked) {
                console.log('checked')
                localStorage.setItem('public', 'true');
            }
            else {
                console.log('not checked')
                localStorage.setItem('public', 'false');
            }

            function naming() {
                var name = uuidv4();
                return name.slice(0, 10);

            }
            document.getElementById("up").innerHTML = "Uploading..."

            var namerl = naming();
            const checkName = async (name) => {
                name = name + ".jpg";




                console.log('The name does not exist in the database.');
                const file = document.getElementById('imageUpload').files[0];
                console.log(file);
                const data = new FormData();
                data.append('file', file);
                data.append('name', name);
                var date = Date.now();

                if (localStorage.getItem('public') == 'true') {
                    var namer = { name: name, user: localStorage.getItem('username'), public1: true, date: Date.now() };
                    axios.post('https://back-1-7wvo.onrender.com/logImage/', namer).then((response) => {
                        console.log("Public name added to the database.")
                    });

                } else {
                    var namer = { name: name, user: localStorage.getItem('username'), public1: false, date: Date.now() };
                    axios.post('https://back-1-7wvo.onrender.com/logImage/', namer).then((response) => {
                        console.log("Public name added to the database.")
                    });
                }

                axios.post('https://back-1-7wvo.onrender.com/uploads/', data)
                    .then((response) => {
                        console.log(response);
                        console.log(name)
                        window.open("/share/" + name, "_self")
                    });


            };



            checkName(namerl);
            const file = document.getElementById('imageUpload').files[0];
            console.log(file);
        }

    }

    

    function setter() {
        if (document.getElementById('checkPublic').checked) {
            console.log('checked')
            localStorage.setItem('public', 'true');
        }
        else {
            console.log('not checked')
            localStorage.setItem('public', 'false');
        }
    }





    return (
        <div className='homer' >
            <h2>Upload and share your images <u>effortlessly</u></h2>
            <p>Simply drag and drop your images to begin uploading.</p>
            <input type="file" id="imageUpload" onChange={handleApi} hidden />
            <label htmlFor="imageUpload" className="upload-main" id='up'>Upload your Image</label>
            <br />
            <br />
            {localStorage.getItem('username') && (
                <><input type='checkbox' id='checkPublic' className='check' onChange={setter} /><label htmlFor='check' className='labelcheck'>Make it public</label></>
            )}
            <br />
            <div className='show-ex'>
                <p8 className='ex1'>Try profile picture effects!</p8>
                <br />
                <p8 className='ex'>Drag and drop your image and select which effect you had like to use</p8>
                <br />
                <div className='ex3'>
                <a href="/animation" ><img src='user.png' className='ex2 ef1'></img></a><FaArrowLeft style={{color: "white"}}/><a href="/animation" ><img src='user.png' className='ex2'></img></a><FaArrowRight style={{color: "white"}}/><a href="/animation" ><img src='user.png' className='ex2 ef2'></img></a>
                <br />
                <br />
                <a className='ex-a' href='/animation'>Try now!</a>
                </div>
            </div>
            <br />
            <br />
            
        </div>



    );
}