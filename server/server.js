const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname , '..' , 'public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('connection established from server....');    
    
    
    socket.emit('newMessage',{
        from:'Admin',
        text:'welcome! to the chat Room'
    })

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'new user joined'
    })

    socket.on('createMessage',(msg)=>{
        // console.log(msg)
        io.emit('newMessage',{
            from:msg.from,
            text:msg.text,
            createAt: new Date( )
        });

    })


    socket.on('disconnect',()=>{
        console.log('Disconnected ..... server');
    })  
})



server.listen(port,()=>{
    console.log(`server started up on port no ${3000}`);
});