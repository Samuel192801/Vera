const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('../public'));

io.on('connection', (socket) => {
  console.log('👤 Usuário conectado');

  socket.emit('status', {
    mode: 'local',
    message: 'Vera está pronta.'
  });

  socket.on('userMessage', async (message) => {
    const response = await require('../backend/vera').respondToUser(message.text, message.user, message.key);
    socket.emit('aiResponse', { text: response });
  });
});

module.exports = { app, server };
