import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './public.css';
import axios from 'axios';

function Pub() {
    const [list, setList] = useState([]);
    const [showMyImages, setShowMyImages] = useState(false); // Add state to track if "My images" button is clicked

    useEffect(() => {
        sessionStorage.setItem('view', 1); // Set showMyImages to false when the component is mounted
        const loadMoreImages = () => {
            if (sessionStorage.getItem('view') == 1) {
            axios.get('/getNamesPub').then((response) => {

                const listElement = document.getElementById('list');
                const loadCount = 12;
                console.log(response.data[0]?.pub)
                let i = 0; // Initialize 'i' variable
                const lono = response.data.length; // Get the length of response.data array
                const endIndex = Math.min(i + loadCount, lono + 1);
                for (; i < endIndex; i++) {
                    if ((showMyImages && response.data[i]?.user === localStorage.getItem('username') && !document.getElementById(response.data[i].name)) || (response.data[i]?.pub === 1 && !document.getElementById(response.data[i].name))) {
                        // Append item only when response.data.public is equal to 1 and item doesn't exist in the list
                        console.log(response.data[i]);
                        var item = document.createElement('li');
                        item.id = response.data[i].name; // Set the id of the item to the image name
                        var link = document.createElement('a');
                        link.classList.add('link');
                        link.href = '/share/' + response.data[i].name;
                        var img = document.createElement('img');
                        img.src = 'images/' + response.data[i].name;
                        
                        img.className = 'img';
                        var create = document.createElement('p');
                        var diff = Date.now() - response.data[i].date;
                        if (diff > 60000) {
                            diff = diff / 60000;
                            if (diff > 60) {
                                diff = diff / 60;
                                if (diff > 24) {
                                    diff = diff / 24;
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " days ago";
                                } else {
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " hours ago";
                                }
                            } else {
                                if (diff > 1) {
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " minutes ago";
                                } else {
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " minute ago";
                                }
                            }
                        } else {
                            create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff / 60000) + " seconds ago";
                        }

                        create.className = 'create';

                        link.appendChild(img);
                        link.appendChild(create);
                        item.appendChild(link);
                        listElement.appendChild(item);
                    }
                }
            });} else {
                axios.post('/getNames', localStorage.getItem("username")).then((response) => {

                    const listElement = document.getElementById('list');
                    const loadCount = 12;
                    console.log(response.data[0]?.pub)
                    let i = 0; // Initialize 'i' variable
                    const lono = response.data.length; // Get the length of response.data array
                    const endIndex = Math.min(i + loadCount, lono + 1);
                    for (; i < endIndex; i++) {
                        if ((showMyImages && response.data[i]?.user === localStorage.getItem('username') && !document.getElementById(response.data[i].name)) || (response.data[i]?.pub === 1 && !document.getElementById(response.data[i].name))) {
                            // Append item only when response.data.public is equal to 1 and item doesn't exist in the list
                            console.log(response.data[i]);
                            var item = document.createElement('li');
                            item.id = response.data[i].name; // Set the id of the item to the image name
                            var link = document.createElement('a');
                            link.classList.add('link');
                            link.href = '/share/' + response.data[i].name;
                            var img = document.createElement('img');
                            img.src = 'images/' + response.data[i].name;
                            
                            img.className = 'img';
                            var create = document.createElement('p');
                            var diff = Date.now() - response.data[i].date;
                            if (diff > 60000) {
                                diff = diff / 60000;
                                if (diff > 60) {
                                    diff = diff / 60;
                                    if (diff > 24) {
                                        diff = diff / 24;
                                        create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " days ago";
                                    } else {
                                        create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " hours ago";
                                    }
                                } else {
                                    if (diff > 1) {
                                        create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " minutes ago";
                                    } else {
                                        create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " minute ago";
                                    }
                                }
                            } else {
                                create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff / 60000) + " seconds ago";
                            }
    
                            create.className = 'create';
    
                            link.appendChild(img);
                            link.appendChild(create);
                            item.appendChild(link);
                            listElement.appendChild(item);
                        }
                    }
                });

            }
        };

        // Initial load
        loadMoreImages();

        // Load more images when scrolling
        window.addEventListener('scroll', function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadMoreImages();
            }
        });
    }, [showMyImages]); // Add showMyImages as a dependency to useEffect

    const handleMyImagesClick = () => {
        document.getElementById('my-images').style.backgroundColor = 'rgb(0, 149, 194)';
        document.getElementById('pub-images').style.backgroundColor = '#2dccef';
        var items = document.getElementById('list');
        console.log(sessionStorage.getItem('view'))
        if (sessionStorage.getItem('view') == 1) {
            while (items.firstChild) {
                items.removeChild(items.firstChild);
            }
            console.log('cleared')
            axios.get('/getNames/').then((response) => {

                const listElement = document.getElementById('list');
                const loadCount = 12;
                console.log(response.data[0]?.pub)
                let i = 0; // Initialize 'i' variable
                const lono = response.data.length; // Get the length of response.data array
                const endIndex = Math.min(i + loadCount, lono + 1);
                for (; i < endIndex; i++) {
                    if (response.data[i]?.user === localStorage.getItem('username')) {
                        // Append item only when response.data.public is equal to 1 and item doesn't exist in the list
                        console.log(response.data[i]);
                        var item = document.createElement('li');
                        item.id = response.data[i].name; // Set the id of the item to the image name
                        var link = document.createElement('a');
                        link.classList.add('link');
                        link.href = '/share/' + response.data[i].name;
                        var img = document.createElement('img');
                        img.src = 'images/' + response.data[i].name;
                        
                        img.className = 'img';
                        var create = document.createElement('p');
                        var diff = Date.now() - response.data[i].date;
                        if (diff > 60000) {
                            diff = diff / 60000;
                            if (diff > 60) {
                                diff = diff / 60;
                                if (diff > 24) {
                                    diff = diff / 24;
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " days ago";
                                } else {
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " hours ago";
                                }
                            } else {
                                if (diff > 1) {
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " minutes ago";
                                } else {
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " minute ago";
                                }
                            }
                        } else {
                            create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff / 60000) + " seconds ago";
                        }

                        create.className = 'create';

                        link.appendChild(img);
                        link.appendChild(create);
                        item.appendChild(link);
                        if (response.data[i]?.pub === 1) {
                            var privateButton = document.createElement('button');
                            privateButton.classList.add('privateButton');
                            privateButton.innerHTML = 'Make Private';
                            privateButton.addEventListener('click', () => {
                                // Handle making image private
                                console.log('Make private clicked for image: ' + response.data[i].name);
                                axios.post("private", {name: response.data[i].name}).then((response) => {
                                    console.log(response);
                                }).catch((error) => {
                                    console.log(error);
                                })
                                // Add your logic here to make the image private
                            });
                            item.appendChild(privateButton);
                        }

                        listElement.appendChild(item);
                    }
                }
                    

            });

        } else{
            console.log('no')
        }
        sessionStorage.setItem('view', 0) // Set showMyImages to true when "My images" button is clicked
    };

    const handlePubImagesClick = () => {
        document.getElementById('pub-images').style.backgroundColor = 'rgb(0, 149, 194)';
        document.getElementById('my-images').style.backgroundColor = '#2dccef';
        var items = document.getElementById('list');

        if (sessionStorage.getItem('view') == 0) {
            console.log("cleared1")
            while (items.firstChild) {
                items.removeChild(items.firstChild);
            }

            axios.get('/getNamesPub').then((response) => {
                const listElement = document.getElementById('list');
                const loadCount = 12;
                console.log(response.data[0]?.pub)
                let i = 0; // Initialize 'i' variable
                const lono = response.data.length; // Get the length of response.data array
                const endIndex = Math.min(i + loadCount, lono + 1);
                for (; i < endIndex; i++) {
                    if (response.data[i]?.pub === 1 && !document.getElementById(response.data[i].name)) {
                        // Append item only when response.data.public is equal to 1 and item doesn't exist in the list
                        console.log(response.data[i]);
                        var item = document.createElement('li');
                        item.id = response.data[i].name; // Set the id of the item to the image name
                        var link = document.createElement('a');
                        link.classList.add('link');
                        link.href = '/share/' + response.data[i].name;
                        var img = document.createElement('img');
                        img.src = 'images/' + response.data[i].name;
                        
                        img.className = 'img';
                        var create = document.createElement('p');
                        var diff = Date.now() - response.data[i].date;
                        if (diff > 60000) {
                            diff = diff / 60000;
                            if (diff > 60) {
                                diff = diff / 60;
                                if (diff > 24) {
                                    diff = diff / 24;
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " days ago";
                                } else {
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " hours ago";
                                }
                            } else {
                                if (diff > 1) {
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " minutes ago";
                                } else {
                                    create.innerHTML = "by " + response.data[i].user + " | " + Math.floor(diff) + " minute ago";
                                }
                            }
                        } else {
                            create.innerHTML = "by " + response.data[i].user + " | "
                        }
                        create.className = 'create';

                        link.appendChild(img);
                        link.appendChild(create);
                        item.appendChild(link);
                        listElement.appendChild(item);
                    }

            }});


            
        }
        setShowMyImages(false);
        sessionStorage.setItem('view', 1) // Set showMyImages to false when "Public images" button is clicked
    };

    return (
        <div className='pub'>
            <br />
            <div className='menu'>
                <button className='pubbut menbut' id='pub-images' onClick={handlePubImagesClick}>Public images</button>
                <button className='mybut menbut' id='my-images' onClick={handleMyImagesClick}>My images</button>
            </div>
            <div className='viewer' >
                <ul id='list' className='list'>

                </ul>
            </div>
        </div>
    );
}

export default Pub;