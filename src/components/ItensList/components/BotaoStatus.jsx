const BotaoStatus = ({ onClick, direction = "right", color = "primary", disabled = "" }) => {
    return (
        <i tabIndex={0} className={`btn btn-outline-${color} bi bi-arrow-${direction} fs-4 ${disabled}`} onClick={onClick} disabled={disabled}></i>
    );
};

export default BotaoStatus;