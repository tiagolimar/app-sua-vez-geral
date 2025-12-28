import { useState } from 'react';
import BotaoStatus from './BotaoStatus.jsx';
import ChamarModal from './ChamarModal.jsx';

const CardBody = ({ item, onAtualizarStatus, btnleft, btnright, btnChamar }) => {
    const [showChamarModal, setShowChamarModal] = useState(false);

    return (
        <div className="card-body px-2 py-0">
            <div className="d-flex flex-column justify-content-between align-items-center text-center">
                {/* <BotaoStatus
                    onClick={() => onAtualizarStatus(item.id, btnleft.alterarPara)}
                    direction="left"
                    disabled={btnleft.disabled}
                    color={btnleft.cor}
                /> */}
                {/* propriedade css que deixa o texto mais esprimido */}
                <p className='m-0 p-0 fw-bold'>{item.category}</p>
                <p style={{ fontSize: '2.5em', lineHeight: '1em' }} className="mb-1 mt-0 pt-0 card-text text-center w-100 text-uppercase my-0 fw-bold text-nowrap">
                    0000{item.venda_id}/0{item.position}
                </p>

                {/* <BotaoStatus
                    onClick={() => onAtualizarStatus(item.id, btnright.alterarPara)}
                    direction="right"
                    disabled={btnright.disabled}
                    color={btnright.cor}
                /> */}
            </div>

            {btnChamar && <button className="btn btn-outline-info col-12 mb-2 fw-bolder" onClick={() => setShowChamarModal(true)}>CHAMAR</button>}
            <ChamarModal show={showChamarModal} categoria={item.category} id={`${item.venda_id}-${item.position}`} onClose={() => setShowChamarModal(false)} />
        </div>
    );
};

export default CardBody;