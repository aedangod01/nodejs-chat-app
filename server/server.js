// server/server.js
import path from 'path';
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { generateMessage } from './utils/message.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// چون __dirname در ES Module نیست، باید اینکار رو بکنی:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('New User Connection!');

    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new User join'));

    socket.on('createMessage', (message) => {
        console.log('Create Message', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server On is ${port}`);
});
