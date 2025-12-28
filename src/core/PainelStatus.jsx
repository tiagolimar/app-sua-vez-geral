export const status = [
    {
        name: "Em Espera",
        apelido: "Em Espera",
        color: "secondary",
        btnleft: {
            disabled: "disabled",
            alterarPara: "Em Espera",
            cor: "secondary"
        },
        btnright: {
            alterarPara: "Em Atendimento",
            cor: "success"
        }
    },
    {
        name: "Em Atendimento",
        apelido: "Em Produção",
        color: "danger",
        btnleft: {
            alterarPara: "Em Espera",
            cor: "warning"
        },
        btnright: {
            alterarPara: "Atendidos",
            cor: "info"
        },
        btnChamar: false
    },
    {
        name: "Atendidos",
        apelido: "Pronto",
        color: "success",
        btnleft: {
            alterarPara: "Em Atendimento",
            cor: "success"
        },
        btnright: {
            alterarPara: "Finalizado",
            cor: "danger"
        }
    },
];
