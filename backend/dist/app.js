"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
//imports necc
const handle_1 = __importDefault(require("./webutils/handle")); //handling all queues.
dotenv_1.default.config();
// Create an Express application
const app = (0, express_1.default)();
// Create an HTTP server using the Express app
const server = http_1.default.createServer(app);
// Set the port for the server
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
// Create a Socket.IO instance attached to the server
const io = new socket_io_1.Server(server);
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Specify your allowed origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));
const HandleObj = new handle_1.default();
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Socket disconnected: ${socket.id}`);
    }));
});
// Start the server and listen on the specified port
server.listen(PORT, () => {
    // Log a message indicating the server is listening
    console.log(`Server listening on port ${PORT}`);
});
