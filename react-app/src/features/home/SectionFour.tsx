import React, { useCallback, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import './sectionFour.css';

export default function SectionFour() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [
        '/assets/section4-1.jpg',
        '/assets/section4-2.jpg',
        '/assets/section4-3.jpg',
        '/assets/section4-4.jpg',
    ];

    const openImageViewer = useCallback((index: number) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };
    return (
        <>
            <div className='sectionFour'>
                <h1>OUR GALLERY</h1>
                <hr />
                <div className='imagesFour'>
                    {images.map((src, index) => (
                        <img
                            src={src}
                            onClick={() => openImageViewer(index)}
                            width="250"
                            key={index}
                            style={{ margin: '2px' }}
                            alt=""
                        />
                    ))}

                    {isViewerOpen && (
                        <ImageViewer
                            src={images}
                            currentIndex={currentImage}
                            disableScroll={true}
                            closeOnClickOutside={true}
                            onClose={closeImageViewer}
                        />
                    )}
                </div>
            </div>
        </>
    )
}


