import { useState } from 'react';

export default function VendaForm({ onSearch }) {
    const [vendaId, setVendaId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(vendaId);
        setVendaId('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 d-flex gap-2 justify-content-center">
            <div className="form-group">
                <div className="w-100">
                    <label htmlFor="vendaId">Número da venda</label>
                </div>
                <div className="w-100 d-flex gap-2">
                    <input
                        id="vendaId"
                        type="text"
                        className="form-control"
                        placeholder="Número da venda"
                        value={vendaId}
                        onChange={(e) => setVendaId(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary w-25">
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    );
}
