const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users.js');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('connection established from server....');


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name or Room required..');
        }
        socket.join(params.room);
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', `welcome! ${params.name} to the ${params.room} chat Room`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));
        callback()
    })


    socket.on('createMessage', (msg, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(msg.text)) {
            console.log('23456#@$#$#@#$#@$#@$#@$#@#$@$#@#$@');
            io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
        }
        callback();
    });


    socket.on('createLocationMesssage', (msg) => {
        var user = users.getUser(socket.id);
        if(user){
            // console.log('locationaofsiafsob23456#@$#$#@#$#@$#@$#@$#@#$@$#@#$@',user.name);
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, msg.latitude, msg.longitude));
        }
    })

    socket.on('disconnect', () => {
        console.log('Disconnected ..... server');

        var user = users.removeUser(socket.id);
        // console.log('removed user ', user)
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat room`));
        }
    });
})


server.listen(port, () => {
    console.log(`server started up on port no ${3000}`);
});