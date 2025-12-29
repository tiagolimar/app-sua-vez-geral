const Card = ({ children }) => {
    return (
        <div className="card border-secondary" style={{ minWidth: '250px' }}>
            {children}
        </div>
    );
};

export default Card;