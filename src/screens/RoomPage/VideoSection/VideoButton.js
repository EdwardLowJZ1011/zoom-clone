import React from "react";
import { connect } from "react-redux";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";

function VideoButton(props) {
  const { room, connectionOnlyWithAudio } = props;
  return (
    <div className="video_buttons_container">
      <MicButton room={room} />
      {!connectionOnlyWithAudio && <CameraButton room={room} />}
      <LeaveRoomButton room={room} />
      <SwitchToScreenSharingButton room={room} />
    </div>
  );
}

const mapStoreStateProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateProps)(VideoButton);
