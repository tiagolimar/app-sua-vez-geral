export default function Header() {
    const style = {
        background: 'linear-gradient(to right, #e5a359,  #191d38, #191d38 ,rgb(33, 38, 75), #191d38,  #e5a359)',
        color: 'white',
    }
    return (
        <>
            <header style={style} className="text-white shadow py-2">
                <h1 className="fs-5 text-center">Santo Réveillon VJ 2026 - App Sua Vez</h1>
            </header>
        </>
    );
}