import React from "react";
import { useNavigate } from "react-router-dom";

function ConnectingButton({
  createRoomButton = false,
  buttonText,
  onClickHandler,
}) {
  const buttonClass = createRoomButton
    ? "create_room_button"
    : "join_room_button";

  return (
    <button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
}

export const ConnectingButtons = () => {
  let navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate("/join-room");
  };

  const pushToHostRoomPage = () => {
    navigate("/join-room?host=true");
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="Join a meeting"
        onClickHandler={pushToJoinRoomPage}
      />
      <ConnectingButton
        buttonText="Host a meeting"
        createRoomButton
        onClickHandler={pushToHostRoomPage}
      />
    </div>
  );
};
