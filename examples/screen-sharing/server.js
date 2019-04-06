'use strict';
const { RTCVideoSink } = require('wrtc').nonstandard;
const { getUserMedia } = require('wrtc');

function beforeOffer(peerConnection) {
  getUserMedia({ video: { mandatory: {
    chromeMediaSource: 'desktop',
 }} }).then(source => {
   const track = source.getVideoTracks()[0];
   const transceiver = peerConnection.addTransceiver(track);
   const sink = new RTCVideoSink(transceiver.receiver.track);
 
  //  let lastFrame = null;
 
  //  function onFrame({ frame }) {
  //    lastFrame = frame;
  //  }
 
  //  sink.addEventListener('frame', onFrame);
   const { close } = peerConnection;
   peerConnection.close = function() {
     clearInterval(interval);
     sink.stop();
     track.stop();
     return close.apply(this, arguments);
   };
 });
}

module.exports = { beforeOffer };
