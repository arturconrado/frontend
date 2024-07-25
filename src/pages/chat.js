import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatPage = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [error, setError] = useState('');

    const chatId = '7df9c135-9d02-4a62-9e4e-44f7a632e0ef'; // O ID do chat
    const serviceId = '7df9c135-9d02-4a62-9e4e-44f7a632e0ef'; // O ID do serviço

    useEffect(() => {
        const authToken = localStorage.getItem('token');
        console.log('Auth Token:', authToken);

        if (!authToken) {
            setError('No authentication token found');
            console.error('No authentication token found');
            return;
        }

        const newSocket = io('http://localhost:3002', {
            auth: {
                token: authToken,
            },
            transports: ['websocket'],
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
            newSocket.emit('getMessages', { chatId });
        });

        newSocket.on('receiveMessages', (messages) => {
            console.log('Messages received:', messages);
            setMessages(messages);
        });

        newSocket.on('receiveMessage', (message) => {
            console.log('Message received:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        newSocket.on('error', (errorMessage) => {
            console.error('Socket error:', errorMessage);
            setError(errorMessage);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            console.log('Disconnecting from server');
            newSocket.close();
        };
    }, [chatId]);

    const sendMessage = () => {
        if (messageInput.trim()) {
            console.log('Sending message:', messageInput);
            socket.emit('sendMessage', {
                chatId,
                message: messageInput,
                serviceId,
            });
            setMessageInput('');
        } else {
            console.warn('Message input is empty');
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div id="messages" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{message.senderRole === 'USER' ? 'Você' : 'Profissional'}:</strong> {message.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                style={{ width: '80%', padding: '10px' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px' }}>Send</button>
        </div>
    );
};

export default ChatPage;