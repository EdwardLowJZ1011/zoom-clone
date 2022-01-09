import React, {useRef, useEffect} from 'react'

export default function AudioTrack({track}) {
    const trackRef = useRef()

    useEffect(()=>{
        const child = track.attach();
        trackRef.current.classList.add(track.kind);
        trackRef.current.appendChild(child);
    }, [])

    return (
        <div className='track' ref={trackRef}>
            
        </div>
    )
}
