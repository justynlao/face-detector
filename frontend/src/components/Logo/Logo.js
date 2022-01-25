import React from 'react';
import Tilt from 'react-tilt';
import face from './face.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma3 center'>
            <Tilt className="Tilt pa1 br-100 shadow-5" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"><img alt="logo" src={face}/></div>
            </Tilt>
        </div>
    )
}

export default Logo;

