const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname , '..' , 'public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('connection established from server....');    
    
    
    socket.emit('newMessage',generateMessage('Admin','welcome! to the chat Room'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));

    socket.on('createMessage',(msg,callback)=>{
        io.emit('newMessage',generateMessage(msg.from,msg.text));
        callback();

    });

    socket.on('createLocationMesssage',(msg)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',msg.latitude,msg.longitude));

    })

    socket.on('disconnect',()=>{
        console.log('Disconnected ..... server');
    });  
})


server.listen(port,()=>{
    console.log(`server started up on port no ${3000}`);
});