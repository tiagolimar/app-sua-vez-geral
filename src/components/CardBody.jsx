const CardBody = ({ item }) => {
    return (
        <div className="card-body px-2 py-0">
            <div className="d-flex flex-column justify-content-between align-items-center text-center">
                <p className='m-0 p-0 fw-bold'>{item.category}</p>
                <p style={{ fontSize: '2.5em', lineHeight: '1em' }} className="mb-1 mt-0 pt-0 card-text text-center w-100 text-uppercase my-0 fw-bold text-nowrap">
                    {item.venda_id}/{item.position}
                </p>
            </div>
        </div>
    );
};

export default CardBody;