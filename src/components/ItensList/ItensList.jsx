import Card from './components/Card';
import CardBody from './components/CardBody';

export default function ItensList({ itens, onAtualizarStatus, status }) {
    const itensFiltrados = status.map(st => ({
        status: st.name,
        apelido: st.apelido,
        color: st.color,
        itens: itens.filter(item => item.status === st.name),
        btnleft: st.btnleft,
        btnright: st.btnright,
        btnChamar: st.btnChamar
    }));

    return (
        <div className="d-flex gap-3 px-3">
            {itensFiltrados.map(({ status, apelido, color, itens, btnleft, btnright, btnChamar }) => (
                <div className="bg-black rounded shadow-sm" style={{ flex: 1 }} key={status}>
                    <h3 style={{ textShadow: '2px 2px 2px #000000' }} className=

                        {`bg-${color} p-2 mb-3 rounded-top text-center fs-1 text-white`}>{apelido}</h3>
                    <div className="d-flex flex-wrap justify-content-center">
                        {itens.sort((a, b) => a.venda_id - b.venda_id).map(item => {

                            return (
                                // configurando duas colunas de cards

                                <div className="mb-1" key={item.id}>
                                    <Card>
                                        {/* <CardHeader categoria={item.categoria} item={item} color={color} /> */}
                                        <CardBody item={item} venda_id={item.venda_id} onAtualizarStatus={onAtualizarStatus} btnleft={btnleft} btnright={btnright} btnChamar={btnChamar} />
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
