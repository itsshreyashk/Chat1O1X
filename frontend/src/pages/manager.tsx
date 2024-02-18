import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
// Components
import Home from './home';
import Capsule from './capsule';
type Message = {
    username: string;
    msg: string;
};
const Manager: React.FC = () => {
    const socket = io("http://localhost:3001", {
        transports: ['websocket'],
    });
    const [page, setPage] = useState('home');
    const [status, setStatus] = useState('');
    const [next, setNext] = useState('Next');
    const [msgs, setMsgs] = useState<Array<Message>>([]);
    const [roomName, setRoomName] = useState('');
    const usernameRef = useRef<HTMLInputElement>(null);

    const sendMsg = (username: string, msg: string) => {
        socket.emit('emitMsg', {
            username: username,
            msg: msg,
            roomName: roomName,
        })
    }

    const readyJoin = () => {
        socket.emit('ready');
    }
    const nextRoom = (roomName: string) => {
        setNext('Connecting...');
        socket.emit('next', roomName);
    }
    useEffect(() => {
        socket.on('join', (roomName: string) => {
            socket.emit('join', roomName);
            setPage('room');
            setRoomName(roomName);
        });
        socket.on('getMsg', (data: any) => {
            const username: string = data.username;
            const msg: string = data.msg;
            setMsgs((prevMsgs: Array<Message>) => [
                ...prevMsgs,
                { username: username, msg: msg }
            ]);
        });
        socket.on('next', (roomName: string) => {
            setNext('Next')
            setMsgs([]);
            socket.emit('next', roomName);
            readyJoin();
        });
        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <>
            {page === 'home' && <Home usernameRef={usernameRef} readyJoin={readyJoin} status={status} />}
            {page === 'room' && <Capsule msgs={msgs} sendMsg={sendMsg} nextRoom={nextRoom} next={next} />}
        </>
    );
};

export default Manager;