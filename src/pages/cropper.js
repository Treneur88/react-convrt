import './homes.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';


export default function Home() {
    var name = "file";
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const checkbox = document.getElementById('checkbox');
        const isChecked = checkbox.checked;
        if (isChecked == false) {
            const formData = new FormData();
            const file = document.getElementById('file').files[0];
            name = file.name;
            const address = "file-" + Date.now() + ".jpg";

            formData.append('file', file);

            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const maxSize = Math.min(img.width, img.height);
                    const size = 200; // Set the desired size of the circle

                    canvas.width = size;
                    canvas.height = size;

                    context.beginPath();
                    context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
                    context.clip();

                    const x = (size - maxSize) / 2;
                    const y = (size - maxSize) / 2;
                    context.drawImage(img, x, y, maxSize, maxSize, 0, 0, size, size);

                    canvas.toBlob(function (blob) {
                        formData.append('croppedFile', blob, 'cropped.jpg');

                        const postlink = 'http://localhost:8800/upload/' + address;

                        axios.post(postlink, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                            .then(response => {
                                console.log(response);
                                document.getElementById('popup').style.display = 'block';

                                document.getElementById('image-url').href = `http://localhost:8800/uploads/${address}`;
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }, 'image/jpeg');
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } else if (isChecked == true) {
            // Same logic as above for cropping the image
            // ...
        }
    };

    const handleButtonClick = () => {
                handleImageChange();
            };

            return (
                <div className="home">
                    <br />
                    <h1>Upload an image to share</h1>
                    <br/>
                    <div>
                        <input type="file" accept="image/*" id='file'/>
                        <br />
                    <div>
                        <br />
                        <input type="checkbox" id="checkbox" />
                        <label htmlFor="checkbox"> Make public</label>
                    </div>
                        <br />
                        <button className='upload-but' onClick={handleButtonClick}>Upload Image</button>
                    </div>
                    {image && <img src={image} alt="Uploaded Image" />}
                    <br />

                    <div className='popup' id='popup'>
                        <h2>Image Upload Successful</h2>
                        <a id='image-url'>your image link</a>
                    </div>
                </div>
            );
        }
        
       