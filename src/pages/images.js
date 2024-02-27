import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './imager.css'

export default function Images() {
    const name = window.location.pathname.split("/")[2];
    const address = sessionStorage.getItem('address');

    useEffect(() => {
        document.getElementById("aad").src = "https://back-1-7wvo.onrender.com/images/" + name;
        document.getElementById("imageL").innerHTML = "/image/" + name;
        document.getElementById("DirectL").innerHTML = "https://back-1-7wvo.onrender.com/images/" + name;
        document.getElementById("HTMLL").innerText = `<img src="https://back-1-7wvo.onrender.com/images/${name}" alt="image">`;
        console.log(name);
    }, [name]);

    return(
        <div className='imager'>
            <div className='contains'>
                <img src='/logo.png' alt='logo' className='logo1'/>
                <p id='imageL'></p>
                <p id='DirectL'></p>
                <p id='HTMLL'></p>
            </div>
            <img id="aad" alt="image" />
        </div>
    );
}