const path =  require("path");
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');



const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server)

io.on('connection', (socket) => {
    console.log('New User Connection!');

    socket.emit('newMessage', {
        from : 'Admin',
        text : 'Welcome to chat App',
        createAt : new Date().getTime()
    })
    socket.broadcast.emit('newMessage',{
        from : 'Admin',
        text : "New User Join",
        createAt : new Date().getTime()
    })
    socket.on('createMessage', (message)=> {
        console.log('Create Message' , message)
        io.emit('newMessage', {
            from : message.from,
            text : message.text,
            createAt : new Date().getTime()

        })
       
    })
    socket.on('disconnect', () => {
        console.log('User was disconnected');
       
    });
})

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server On is ${port}`)
})