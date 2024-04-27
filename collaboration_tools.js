import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const router = express.Router();
const server = http.createServer(router);
const io = new Server(server);

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    // This should integrate with your authentication logic
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(403).send('Unauthorized');
}

// Real-time collaboration tools setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        console.log(`User ${userId} joined room ${roomId}`);

        socket.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId);
            console.log(`User ${userId} disconnected`);
        });
    });

    socket.on('drawing', (data) => socket.to(data.room).volatile.emit('drawing', data));
});

// Routes for real-time collaboration
router.get('/video-conference', isAuthenticated, (req, res) => {
    res.send('Video Conference Endpoint');
});

router.get('/shared-whiteboard', isAuthenticated, (req, res) => {
    res.send('Shared Whiteboard Endpoint');
});

router.get('/document-edit', isAuthenticated, (req, res) => {
    res.send('Document Edit Endpoint');
});

export const collaborationToolsRoutes = router;
export const collaborationServer = server;
