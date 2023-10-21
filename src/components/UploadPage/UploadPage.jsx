import React from "react";
import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";

import './UploadPage.css';


//Material UI dialog box 
import Button from '@mui/material/Button';


import { ViewMyListPageButton, UploadPageButton } from '../RouteButtons/RouteButtons';




function UploadPage() {
    //State variable for file uploads that are not being sent with the form(to separate them out).
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

    //data within the form that will be sent to the server then database. 
    const [uploadFormData, setUploadFormData] = useState({
        files: [], 
        Description: '',
        houseNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        price: Number[''],
        rating: Number[''],
        individualSelection: ''
    });


    //switched from using for loop to promise loop to allow uploads to happen at the same time. 
    const fileChangedHandler = (event) => {
        const selectedFiles = Array.from(event.target.uploadFormData.files); // directly converting FileList to array

        const newPreviewUrlsArray = [];

        // usedPromise.allSettled to ensure all promises either fulfill or reject
        Promise.allSettled(selectedFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result); // Resolve the promise with the reader result
                reader.onerror = reject; // Reject the promise if there's an error
                reader.readAsDataURL(file);
            });
        })).then(results => {
            const newPreviewUrlsArray = results.map(result => result.status === "fulfilled" ? result.value : null);
            uploadFormData.files(selectedFiles);
            setPreviewUrls(newPreviewUrlsArray);
            setCurrentPreviewIndex(0); // Reset the preview index
            setIsFileUploaded(true); // Indicate that files are uploaded
        });
    };

    const goToNextPreview = () => {
        setCurrentPreviewIndex((prevIndex) => (prevIndex + 1) % files.length); // Go to the next preview, loop back to the first after the last
    };

    const goToPreviousPreview = () => {
        setCurrentPreviewIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length); // Go to the previous preview, loop back to the last after the first
    };

    const handleCancelUpload = () => {
        //  cancel the file upload and reset state variables
        uploadFormData.files([]);
        setPreviewUrls([]);
        setIsFileUploaded(false);
        setCurrentPreviewIndex(0); // Reset the preview index
    };



    const handleChangeFor = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('action was dispatched')
        dispatch({
            type: 'SEND_POST_SERVER', payload: files, Description, houseNumber, streetAddress,
            city, state, zipcode, country, price, rating, individualSelection
        });
        setFiles(null);
        setDescription('');
        setHouseNumber('');
        setStreetAddress('');
        setCity('');
        setState('');
        setZipCode('');
        setCountry('');
        setPrice('');
        setRating('');
        setIndividualSelecton('');
    };




    return (
        <div id="uploadpage">

            <ViewMyListPageButton />
            <UploadPageButton />

            <h1> Upload files </h1>
            <div className="mainuploadcontainer">
                <form>
                    <div className="grid-container">
                        <div className="grid-item">
                            <div id="uploadfilecontainer">
                                <div className="upload-container">
                                    {!isFileUploaded && (
                                        <>
                                            <input name="files" type="file" onChange={fileChangedHandler} multiple />
                                        </>
                                    )}
                                    {isFileUploaded && previewUrls.length > 0 && (
                                        <div className="image-preview">
                                            <img src={previewUrls[currentPreviewIndex]} alt="Preview" />
                                            <button className="button-left" onClick={goToPreviousPreview}>Left</button>
                                            <button className="button-right" onClick={goToNextPreview}>Right</button>
                                            {/* <button className="plus-button" onClick={handleChangeFile}>+</button> */}
                                            <button className="cancel-button" onClick={handleCancelUpload}>X</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="grid-item">
                            <div id="uploadformcontainer">
                                <div className="formContainer">

                                    <input
                                        name="Description"
                                        type="text"
                                        style={{ width: '100px', height: '30px' }}
                                        placeholder="Description"
                                        value={uploadFormData.Description}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />
                                    <input
                                        name="houseNumber"
                                        type="number"
                                        style={{ width: '100px', height: '30px' }}
                                        placeholder="House Number"
                                        value={uploadFormData.houseNumber || ''}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />
                                    <input
                                        name="streetAddress"
                                        type="text"
                                        style={{ width: '100px', height: '30px' }}
                                        placeholder="Street Address"
                                        value={uploadFormData.streetAddress || ''}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />
                                    <input
                                        name="city"
                                        type="text"
                                        style={{ width: '100px', height: '30px' }}
                                        placeholder="City"
                                        value={uploadFormData.city || ''}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />
                                    <input
                                        name="state"
                                        type="text"
                                        style={{ width: '100px', height: '30px' }}
                                        placeholder="State"
                                        value={uploadFormData.state || ''}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />
                                    <input
                                        name="Zipcode"
                                        type="number"
                                        style={{ width: '100px', height: '30px' }}
                                        placeholder="Zipcode"
                                        value={uploadFormData.zipcode || ''}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />
                                    <input
                                        name="country"
                                        type="text"
                                        style={{ width: '100px', height: '30px' }}
                                        placeholder="Country"
                                        value={uploadFormData.country || ''}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />

                                    <input
                                        name="price"
                                        type="number"
                                        style={{ width: '100px', height: '30px' }}
                                        placeholder="Price"
                                        value={uploadFormData.price || ''}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />

                                    <input
                                        name="rating"
                                        type="number"
                                        style={{ width: '100px', height: '30px' }}
                                        min={1} max={10}
                                        placeholder="rating: 1-10"
                                        value={uploadFormData.rating || ''}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />
                                    <input
                                        name="individualSelection"
                                        type="text"
                                        style={{ width: '100px', height: '30px' }}
                                        placeholder="Solo or Group"
                                        value={uploadFormData.individualSelection || ''}
                                        onChange={(event) => handleChangeFor(event.target.value)}
                                    />

                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    component={Link}
                                    to={"/UploadSuccessfulPage"}
                                    variant="contained"
                                    color="primary"
                                > Upload </Button>

                            </div>
                        </div>
                    </div>
                </form>



            </div>





        </div>
    );
};

export default UploadPage;

//U4