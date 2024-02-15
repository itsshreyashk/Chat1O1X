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
    const [msgs, setMsgs] = useState<Array<Message>>([]);
    const [roomName, setRoomName] = useState('');
    const usernameRef = useRef<HTMLInputElement>(null);

    const leaveRef = useRef<HTMLButtonElement>(null); //leave
    const nextRef = useRef<HTMLButtonElement>(null); //next

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

        socket.on('quit', () => {
            //connects the user to another user.
            socket.emit('ready');
        });

        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <>
            {page === 'home' && <Home usernameRef={usernameRef} readyJoin={readyJoin} status={status} />}
            {page === 'room' && <Capsule msgs={msgs} sendMsg={sendMsg} />}
        </>
    );
};

export default Manager;