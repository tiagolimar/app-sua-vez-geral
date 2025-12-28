const CardHeader = ({ categoria, item, color }) => {
    return (
        <div className="card-header d-flex justify-content-between align-items-center pt-0 pb-0 px-0 bg-secondary-subtle">
            <div className='d-flex justify-content-center gap-4 w-100'>
                <div className={`text-center px-2 py-0 my-0 fs-4 fw-bold border-warning mb-1 w-content rounded-pill`}>{item.category}</div>
            </div>
        </div>
    );
};

export default CardHeader;