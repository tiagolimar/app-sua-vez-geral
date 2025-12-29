import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { status } from './core/PainelStatus.jsx';

import useItens from './hooks/useItens';
import { useWebSocket } from './hooks/useWebSockets';

import ItensList from './components/ItensList.jsx';
import Header from './components/Header.jsx';

const URL = import.meta.env.VITE_URL;

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
    }, []);

    return (
        <>
            <Header />
            <ItensList itens={itens} status={status} />
        </>
    );
}
