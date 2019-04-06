'use strict';
const { RTCVideoSink } = require('wrtc').nonstandard;
const { getUserMedia } = require('wrtc');

function beforeOffer(peerConnection) {
  return getUserMedia({ video: { mandatory: {
    chromeMediaSource: 'desktop',
  }} }).then(source => {
    const track = source.getVideoTracks()[0];
    peerConnection.addTrack(track, source);

    const { close } = peerConnection;
    peerConnection.close = function() {
      track.stop();
      return close.apply(this, arguments);
    };
 });
}

module.exports = { beforeOffer };
