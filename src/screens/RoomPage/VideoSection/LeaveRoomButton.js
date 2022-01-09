import React from 'react'

export default function LeaveRoomButton({room}) {
    const disconnect = () =>{
        const siteUrl = window.location.origin;
        room.disconnect();
        window.location.href = siteUrl;
    }
    return (
        <div className="video_button_container">
            <button className='video_button_end' onClick={disconnect}>End Meeting</button>
        </div>
    )
}
