import React, { useEffect } from 'react';
import logo from '../assets/images/zoom-logo.png';
import { ConnectingButtons } from './ConnectingButton/ConnectingButton';
import { connect } from 'react-redux';
import './HomePage.css';
import { setIsRoomHost } from '../app/actions';

export function HomePage({setIsRoomHostAction}) {
    
    useEffect(()=>{
        setIsRoomHostAction(false);
    }, []);

    return (
        <div className='introduction_page_container'>
            <div className='introduction_page_panel'>
                <img src={logo} className='introduction_page_image' />
                <ConnectingButtons />
            </div>
        </div>
    )
} 

const mapDispatchToProps = (dispatch) =>{
    return {
        setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    }
}

export default connect(null, mapDispatchToProps)(HomePage);