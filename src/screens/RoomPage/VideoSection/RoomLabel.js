import React from 'react'

export default function RoomLabel({roomId}) {
    return (
        <div className='room_label'>
            <div className='room_label_paragraph'>ID: {roomId}</div>
        </div>
    )
}
