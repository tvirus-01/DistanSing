import React from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import {withRouter} from 'react-router-dom'
import LiveChatContainer from './live_chat_container';

class UserStreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // playing: false,
      video: ''
    };
    // Local variables
    this.socket = io();
    
    // Bound functions
    this.startPlaying = this.startPlaying.bind(this);
    this.recStream = this.recStream.bind(this);
    this.startPlaying();
  }

  componentWillUnmount() {
    if (this.peer) {
      this.peer.disconnect()
      this.peer.destroy()
    }
    this.socket.close()
  }

  recStream(stream, elementId) {
    const video = document.getElementById(elementId);
    video.srcObject = stream;
    window.peerStream = stream;
  }

  startPlaying() {
    const peer = new Peer()
    this.peer = peer

    peer.on("open", () => {
      this.socket.emit("userId", peer.id);
    })

    peer.on("connection", connection => {
      peer.connect(connection.peer);
      connection.on("data", data => {
        console.log(data);
      })
    })
    
    peer.on("call", call => {
      call.answer();
      call.on("stream", stream => {
        this.recStream(stream, "rVideo")
      })
    })

    peer.on("error", err => {
      alert(`An error has occurred: ${err}`);
      console.log(err);
    })
  }

  render() {
    const {event, artist} = this.props

    const DescriptionBlock = event.description ? (
      <div className="stream-description">{event.description}</div>
    ) : null

    return(
      <div className="stream-container">
        <div className="stream-title">
          <div>
            Welcome to {event.name}!
          </div>
          <div>
            Presented by {artist.artistname}
          </div>
        </div>
        <div className="stream-content">
          <div className="stream-video-player">
            <video id="rVideo" controls autoPlay={true} muted></video>
          </div>
          <div>
            <LiveChatContainer socket={this.socket} />
          </div>
        </div>
        {DescriptionBlock}
        <div className="technical-difficulties">
          <div>
            Stream not showing? Try refreshing or
          </div>
          <button id="get-outta-here" onClick={() => this.props.history.push(`/artists/${event.artist}`)}>
            Head back to {artist.artistname}'s profile
          </button>
        </div>
      </div>)
  }
}

export default withRouter(UserStreamShow);