import { useEffect, useRef } from 'react';
import './style.css';
import sound from '../../assets/campainha.mp3';

const ChamarModal = ({ show, categoria, id, onClose }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(sound);
            audioRef.current.volume = 1.0;
        }
    }, []);

    useEffect(() => {
        if (show) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
                // autoplay bloqueado? ignora
            });

            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: '#000000' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '100vw' }}>
                <div className="modal-content bg-transparent border-0">
                    <div className="modal-body text-center">
                        <h1
                            className="display-1 text-warning fw-bolder"
                            style={{
                                animation: 'blink 0.333s step-end infinite',
                                fontSize: '16rem'
                            }}
                        >
                            {id}
                        </h1>
                        <p className="text-warning" style={{ fontSize: '6rem' }}>{categoria}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChamarModal;
