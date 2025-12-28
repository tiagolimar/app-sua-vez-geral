const Confirmacao = ({ show, onConfirm, onCancel, message }) => {
    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor:"#00000080" }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content border border-secondary">
                    <div className="modal-header bg-secondary-subtle ">
                        <h5 className="modal-title">Confirmação</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmacao;