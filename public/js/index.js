var socket = io();
socket.on('connect' ,function(){
    console.log('Connected To server');

    socket.emit('createMessage', {
        from : "saeed",
        text : "Hy baby"
    })
})
socket.on('disconnect', function() {
    console.log('Disconncted From server');
})
socket.on('newMessage', function(message) {
    console.log('New MEssage', message)
})