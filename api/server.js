const express = require('express');
const app = express();
const PORT = 4000;
const server = require('http').Server(app);
const cors = require('cors');
app.use(cors())

let onlineUsers = []

const socketIO = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);
    
    socket.on('newUser', (data) => {
      onlineUsers.push(data)
      socketIO.emit('newUserResponse', onlineUsers)
    })
    
    socket.on('message', (data)=> {
      socketIO.emit('messageResponse', data)
    })
    
    socket.on('typing', (data) => {
      socket.broadcast.emit('typingResponse', data)
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      onlineUsers = onlineUsers.filter(user => user.socketID != socket.id)
      socketIO.emit('newUserResponse', onlineUsers)
      socket.disconnect()

    });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

