import React from "react";

export default function RoomNotFoundMsg({showRoomNotFound}) {
  return (
    <div className="room_not_found_container">
      {showRoomNotFound && (
        <p className="room_not_found_paragraph">
          Room has not been found, Please try again.
        </p>
      )}
    </div>
  );
}
