import { useEffect, useState } from 'react';

import { status } from './core/PainelStatus.jsx';

import useItens from './hooks/useItens';
import { useWebSocket } from './hooks/useWebSockets';

import ItensList from './components/ItensList.jsx';
import Header from './components/Header.jsx';
import { QRCodeCanvas } from 'qrcode.react';
import { useEventCooldown } from './hooks/useEventCoolDown';
import ChamarModal from './components/ChamarModal/ChamarModal.jsx';

const URL = import.meta.env.VITE_URL;

export default function App() {
    const { itens, carregarItens } = useItens(URL, '');

    const handleEventoComCooldown = useEventCooldown(
        5_000, // tempo em milisegundos
        carregarItens
    );

    const [showModal, setShowModal] = useState(false);
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useWebSocket((data) => {
        if (data.type === 'chamar_senha') {
            setShowModal(true);
            setCategoria(data.payload.categoria);
            setId(data.payload.id);
        }
        handleEventoComCooldown();
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
                <QRCodeCanvas value="https://vj-app-sua-vez.vercel.app/venda" size={120} />
            </div>
            <ChamarModal show={showModal} onClose={handleCloseModal} categoria={categoria} id={id} />
        </>
    );
}
