import useSWR from 'swr';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header({ categoria, setCategoria, url }) {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data } = useSWR(url + 'categorias', fetcher);
    const style = {
        background: 'linear-gradient(to right, #e5a359,  #191d38, #191d38 ,rgb(33, 38, 75), #191d38,  #e5a359)',
        color: 'white',
    }
    return (
        <>
            <header style={style} className="text-white shadow py-2">
                <h1 className="fs-5 text-center">Santo Réveillon VJ 2026 - App Sua Vez</h1>
            </header>
            {!categoria || <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2 justify-content-center shadow-sm">
                <ul className="navbar-nav flex-row gap-2">
                    <li key={0} className={`nav-item btn btn-sm ${!categoria ? 'btn-outline-dark active' : 'btn-outline-dark'}`}>
                        <Link onClick={() => setCategoria('')} to={`/`} className="nav-link">TODOS</Link>
                    </li>
                    {data && data.map((cat, index) => (
                        <li key={index + 1} className={`nav-item btn btn-sm ${categoria === cat.name ? 'btn-outline-dark active' : 'btn-outline-dark'}`}>
                            <Link onClick={() => setCategoria(cat.name)} to={`/${cat.name}`} className={`nav-link text-uppercase`}>{cat.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>}
        </>
    );
}