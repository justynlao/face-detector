import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
    return (
        <div>
            <div className='center'>
                <div className='pa3 br3 shadow-5 form center'>
                    <input className='f4 pa2 w-70 center' type='text' placeholder='Enter an image url' onChange={onInputChange}/>
                    <button 
                        className='w-30 f4 b link:hover dib white bg-light-purple'
                        onClick={onImageSubmit}>
                            Detect
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default ImageLinkForm
