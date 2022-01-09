import React, { useState } from "react";
import { LocalVideoTrack } from "twilio-video";

import sharingButton from "../../../assets/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";

export default function SwitchToScreenSharingButton({ room }) {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharing, setScreenSharing] = useState(null);

  const [screenShareStream, setScreenShareStream] = useState(null);

  const handleScreenSharingEnabling = () => {
    if (!isScreenSharingActive) {
      navigator.mediaDevices
        .getDisplayMedia()
        .then((stream) => {
          setScreenShareStream(stream);
          setIsScreenSharingActive(true);
          const screenTrack = new LocalVideoTrack(stream.getVideoTracks()[0], {
            name: "screen-share-track",
          });
          room.localParticipant.publishTrack(screenTrack);
          setScreenSharing(screenTrack);

          stream.getVideoTracks()[0].onended = () => {
            room.localParticipant.unpublishTrack(screenTrack);
            setScreenSharing(null);
            setIsScreenSharingActive(false);
          };
        })
        .catch((err) => {
          console.error("could not get an accesss to share screen", err);
        });
    } else {
      screenSharing.stop();
      room.localParticipant.unpublishTrack(screenSharing);
      setScreenSharing(null);
      setIsScreenSharingActive(false);
    }
  };
  return (
    <>
      <div className="video_button_container">
        <img
          src={sharingButton}
          onClick={handleScreenSharingEnabling}
          className="video_button_image"
        />
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenShareStream} />
      )}
    </>
  );
}
