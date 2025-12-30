import { useEffect, useState } from 'react';

import { status } from './core/PainelStatus.jsx';

import useItens from './hooks/useItens';
import { useWebSocket } from './hooks/useWebSockets';

import ItensList from './components/ItensList.jsx';
import Header from './components/Header.jsx';
import { QRCodeCanvas } from 'qrcode.react';
import ChamarModal from './components/ChamarModal/ChamarModal.jsx';

const URL = import.meta.env.VITE_URL;

export default function App() {
    const { itens, carregarItens, setItens } = useItens(URL, '');

    const [showModal, setShowModal] = useState(false);
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useWebSocket((data) => {
        if (data.type === 'venda_atualizada') return null;

        if (data.type === 'chamar_senha') {
            setShowModal(true);
            setCategoria(data.payload.categoria);
            setId(data.payload.id);
            return null;
        }

        if (data.type === 'item_atualizado') {
            const item = data.payload;
            if (item) {
                setItens(itens.map((it) => it.id === item.id ? item : it));
            }
            return null;
        }

        if (data.type === 'itens_registrados') {
            const itemsToProcess = data.payload;

            if (itemsToProcess.length > 0) {
                setItens(currentItens => {
                    const existingIds = new Set(currentItens.map(i => i.id));
                    const uniqueNewItems = itemsToProcess.filter(i => !existingIds.has(i.id));

                    if (uniqueNewItems.length === 0) return currentItens;
                    return [...currentItens, ...uniqueNewItems];
                });
            }
            return null;
        }

        if (data.type === 'itens_cancelados') {
            const canceladosMap = new Map(data.payload.map(item => [item.id, item]));

            setItens(itens.map(item =>
                canceladosMap.has(item.id) ? canceladosMap.get(item.id) : item
            ));
            return null;
        }
    });

    useEffect(() => {
        carregarItens();
    }, []);

    return (
        <>
            <Header />
            <ItensList itens={itens} status={status} />
            <div className='position-fixed bottom-0 end-0 p-2 d-flex align-items-end gap-2'>
                <p className='fs-2 fw-bold my-0 bg-black text-white px-2 rounded'>Acompanhe pelo celular.</p>
                <div className='border border-black border-5 rounded'>
                    <QRCodeCanvas value="https://vj-app-sua-vez.vercel.app/venda" size={120} />

                </div>
            </div>
            <ChamarModal show={showModal} onClose={handleCloseModal} categoria={categoria} id={id} />
        </>
    );
}
