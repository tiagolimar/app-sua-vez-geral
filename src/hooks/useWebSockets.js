import { useEffect, useRef } from 'react';

export function useWebSocket(onMessage, onOpen) {
    const socketRef = useRef(null);
    const retryRef = useRef(0);
    const timeoutRef = useRef(null);

    const onMessageRef = useRef(onMessage);
    const onOpenRef = useRef(onOpen);

    useEffect(() => {
        onMessageRef.current = onMessage;
        onOpenRef.current = onOpen;
    }, [onMessage, onOpen]);

    useEffect(() => {
        function connect() {
            // 🔒 garante que não existe socket pendurado
            if (socketRef.current) {
                socketRef.current.onclose = null;
                socketRef.current.onerror = null;
                socketRef.current.close();
            }

            const socket = new WebSocket(import.meta.env.VITE_WS_URL);
            socketRef.current = socket;

            socket.onopen = () => {
                retryRef.current = 0;
                onOpenRef.current?.(socket);
            };

            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    onMessageRef.current?.(data);
                } catch {
                    // ignora mensagem inválida
                }
            };

            socket.onclose = () => {
                if (retryRef.current >= 5) return;

                const delay = Math.min(1000 * 2 ** retryRef.current, 10000);
                retryRef.current++;

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
            socketRef.current = null;
        };
    }, []);

    return socketRef;
}
