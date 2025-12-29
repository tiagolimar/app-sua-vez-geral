import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { status } from './core/PainelStatus.jsx';

import useItens from './hooks/useItens';
import { useWebSocket } from './hooks/useWebSockets';

import ItensList from './components/ItensList.jsx';
import Header from './components/Header.jsx';
import { QRCodeCanvas } from 'qrcode.react';



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
            <div className='position-fixed bottom-0 end-0 p-2 d-flex align-items-end gap-4'>
                <p className='fs-2 fw-bold my-0 bg-black text-white px-2 rounded'>Acompanhe pelo celular.</p>
                <QRCodeCanvas value="https://vj-app-sua-vez.vercel.app/venda" size={120} />
            </div>
        </>
    );
}
