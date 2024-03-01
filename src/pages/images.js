import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './imager.css'
export default function Images() {
    const name = window.location.pathname.split("/")[2];
    const address = sessionStorage.getItem('address');

    useEffect(() => {
        document.getElementById("aad").src = "https://back-1-7wvo.onrender.com/images/" + name;
        document.getElementById("imageL").innerHTML = "https://test-picto.onrender.com/share/" + name;
        document.getElementById("DirectL").innerHTML = "https://test-picto.onrender.com/images/" + name;
        document.getElementById("HTMLL").innerText = `<img src="https://test-picto.onrender.com/images/${name}" alt="image">`;
        document.getElementById("BBL").innerText = `[img]https://test-picto.onrender.com/images/${name})[/img]`;
        console.log(name);
    }, [name]);

    return(
        <div className='imager'>
            <div className='contains'>
                <img src='/logo.png' alt='logo' className='logo1'/>
                <p className='titleL'>Image Link</p>
                <p id='imageL' className='like'></p>
                <p className='titleL'>Direct Link</p>
                <p id='DirectL' className='like'></p>
                <p className='titleL'>HTML</p>
                <p id='HTMLL' className='like'></p>
                <p className='titleL'>BBCode</p>
                <p id='BBL' className='like'></p>
            </div>
            <img id="aad" alt="image" />
        </div>
    );
}