import { formatarData } from "../../functions/formatarData.js";

const CardHeader = ({ item }) => {
    return (
        <div className="card-header d-flex justify-content-between align-items-center pt-0 pb-0 px-0 bg-secondary-subtle">
            <h3 className="fs-6 ps-2 mt-1 fw-bold text-truncate ellipsis">{item.observation ? item.observation : '-'}</h3>
            <p className="card-text pe-1">
                {formatarData(item.creationDate)}
            </p>
        </div>
    );
};

export default CardHeader;