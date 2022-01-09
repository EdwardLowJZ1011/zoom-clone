import React, { useState } from "react";

import CameraButtonImg from "../../../assets/images/camera.svg";
import CameraOffButtonImg from "../../../assets/images/cameraOff.svg";

export default function CameraButton({ room }) {
  const [CameraOn, setCameraOn] = useState(false);
  const handleCameraButton = () => {
    CameraOn ? on() : off();
    setCameraOn(!CameraOn);
  };

  const on = () => {

    room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {

      localVideoTrackPublication.track.enable();
    });
  };

  const off = () => {

    room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {
      localVideoTrackPublication.track.disable();
    });
  };

  return (
    <div className="video_button_container">
      <img
        src={CameraOn ? CameraButtonImg : CameraOffButtonImg}
        onClick={handleCameraButton}
        className="video_button_image"
      />
    </div>
  );
}
