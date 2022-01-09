import React from 'react'
import CheckImage from '../../assets/images/check.png'

export default function OnlyWithAudioCheckbox(props) {

    const {connectionOnlyWithAudio, setConnectionOnlyWithAudioAction} = props

    const handleConnectionTypeChange = () =>{
        setConnectionOnlyWithAudioAction(!connectionOnlyWithAudio);
    }


    return (
        <div className='checkbox_container'>
            <div className='checkbox_connection' onClick={handleConnectionTypeChange}>
                {console.log(connectionOnlyWithAudio)}
                {connectionOnlyWithAudio && (
                    <img className='checkbox_image' src={CheckImage} />
                )}
            </div>
            <p className='checkbox_container_paragraph'>Only Audio</p>
        </div>
    )
}
