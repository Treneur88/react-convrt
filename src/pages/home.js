import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { v4 as uuidv4 } from 'uuid';
export default function Home() {
    const [image, setImage] = useState('');
    function handleApi(e) {
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
                    window.open("/image/" + name, "_self")
                });


        };



        checkName(namerl);
        const file = document.getElementById('imageUpload').files[0];
        console.log(file);

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
        }
    }
    

    function handleApi(e) {
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
                    window.open("/image/" + name, "_self")
                });


        };



        checkName(namerl);
        const file = document.getElementById('imageUpload').files[0];
        console.log(file);

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

    function handleApi2(e) {
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
                const file1 = document.getElementById('imageUpload2').files[0];
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
        const file = document.getElementById('imageUpload').files[0];
        console.log(file);
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
            <label htmlFor="imageUpload" className="btn btn-primary" id='up'>Upload your Image</label>
            <br></br>
            <br />
            <input type="file" id="imageUpload2" onChange={handleApi2} hidden />
            <label htmlFor="imageUpload2" className="btn btn-primary" id='labelCircle'>Upload Circular images</label>
            <br />
            <br />
            <a className="btn btn-primary" href='/animation'>Upload your Image for animation</a>
            <br />
            <br />
            {localStorage.getItem('username') && (
                <><input type='checkbox' id='checkPublic' className='check' onChange={setter} /><label htmlFor='check' className='labelcheck'>Make it public</label></>
            )}
        </div>



    );
}