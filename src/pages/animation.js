import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import "./animation.css";
import { v4 as uuidv4 } from 'uuid';
export default function Animation() {
    const [imageSrc, setImageSrc] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImageSrc(reader.result);
        };

        if (file) {
            console.log(localStorage.getItem('public') == true);
            reader.readAsDataURL(file);
            document.getElementById("preview").style.display = "block";
            document.getElementById("labelCircle").style.display = "none";
            document.getElementById("preview-but").style.display = "block";
        }
    };
    function preview() {
        var color1 = document.getElementById('colorPicker').value;
        var color2 = document.getElementById('colorPicker2').value;
        console.log(color1, color2);
        var preview = document.getElementById('preview');
        preview.style.animation = `borderAnimation 2s infinite linear`;

        // CSS animation keyframes
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(`
            @keyframes borderAnimation {
                0% {
                    border-image: linear-gradient(to right, ${color1}, ${color2}) 2;
                }
                50% {
                    border-image: linear-gradient(to right, ${color2}, ${color1}) 2;
                }
                100% {
                    border-image: linear-gradient(to right, ${color1}, ${color2}) 2;
                }
            }
        `, styleSheet.cssRules.length);
    }

    function upload() {
        if (localStorage.getItem('username') == null || localStorage.getItem("username") == '') {
            var color1 = document.getElementById('colorPicker').value;
            var color2 = document.getElementById('colorPicker2').value;
            var image = document.getElementById('imageUpload2').files[0];

            const form = new FormData();
            form.append('file', image);
            form.append('color1', color1);
            form.append('color2', color2);


            function naming() {
                var name = uuidv4();
                return name.slice(0, 10);

            }

            var namerl = naming();


            const checkName = async (name) => {
                console.log(localStorage.getItem('public'));
                var chec = localStorage.getItem('public') === 'true';
                console.log(chec);
                console.log(localStorage.getItem('public') == 'true');

                var name = { name: namerl + ".gif", user: "not-signed", public1: false, date: Date.now() };
                axios.post('https://back-1-7wvo.onrender.com/logImage/', name).then((response) => {
                    console.log("Public name added to the database.")
                });


                console.log('The name does not exist in the database.');
                form.append('name', namerl);
                console.log(form.get('name'));
                axios.post('https://back-1-7wvo.onrender.com/animated/', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        console.log(response);
                        window.open("/image/" + namerl + ".gif", "_self")
                    });

            };
            checkName(namerl);
        } else {
            var color1 = document.getElementById('colorPicker').value;
            var color2 = document.getElementById('colorPicker2').value;
            var image = document.getElementById('imageUpload2').files[0];

            const form = new FormData();
            form.append('file', image);
            form.append('color1', color1);
            form.append('color2', color2);


            function naming() {
                var name = uuidv4();
                return name.slice(0, 10);

            }

            var namerl = naming();


            const checkName = async (name) => {
                console.log(localStorage.getItem('public'));
                var chec = localStorage.getItem('public') === 'true';
                console.log(chec);
                console.log(localStorage.getItem('public') == 'true');
                if (chec) {
                    var name = { name: namerl + ".gif", user: localStorage.getItem('username'), public1: true, date: Date.now() };
                    axios.post('https://back-1-7wvo.onrender.com/logImage/', name).then((response) => {
                        console.log("Public name added to the database.")
                    });

                } else {
                    var name = { name: namerl + ".gif", user: localStorage.getItem('username'), public1: false, date: Date.now() };
                    axios.post('https://back-1-7wvo.onrender.com/logImage/', name).then((response) => {
                        console.log("Public name added to the database.")
                    });
                }





                console.log('The name does not exist in the database.');
                form.append('name', namerl);
                console.log(form.get('name'));
                axios.post('https://back-1-7wvo.onrender.com/animated/', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        console.log(response);
                        window.open("/image/" + namerl + ".gif", "_self")
                    });




            };
            checkName(namerl);
        }
    }

    return (
        <div className='homer' >
            <h2>Try Profile Pictures effects!</h2>
            <div className='container'>
                <div className="color">
                    <h4>Choose color gradients for animation</h4>
                    <input type="color" id="colorPicker" className='picker' />
                    <input type="color" id="colorPicker2" className='picker' />
                </div>
                <div className='preview'>
                    <div className='profile'>
                        <input type="file" id="imageUpload2" accept="image/*" hidden onChange={handleImageUpload} />
                        <label htmlFor="imageUpload2" id="labelCircle">Upload Image</label>
                        <br />
                        <img id='preview' alt='preview' className='preview-img' src={imageSrc}></img>
                        <button className='preview-but' id='preview-but' onClick={preview}>Preview your animation</button>
                    </div>
                </div>

            </div>
            <br />
            <button className='upload' id='upload' onClick={upload}>Upload</button>
        </div>
    );
}