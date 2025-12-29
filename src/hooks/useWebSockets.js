import { useEffect, useRef } from 'react';

export function useWebSocket(onMessage) {
    const socketRef = useRef(null);
    const retryRef = useRef(0);
    const timeoutRef = useRef(null);

    const onMessageRef = useRef(onMessage);
    useEffect(() => {
        onMessageRef.current = onMessage;
    }, [onMessage]);

    useEffect(() => {
        function connect() {
            const socket = new WebSocket(import.meta.env.VITE_WS_URL);
            socketRef.current = socket;

            socket.onopen = () => {
                console.log('🟢 WebSocket conectado');
                retryRef.current = 0;
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (onMessageRef.current) {
                    onMessageRef.current(data);
                }
            };

            socket.onclose = () => {
                if (retryRef.current >= 5) {
                    console.log('❌ Falha permanente no WebSocket');
                    return;
                }
                const delay = Math.min(1000 * 2 ** retryRef.current, 10000);
                retryRef.current++;
                console.log(`🔄 Reconectando em ${delay}ms`);
                timeoutRef.current = setTimeout(connect, delay);
            };

            socket.onerror = () => {
                socket.close();
            };
        }

        connect();

        return () => {
            clearTimeout(timeoutRef.current);
            socketRef.current?.close();
        };
    }, []);

    return socketRef;
}