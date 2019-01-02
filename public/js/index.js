    var socket = io();

    socket.on('connect',()=>{
        console.log('connected ..... client');

        socket.emit('createMessage',{
            from:'client@example.com',
            text:'Hey! this is from client..'            
        })
    })

    socket.on('disconnect',()=>{
        console.log('disconnected ..... client')
    })
    
    socket.on('newMessage',(msg)=>{
        console.log(msg)
    })
    


