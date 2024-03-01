import React, { useState, useEffect } from 'react';

function ImageDisplay() {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await fetch('/image.php'); // Assuming the PHP file is served from the same domain
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        fetchImage();

        return () => {
            // Clean up
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, []);

    return (
        <div>
            {imageSrc && <img src={imageSrc} alt="Image" />}
        </div>
    );
}

export default ImageDisplay;
