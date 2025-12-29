import { status } from "../../core/PainelStatus.jsx";

const CardBody = ({ item }) => {

    function formatStatus(status_item) {
        for (const st of status) {
            if (status_item === st.name) return st.apelido;
        }
        return status_item
    }

    return (
        <div className="card-body px-2 py-0">
            <div className="d-flex flex-column justify-content-between align-items-center text-center">
                <p style={{ fontSize: '2.5em', lineHeight: '1em' }} className="mb-1 mt-0 pt-0 card-text text-center w-100 text-uppercase my-0 fw-bold text-nowrap">
                    {item.venda_id}/{item.position}
                </p>
                <p className={`fs-3 my-0 fw-bold text-${status.find(st => st.name === item.status)?.color}`}>{formatStatus(item.status)}</p>
                <div className="d-flex flex-column justify-content-start w-100">
                    <p className="my-0 text-start">Nº da venda: <strong>{item.venda_id}</strong></p>
                    <p className="my-0 text-start">Nº do item: <strong>{item.position}</strong></p>
                    <p className="my-0 text-start">Descrição: <strong>{item.name}</strong></p>
                </div>
                <span className={`text-center px-2 py-0 my-0 text-warning bg-black mb-1 w-content text-truncate ellipsis rounded-pill`}>{item.category}</span>
            </div>
        </div>
    );
};

export default CardBody;