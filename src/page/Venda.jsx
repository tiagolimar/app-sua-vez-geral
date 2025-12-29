import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useWebSocket } from '../hooks/useWebSockets';
import axios from 'axios';

import Header from "../components/Header.jsx";
import Card from './components/Card.jsx';
import CardHeader from './components/CardHeader.jsx';
import CardBody from './components/CardBody.jsx';
import VendaForm from './components/VendaForm.jsx';

const URL = import.meta.env.VITE_URL;

const fetcher = url => axios.get(url).then(res => res.data);

// Função auxiliar para enviar mensagem se o socket estiver aberto
function sendMessage(socket, message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
}

export default function Venda() {
    const [searchId, setSearchId] = useState(null);

    const { data: itens, error, isLoading } = useSWR(
        searchId ? `${URL}itens/${searchId}` : null,
        fetcher
    );

    const { mutate } = useSWR(
        searchId ? `${URL}itens/${searchId}` : null
    );

    const socketRef = useWebSocket(
        (data) => {
            if (data.type === 'venda_atualizada') {
                const updatedItem = data.payload?.item || data.item;
                if (updatedItem) {
                    mutate(currentItens => {
                        if (!currentItens) return currentItens;
                        return currentItens.map(item =>
                            item.id === updatedItem.id ? updatedItem : item
                        );
                    }, false); // false = não revalidar (não buscar do servidor)
                }
            }
        },
        (socket) => {
            if (searchId) {
                console.log(`📡 Inscrevendo-se na venda ${searchId}`);
                sendMessage(socket, {
                    type: 'subscribe_venda',
                    payload: { id: Number(searchId) }
                });
            }
        }
    );

    // Efeito para se inscrever quando o ID muda e o socket já está aberto
    useEffect(() => {
        if (searchId && socketRef.current) {
            console.log(`📡 Atualizando inscrição para venda ${searchId}`);
            sendMessage(socketRef.current, {
                type: 'subscribe_venda',
                payload: { id: Number(searchId) }
            });
        }
    }, [searchId]);

    const handleSearch = (id) => {
        setSearchId(id);
    };

    return (
        <>
            <Header />
            <div className="container mt-4">
                <VendaForm onSearch={handleSearch} />

                {isLoading && <div className="text-center">Carregando...</div>}

                {error && <div className="alert alert-danger text-center">Erro ao buscar itens da venda.</div>}

                {itens && (
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        {itens.map(item => (
                            <div className="mb-1" key={item.id}>
                                <Card>
                                    <CardHeader item={item} />
                                    <CardBody item={item} />
                                </Card>
                            </div>
                        ))}
                    </div>
                )}

                {Array.isArray(itens) && itens.length === 0 && searchId != null ? (
                    <>
                        <div className="alert alert-danger">
                            <h3>Venda <strong>{searchId}</strong> não rastreada.</h3>
                            <p>Verifique o número da venda ou se ela possue algum item válido.</p>
                        </div>
                        <div className="alert alert-info">
                            <h3>Observação:</h3>
                            <p>Bebidas e itens de cafeteria, sobremesa ou self-service não são rastreados.</p>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
}