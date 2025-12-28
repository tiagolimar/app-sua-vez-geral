const Card = ({ children }) => {
    return (
        <div className="card border-secondary">
            {children}
        </div>
    );
};

export default Card;