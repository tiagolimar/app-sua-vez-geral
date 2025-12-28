import { useState } from 'react';
import axios from 'axios';

export default function useItens(URL, selectedCategoria) {
    const [itens, setItens] = useState([]);
    const carregarItens = async () => {
        setItens([]);
        try {
            const url = `${URL}itens?categoria=${selectedCategoria || ''}`;
            const response = await axios.get(url);
            setItens(response.data);
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        }
    };

    return { itens, carregarItens };
}
