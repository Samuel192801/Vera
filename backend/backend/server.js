const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('../public'));

io.on('connection', (socket) => {
  console.log('👤 Usuário conectado');
  socket.emit('message', '🧠 Vera: Estou pronta.');

  socket.on('userMessage', (message) => {
    socket.emit('aiResponse', {
      text: `🧠 Vera: Você disse "${message.text}"`
    });
  });
});

server.listen(3000, () => {
  console.log('🧠 Servidor iniciado.');
});

module.exports = { app, server };
