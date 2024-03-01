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



    function circler(file, callback) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = URL.createObjectURL(file);
        function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }

        img.onload = function () {
            const size = Math.min(img.width, img.height);
            canvas.width = size;
            canvas.height = size;
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, 0, 0, size, size);
            const circularImage = canvas.toDataURL('image/jpg');
            const blob = dataURItoBlob(circularImage);
            const circularFile = new File([blob], file.name, { type: 'image/jpg' });
            callback(circularFile);
        };
    }

    function handleImageUpload2(e) {
        if (localStorage.getItem('username') === '' || localStorage.getItem('username') === null) {
            document.getElementById("labelCircle").innerHTML = "Uploading..."
            // Username "localhost" exists
            console.log('not logged in')
            function naming() {
                var name = uuidv4();
                return name.slice(0, 10);

            }

            var namerl = naming();
            const checkName = async (name) => {
                name = name + ".jpg";
                console.log(namerl)

                const response = await fetch('https://back-1-7wvo.onrender.com/checkName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.exists) {
                    console.log('The name exists in the database.');
                } else {
                    const file1 = document.getElementById('imageUpload21').files[0];
                    document.getElementById("labelCircle").innerHTML = "Uploading..."
                    circler(file1, function (circularFile) {
                        const form = new FormData();
                        console.log(circularFile)
                        const croppedFile = circularFile;
                        const croppedFileName = croppedFile.name;
                        const croppedFileUrl = URL.createObjectURL(croppedFile);

                        if (circularFile != undefined) {
                            console.log(circularFile.name)
                            form.append('file', circularFile);
                            const data = new FormData();
                            data.append('file', croppedFile);
                            data.append('name', namerl + ".jpg");
                            var name = { name: namerl + ".jpg", user: "not-signed", public1: false, date: Date.now() };
                            axios.post('https://back-1-7wvo.onrender.com/logImage/', name).then((response) => {
                                console.log("Public name added to the database.")
                            });

                            axios.post('https://back-1-7wvo.onrender.com/uploads/', data)
                                .then((response) => {
                                    console.log(response);
                                    window.open("/image/" + namerl + ".jpg", "_self")
                                });
                        } else {
                            console.log('No file');
                        }
                    });
                }
            }
            checkName(namerl);
            const file = document.getElementById('imageUpload').files[0];
            console.log(file);
        } else {
           

            function naming() {
                var name = uuidv4();
                return name.slice(0, 10);

            }

            var namerl = naming();
            const checkName = async (name) => {
                name = name + ".jpg";
                console.log(namerl)

                const response = await fetch('https://back-1-7wvo.onrender.com/checkName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.exists) {
                    console.log('The name exists in the database.');
                } else {
                    const file1 = document.getElementById('imageUpload21').files[0];
                    document.getElementById("labelCircle").innerHTML = "Uploading..."
                    circler(file1, function (circularFile) {
                        const form = new FormData();
                        console.log(circularFile)
                        const croppedFile = circularFile;
                        const croppedFileName = croppedFile.name;
                        const croppedFileUrl = URL.createObjectURL(croppedFile);

                        if (circularFile != undefined) {
                            console.log(circularFile.name)
                            form.append('file', circularFile);
                            const data = new FormData();
                            data.append('file', croppedFile);
                            data.append('name', namerl + ".jpg");
                            if (localStorage.getItem('public') == 'true') {
                                var name = { name: namerl + ".jpg", user: localStorage.getItem('username'), public1: true, date: Date.now() };
                                axios.post('https://back-1-7wvo.onrender.com/logImage/', name).then((response) => {
                                    console.log("Public name added to the database.")
                                });

                            } else {
                                var name = { name: namerl + ".jpg", user: localStorage.getItem('username'), public1: false, date: Date.now() };
                                axios.post('https://back-1-7wvo.onrender.com/logImage/', name).then((response) => {
                                    console.log("Public name added to the database.")
                                });
                            }

                            axios.post('https://back-1-7wvo.onrender.com/uploads/', data)
                                .then((response) => {
                                    console.log(response);
                                    window.open("/image/" + namerl + ".jpg", "_self")
                                });
                        } else {
                            console.log('No file');
                        }
                    });
                }
            }
            checkName(namerl);
            const file = document.getElementById('imageUpload21').files[0];
            console.log(file);
        }


    }

    return (
        <div className='homer' >
            <h2>Try Profile Pictures effects!</h2>
            <p>Select hex codes and make animated images, or upload circular images</p>
            <div className='d-a'>
                <div className='containeer1'>
                    <div className='d-a1'>
                        
                        <div className="color">
                            <input type="color" id="colorPicker" className='picker' value="#FF0000" />
                            <input type="color" id="colorPicker2" className='picker' value="#0000FF"/>
                        </div>
                        <img src='user.png' alt='user' className='userf cd' id='anuse'/>
                    </div>

                    <div className='preview'>


                        <div className='profile'>

                            <input type="file" id="imageUpload2" accept="image/*" hidden onChange={upload} />
                            <label htmlFor="imageUpload2" id="labelCircle">Upload your Image</label>
                            <br />

                        </div>
                    </div>

                </div>
                <br />
                <br />
                <div className='circd'>
                    <img src='user.png' alt='user' className='userf cr' />
                    <input type="file" id="imageUpload21" accept="image/*" hidden onChange={handleImageUpload2} />
                    <label htmlFor="imageUpload21" id="labelCircle">Upload your Image</label>
                </div>
            </div>
        </div>
    );
}