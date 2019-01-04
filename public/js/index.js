var socket = io();

socket.on('connect', () => {
    console.log('connected ..... client');
})


socket.on('disconnect', () => {
    console.log('disconnected ..... client')
})

socket.on('newMessage', (msg) => {
    console.log('From the updated serever .........', msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}:${msg.text}`);
    jQuery('ol').append(li);
})

socket.on('newLocationMessage',(msg)=>{
    var li = jQuery('<li></li>');
    var a = jQuery('<a target=_blank>Access my location</a>');
    a.attr('href',msg.url);
    li.text(`${msg.from}:`);
    li.append(a);
    jQuery('ol').append(li);
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






