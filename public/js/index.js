var socket = io();
socket.on('connect' ,function(){
    console.log('Connected To server');

    // socket.emit('createMessage', {
    //     from : "saeed",
    //     text : "Hy baby"
    // })
})
socket.on('disconnect', function() {
    console.log('Disconncted From server');
})
socket.on('newMessage', function(message) {
    console.log('New MEssage', message)

    var li = jQuery('<li></li>')
    li.text(`${message.from} : ${message.text}`)
    jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from : 'User',
        text : jQuery('[name=message]').val()
    })
})