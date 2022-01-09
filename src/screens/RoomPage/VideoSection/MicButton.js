import React, { useState } from "react";

import MicButtonImg from "../../../assets/images/mic.svg";
import MicOffButtonImg from "../../../assets/images/micOff.svg";
export default function MicButton({room}) {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const handleMicButton = () => {
    isMicMuted ? unmuted() : mute();
    setIsMicMuted(!isMicMuted);
  };

  const mute = () => {
    room.localParticipant.audioTracks.forEach((localAudioTrackPublication) => {
      localAudioTrackPublication.track.disable();
    });
  };

  const unmuted = () => {
    room.localParticipant.audioTracks.forEach((localAudioTrackPublication) => {
      localAudioTrackPublication.track.enable();
    });
  };

  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? MicOffButtonImg : MicButtonImg}
        onClick={handleMicButton}
        className="video_button_image"
      />
    </div>
  );
}
