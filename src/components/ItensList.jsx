import Card from './Card';
import CardBody from './CardBody';

export default function ItensList({ itens, status }) {
    const itensFiltrados = status.map(st => ({
        status: st.name,
        apelido: st.apelido,
        color: st.color,
        itens: itens.filter(item => item.status === st.name),
    }));

    return (
        <div className="d-flex gap-2 px-2 pt-2">
            {itensFiltrados.map(({ status, apelido, color, itens }) => (
                <div className="bg-black rounded shadow-sm" style={{ flex: 1 }} key={status}>
                    <h3 style={{ textShadow: '2px 2px 2px #000000' }} className=

                        {`bg-${color} p-2 mb-2 rounded-top text-center fs-1 text-white`}>{apelido}</h3>
                    <div className="d-flex flex-wrap justify-content-center">
                        {itens.length > 0 ? itens.sort((a, b) => a.venda_id - b.venda_id || a.id - b.id).map((item, index) => {

                            return (
                                <div className="mb-1" key={index}>
                                    <Card>
                                        <CardBody item={item} />
                                    </Card>
                                </div>
                            );
                        }) : <p className="text-center text-white">Aguardando novos pedidos...</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};
