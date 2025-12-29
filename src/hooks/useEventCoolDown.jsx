import { useRef, useCallback, useEffect } from 'react';

export function useEventCooldown(minIntervalMs, handler) {
    const lastRunRef = useRef(0);
    const timeoutRef = useRef(null);
    const savedHandler = useRef(handler);

    // Mantém o handler atualizado para evitar closures antigas no setTimeout
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    // Limpa o timeout se o componente desmontar
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback((...args) => {
        const now = Date.now();
        const timeSinceLastRun = now - lastRunRef.current;

        // Se já existe um agendamento pendente, cancelamos para reagendar (ou executar agora)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (timeSinceLastRun >= minIntervalMs) {
            // Executa imediatamente
            lastRunRef.current = now;
            savedHandler.current(...args);
        } else {
            // Cooldown ativo: Agenda a execução para o final do intervalo (last wins)
            const delay = minIntervalMs - timeSinceLastRun;

            timeoutRef.current = setTimeout(() => {
                lastRunRef.current = Date.now();
                timeoutRef.current = null;
                savedHandler.current(...args);
            }, delay);
        }
    }, [minIntervalMs]);
}
