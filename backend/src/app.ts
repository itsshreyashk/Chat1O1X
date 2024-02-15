import express, { Application, json, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';

//imports necc
import Handle from './webutils/handle'; //handling all queues.
dotenv.config();


// Create an Express application
const app: Application = express();

// Create an HTTP server using the Express app
const server: http.Server = http.createServer(app);
// Set the port for the server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// Create a Socket.IO instance attached to the server
const io: Server = new Server(server);
// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Specify your allowed origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

const HandleObj: any = new Handle();

io.on('connection', async (socket: Socket) => {
    let mymatch: string;
    let status: boolean;
    let roomName: string;
    console.log(`Socket connected: ${socket.id}`);
    //Adding user to user list.
    await HandleObj.addUsertoList(socket.id);

    //User is ready to join.
    socket.on('ready', async () => {
        //Adding user to queue.
        if (await HandleObj.checkUserinList(socket.id)) {
            await HandleObj.addUsertoQueue(socket.id);
            status = await HandleObj.isQueueEven();
            if (status) {
                await HandleObj.splitQueue();
                mymatch = await HandleObj.getMatch(socket.id);
                socket.join(roomName);
                socket.emit('join', roomName)
                io.to(mymatch).emit('join', roomName);
            } else {
                NaN;
            }
        } else {
            NaN;
        }

    });

    socket.on('join', async (roomName: string) => {
        socket.join(roomName);
        socket.emit('join', roomName);
    });



    //Handle when user gets disconnected.
    socket.on('disconnect', async () => {
        console.log(`Socket disconnected: ${socket.id}`);
        await HandleObj.extinctUser(socket.id); //removes user from everywhere.
        if (mymatch) {
            io.to(mymatch).emit('quit');
        } else { NaN }
    });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
    // Log a message indicating the server is listening
    console.log(`Server listening on port ${PORT}`);
});