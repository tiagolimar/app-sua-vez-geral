import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

import Header from "../components/Header.jsx";
import Card from './components/Card.jsx';
import CardHeader from './components/CardHeader.jsx';
import CardBody from './components/CardBody.jsx';
import VendaForm from './components/VendaForm.jsx';

const URL = import.meta.env.VITE_URL;

const fetcher = url => axios.get(url).then(res => res.data);

export default function Venda() {
    const [searchId, setSearchId] = useState(null);

    const { data: itens, error, isLoading } = useSWR(
        searchId ? `${URL}itens/${searchId}` : null,
        fetcher
    );

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
                    <div className="alert alert-danger text-center">Venda <strong>{searchId}</strong> não encontrada.</div>
                ) : null}
            </div>
        </>
    );
}