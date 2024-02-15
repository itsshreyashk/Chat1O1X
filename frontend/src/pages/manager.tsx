import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
// Components
import Home from './home';
import Capsule from './capsule';

const Manager: React.FC = () => {
    const socket = io("http://localhost:3001", {
        transports: ['websocket'],
    });
    const [page, setPage] = useState('home');
    const [status, setStatus] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [roomName, setRoomName] = useState('');
    const usernameRef = useRef<HTMLInputElement>(null);

    const leaveRef = useRef<HTMLButtonElement>(null); //leave
    const nextRef = useRef<HTMLButtonElement>(null); //next


    const readyJoin = () => {
        socket.emit('ready');
    }
    useEffect(() => {
        socket.on('join', (roomName: string) => {
            socket.emit('join', roomName);
            setPage('room');
            setRoomName(roomName);
        });
        socket.on('quit', () => {
            //connects the user to another user.
            socket.emit('ready');
        })

        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <>
            {page === 'home' && <Home usernameRef={usernameRef} readyJoin={readyJoin} status={status} />}
            {page === 'room' && <Capsule msgs={msgs} />}
        </>
    );
};

export default Manager;