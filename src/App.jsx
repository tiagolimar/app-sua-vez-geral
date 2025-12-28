import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { status } from './core/PainelStatus.jsx';

import useItens from './hooks/useItens';
import useConfirmacao from './hooks/useConfirmacao';
import { useWebSocket } from './hooks/useWebSockets';

import ItensList from './components/ItensList/ItensList.jsx';
import Confirmacao from './components/Confirmacao';
import Header from './components/Header/Header.jsx';

// const URL = 'https://tlima-dev.site/api/';
const URL = 'http://localhost:3000/api/';

export default function App() {
    const { categoria: categoriaAtual } = useParams();
    const [categoria, setCategoria] = useState(categoriaAtual);
    const { itens, carregarItens } = useItens(URL, categoria);

    useWebSocket((data) => {
        if (!categoria || data.payload.includes(categoria)) {
            carregarItens();
        }
    });

    useEffect(() => {
        carregarItens();
    }, [categoria]);

    const {
        showConfirmacao,
        solicitarConfirmacao,
        confirmar,
        cancelar,
    } = useConfirmacao();

    const handleAtualizarStatus = async (id, destino) => {
        if (destino === 'Finalizado') {
            solicitarConfirmacao({ id, destino });
            return;
        }
        try {
            await axios.put(`${URL}item/${id}/status`, { status: destino });
        } catch (error) {
            console.error('Erro ao atualizar status do item:', error);
        }
    };

    const handleConfirmacao = async (data) => {
        const { id, destino } = data;
        try {
            await axios.put(`${URL}item/${id}/status`, { status: destino });
        } catch (error) {
            console.error('Erro ao atualizar status do item:', error);
        }
    }

    return (
        <>
            <Header categoria={categoria} setCategoria={setCategoria} url={URL} />

            <ItensList itens={itens} onAtualizarStatus={handleAtualizarStatus} status={status} />
            <Confirmacao
                show={showConfirmacao}
                onConfirm={() => confirmar(handleConfirmacao)}
                onCancel={cancelar}
                message="Deseja realmente finalizar o item?"
            />
        </>
    );
}
