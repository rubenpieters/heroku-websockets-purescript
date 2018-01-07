"use strict";

const express = require('express');
const SocketServer = require('uws').Server;
const path = require('path');

// '{ server }' syntax doesn't seem to compile
// neither does '(a) => ...' syntax

exports.startServer=function() {
  const PORT = process.env.PORT || 3000;
  const INDEX = path.join(__dirname, 'dist', 'index.html');
  console.log('INDEX path: ' + INDEX);

  const server = express()
    .use(function(req, res) { res.sendFile(INDEX)})
    .listen(PORT, function() { console.log('Listening on ' + PORT) });

  const wss = new SocketServer({ server: server });

  wss.on('connection', function(ws) {
    console.log('Client connected');
    ws.on('close', function() { console.log('Client disconnected') });
  });

  setInterval(function() {
    wss.clients.forEach(function(client) {
      client.send(new Date().toTimeString());
    });
  }, 1000);
};
