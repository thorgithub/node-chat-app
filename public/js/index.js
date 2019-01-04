var socket = io();

socket.on('connect', () => {
    console.log('connected ..... client');
})


socket.on('disconnect', () => {
    console.log('disconnected ..... client')
})

socket.on('newMessage', (msg) => {
    var formattedTime  = moment(msg.createdAt).format("h:mm a");
    var template = jQuery('#message-template').html();
    
    var html = Mustache.render(template,{
        from:msg.from,
        text:msg.text,
        createdAt:formattedTime

    })
    jQuery('#messages').append(html);
})

socket.on('newLocationMessage',(msg)=>{
    var formattedTime  = moment(msg.createdAt).format("h:mm a");
    var template = jQuery('#location-template').html();
    var html = Mustache.render(template,{
        from:msg.from,
        createdAt:formattedTime,
        url:msg.url
    })
    
    jQuery('#messages').append(html);
})



jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message]').val()
    },function () {
        jQuery('[name=message]').val('');
    })

})


var sendLocation = jQuery('#send-location');
sendLocation.on('click', function () {
sendLocation.attr('disabled','disabled').text('Sending location...');

if (!navigator.geolocation) {
    sendLocation.text('Send location').removeAttr('disabled')
    return window.alert('Unable to fetch location');
}
navigator.geolocation.getCurrentPosition(function (position){
    sendLocation.text('Send location').removeAttr('disabled')
    socket.emit('createLocationMesssage',{
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
    });
},function(){
    alert('Unable to fetch location try again...');    
})

});






