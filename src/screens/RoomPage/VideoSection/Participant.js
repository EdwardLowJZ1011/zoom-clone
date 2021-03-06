import React, { Component } from "react";
import VideoTrack from "./VideoTrack";
import AudioTrack from "./AudioTrack";
import { addMessageToMessager } from "../../../utils/twilioUtils";

export class Participant extends Component {
  constructor(props) {
    super(props);

    const existingPublications = Array.from(
      this.props.participant.tracks.values()
    );

    const existingTracks = existingPublications.map(
      (publication) => publication.track
    );

    const nonNullTracks = existingTracks.filter((track) => track !== null);
    this.state = {
      tracks: nonNullTracks,
    };
  }
  componentDidMount() {
    if (!this.props.localParticipant) {
      this.props.participant.on("trackSubscribed", (track) => {
        if (track.kind === "data") {
          track.on("message", (data) => {
            addMessageToMessager(JSON.parse(data));
          });
        } else {
          this.addTrack(track);
        }
      });
      this.props.participant.on("trackUnpublised", (track) => {
        this.removeTrack(track);
      });
    }
  }

  addTrack(track) {
    if (track) {
      this.setState({
        tracks: [...this.state.tracks, track],
      });
    }
  }

  removeTrack(track) {
    if (track) {
      const newTracks = this.state.tracks.filter(
        (t) => t.name != track.trackName
      );
      this.setState({
        tracks: newTracks,
      });
    }
  }

  render() {
    return (
      <div className="participant" id={this.props.participant.identity}>
        {this.state.tracks.map((track) => {
          if (track.kind === "audio") {
            return <AudioTrack key={track} track={track} />;
          }
          if (track.kind === "video") {
            return <VideoTrack key={track} track={track} />;
          }
        })}
      </div>
    );
  }
}
