import { useState } from 'react';

const useConfirmacao = () => {
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [confirmacaoData, setConfirmacaoData] = useState({});

    const solicitarConfirmacao = (data) => {
        setConfirmacaoData(data);
        setShowConfirmacao(true);
    };

    const confirmar = (callback) => {
        setShowConfirmacao(false);
        callback(confirmacaoData);
    };

    const cancelar = () => {
        setShowConfirmacao(false);
    };

    return {
        showConfirmacao,
        confirmacaoData,
        solicitarConfirmacao,
        confirmar,
        cancelar,
    };
};

export default useConfirmacao;