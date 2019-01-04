    var socket = io();

    socket.on('connect',()=>{
        console.log('connected ..... client');
      })
   

    socket.on('disconnect',()=>{
        console.log('disconnected ..... client')
    })
    
    socket.on('newMessage',(msg)=>{
        console.log('From the updated serever .........',msg);
        var li = jQuery('<li></li>');
        li.text(`${msg.from}:${msg.text}`); 
        var ol = jQuery('ol');
        ol.append(li);
    })
    

    jQuery('#message-form').on('submit', function (e){
        e.preventDefault()
        
        socket.emit('createMessage',{
            from : 'user',
            text:jQuery('[name=message]').val()
        }, function (){

        })

    })


