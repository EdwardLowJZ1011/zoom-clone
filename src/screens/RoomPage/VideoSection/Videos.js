import React, { useEffect } from "react";
import { connect } from "react-redux";
import { connectToRoom } from "../../../utils/twilioUtils";
import RoomLabel from "./RoomLabel";
import TwilioRoom from "./TwilioRoom";

function Videos({ room, setRoom, roomId, twilioAccessToken }) {
  useEffect(() => {
    if (twilioAccessToken) {
      connectToRoom(twilioAccessToken, roomId, setRoom);
    }
  }, [twilioAccessToken]);
  return (
    <div className="videos_container">
      <RoomLabel roomId={roomId} />
      {room && <TwilioRoom room={room} />}
    </div>
  );
}

const mapStoreStateProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateProps)(Videos);
