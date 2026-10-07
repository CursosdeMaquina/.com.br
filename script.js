/* ============================================================
   FORMAÇÃO MÁQUINAS PESADAS
   SCRIPT PRINCIPAL
   ============================================================ */


/* ============================================================
   CONFIGURAÇÕES
============================================================ */

const PIX_KEY = "31971705564";

const PIX_NOME = "FORMACAO MAQUINAS";

const PIX_CIDADE = "FORMIGA";

/*
   WhatsApp para receber os comprovantes.
   Formato: 55 + DDD + número
*/
const WHATSAPP = "5531998392353";


/* ============================================================
   VALORES DOS CURSOS
============================================================ */

/*
   Os valores dos cursos ficam centralizados aqui.

   Você pode alterar os preços futuramente
   somente nesta parte.
*/

const PRECOS_CURSOS = {

    "Operador de Escavadeira Hidráulica": 149.90,

    "Operador de Retroescavadeira": 139.90,

    "Operador de Motoniveladora": 199.90,

    "Operador de Pá Carregadeira": 139.90

};


/*
   Valor padrão caso algum curso não seja
   encontrado na lista acima.
*/

const VALOR_CURSO = 49.90;


/* ============================================================
   VARIÁVEIS
============================================================ */

let cursoSelecionado = "";

let valorSelecionado = VALOR_CURSO;


/* ============================================================
   ELEMENTOS DO HTML
============================================================ */

const modal =
    document.getElementById("pixModal");

const modalCurso =
    document.getElementById("modalCurso");

const modalValor =
    document.getElementById("modalValor");

const pixKeyInput =
    document.getElementById("pixKey");

const mensagemPix =
    document.getElementById("mensagemPix");

const btnCopiar =
    document.getElementById("btnCopiar");

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

const menu =
    document.getElementById("menu");

const whatsappFlutuante =
    document.getElementById("whatsappFlutuante");


/* ============================================================
   OBTER PREÇO DO CURSO
============================================================ */

function obterPrecoCurso(
    curso,
    valorInformado
) {

    /*
       Primeiro procura o curso
       na tabela de preços.
    */

    if (
        PRECOS_CURSOS.hasOwnProperty(curso)
    ) {

        return PRECOS_CURSOS[curso];

    }


    /*
       Caso o curso não esteja na tabela,
       utiliza o valor informado pelo HTML.
    */

    if (
        valorInformado !== undefined &&
        valorInformado !== null &&
        !isNaN(Number(valorInformado))
    ) {

        return Number(valorInformado);

    }


    /*
       Valor de segurança.
    */

    return VALOR_CURSO;

}


/* ============================================================
   MENU MOBILE
============================================================ */

const menuNavegacao =
    mainNav || menu;


if (menuToggle && menuNavegacao) {

    menuToggle.addEventListener(
        "click",
        function () {

            const aberto =
                menuNavegacao.classList.toggle(
                    "active"
                );


            /*
               Compatibilidade com CSS
               que utiliza "ativo".
            */

            menuNavegacao.classList.toggle(
                "ativo",
                aberto
            );


            menuToggle.setAttribute(
                "aria-expanded",
                aberto
                    ? "true"
                    : "false"
            );

        }
    );


    const linksMenu =
        menuNavegacao.querySelectorAll("a");


    linksMenu.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    menuNavegacao.classList.remove(
                        "active"
                    );

                    menuNavegacao.classList.remove(
                        "ativo"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


/* ============================================================
   ABRIR PAGAMENTO
============================================================ */

function abrirPagamento(
    curso,
    valor
) {

    /*
       Guarda o nome do curso.
    */

    cursoSelecionado =
        curso;


    /*
       IMPORTANTE:

       O preço agora é obtido automaticamente
       pela tabela PRECOS_CURSOS.

       Mesmo que o HTML ainda tenha:
       abrirPagamento("Curso", 49.90)

       o JavaScript vai utilizar o preço
       correto definido acima.
    */

    valorSelecionado =
        obterPrecoCurso(
            curso,
            valor
        );


    /* ========================================================
       ATUALIZA NOME DO CURSO
    ======================================================== */

    if (modalCurso) {

        modalCurso.textContent =
            cursoSelecionado;

    }


    /* ========================================================
       ATUALIZA VALOR
    ======================================================== */

    if (modalValor) {

        modalValor.textContent =
            formatarMoeda(
                valorSelecionado
            );

    }


    /* ========================================================
       CAMPO DA CHAVE PIX
    ======================================================== */

    /*
       Mostra SOMENTE:
       31971705564
    */

    if (pixKeyInput) {

        pixKeyInput.value =
            PIX_KEY;

    }


    /* ========================================================
       GERA PIX COPIA E COLA
    ======================================================== */

    const codigoPix =
        gerarPix(
            cursoSelecionado,
            valorSelecionado
        );


    /*
       Se existir textarea para o
       Pix Copia e Cola.
    */

    const pixCode =
        document.getElementById(
            "pixCode"
        );


    if (pixCode) {

        pixCode.value =
            codigoPix;

    }


    /* ========================================================
       MENSAGEM
    ======================================================== */

    if (mensagemPix) {

        mensagemPix.innerHTML =
            "Chave Pix: " +
            "<strong>" +
            PIX_KEY +
            "</strong>";

        mensagemPix.classList.remove(
            "erro"
        );

    }


    /* ========================================================
       ABRIR MODAL
    ======================================================== */

    if (modal) {

        modal.classList.add(
            "active"
        );

        modal.classList.add(
            "ativo"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* ========================================================
       FOCO NO CAMPO
    ======================================================== */

    setTimeout(
        function () {

            if (pixKeyInput) {

                pixKeyInput.focus();

                pixKeyInput.select();

            }

        },
        150
    );

}


/* ============================================================
   FECHAR PAGAMENTO
============================================================ */

function fecharPagamento() {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );

    modal.classList.remove(
        "ativo"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    if (mensagemPix) {

        mensagemPix.textContent =
            "";

    }

}


/* ============================================================
   FECHAR MODAL COM ESC
============================================================ */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal &&
            (
                modal.classList.contains(
                    "active"
                ) ||
                modal.classList.contains(
                    "ativo"
                )
            )
        ) {

            fecharPagamento();

        }

    }
);


/* ============================================================
   FECHAR CLICANDO FORA
============================================================ */

if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                fecharPagamento();

            }

        }
    );

}


/* ============================================================
   FORMATAR MOEDA
============================================================ */

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ============================================================
   FORMATAR VALOR PARA PIX
============================================================ */

function formatarValorPix(valor) {

    return Number(valor)
        .toFixed(2);

}


/* ============================================================
   REMOVER ACENTOS
============================================================ */

function removerAcentos(texto) {

    return String(texto)
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


/* ============================================================
   LIMPAR TEXTO DO PIX
============================================================ */

function limparTextoPix(
    texto,
    limite
) {

    return removerAcentos(texto)
        .toUpperCase()
        .replace(
            /[^A-Z0-9 ]/g,
            ""
        )
        .trim()
        .substring(
            0,
            limite
        );

}


/* ============================================================
   LIMPAR CHAVE PIX
============================================================ */

function limparChavePix(chave) {

    return String(chave)
        .trim()
        .substring(
            0,
            77
        );

}


/* ============================================================
   MONTAR CAMPO PIX
============================================================ */

function campoPix(
    id,
    valor
) {

    return (
        id +
        String(valor.length)
            .padStart(
                2,
                "0"
            ) +
        valor
    );

}


/* ============================================================
   CRC16
============================================================ */

function calcularCRC16(
    texto
) {

    let crc =
        0xFFFF;


    for (
        let i = 0;
        i < texto.length;
        i++
    ) {

        crc ^=
            texto.charCodeAt(i) << 8;


        for (
            let j = 0;
            j < 8;
            j++
        ) {

            if (
                (crc & 0x8000) !== 0
            ) {

                crc =
                    (crc << 1) ^
                    0x1021;

            } else {

                crc =
                    crc << 1;

            }


            crc &=
                0xFFFF;

        }

    }


    return crc
        .toString(16)
        .toUpperCase()
        .padStart(
            4,
            "0"
        );

}


/* ============================================================
   GERAR TXID
============================================================ */

function gerarTXID() {

    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    let txid = "";


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const posicao =
            Math.floor(
                Math.random() *
                caracteres.length
            );


        txid +=
            caracteres[posicao];

    }


    return txid;

}


/* ============================================================
   GERAR PIX COPIA E COLA
============================================================ */

function gerarPix(
    curso,
    valor
) {

    const chave =
        limparChavePix(
            PIX_KEY
        );


    const nome =
        limparTextoPix(
            PIX_NOME,
            25
        );


    const cidade =
        limparTextoPix(
            PIX_CIDADE,
            15
        );


    const valorPix =
        formatarValorPix(
            valor
        );


    /* ========================================================
       MERCHANT ACCOUNT INFORMATION
    ======================================================== */

    const merchantAccount =
        campoPix(
            "00",
            "BR.GOV.BCB.PIX"
        ) +

        campoPix(
            "01",
            chave
        );


    /* ========================================================
       PAYLOAD INICIAL
    ======================================================== */

    let payload =
        campoPix(
            "00",
            "01"
        ) +

        campoPix(
            "26",
            merchantAccount
        ) +

        campoPix(
            "52",
            "0000"
        ) +

        campoPix(
            "53",
            "986"
        ) +

        campoPix(
            "54",
            valorPix
        ) +

        campoPix(
            "58",
            "BR"
        ) +

        campoPix(
            "59",
            nome
        ) +

        campoPix(
            "60",
            cidade
        );


    /* ========================================================
       TXID
    ======================================================== */

    const txid =
        gerarTXID();


    /* ========================================================
       CAMPO 62
    ======================================================== */

    const campo62 =
        campoPix(
            "05",
            txid
        );


    payload +=
        campoPix(
            "62",
            campo62
        );


    /* ========================================================
       CRC
    ======================================================== */

    const payloadSemCRC =
        payload +
        "6304";


    const crc =
        calcularCRC16(
            payloadSemCRC
        );


    return (
        payloadSemCRC +
        crc
    );

}


/* ============================================================
   COPIAR SOMENTE A CHAVE PIX
============================================================ */

async function copiarPix() {

    /*
       A cópia será SOMENTE:
       31971705564
    */

    const chavePix =
        "31971705564";


    try {

        /* ====================================================
           MÉTODO MODERNO
        ==================================================== */

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(
                chavePix
            );

        }

        /* ====================================================
           MÉTODO ALTERNATIVO
        ==================================================== */

        else {

            const campo =
                document.createElement(
                    "textarea"
                );


            campo.value =
                chavePix;


            campo.style.position =
                "fixed";

            campo.style.left =
                "-9999px";


            document.body.appendChild(
                campo
            );


            campo.focus();

            campo.select();


            document.execCommand(
                "copy"
            );


            document.body.removeChild(
                campo
            );

        }


        /* ====================================================
           MENSAGEM DE SUCESSO
        ==================================================== */

        mostrarMensagem(
            "✓ Chave Pix copiada: 31971705564"
        );


        /* ====================================================
           FEEDBACK NO BOTÃO
        ==================================================== */

        if (btnCopiar) {

            const textoOriginal =
                btnCopiar.textContent;


            btnCopiar.textContent =
                "Copiado!";


            setTimeout(
                function () {

                    btnCopiar.textContent =
                        textoOriginal;

                },
                2000
            );

        }

    }

    catch (erro) {

        console.error(
            "Erro ao copiar Pix:",
            erro
        );


        mostrarMensagem(
            "Não foi possível copiar. Use: 31971705564",
            true
        );

    }

}


/* ============================================================
   MENSAGEM
============================================================ */

function mostrarMensagem(
    mensagem,
    erro = false
) {

    if (!mensagemPix) {
        return;
    }


    mensagemPix.textContent =
        mensagem;


    mensagemPix.classList.toggle(
        "erro",
        erro
    );

}


/* ============================================================
   ENVIAR COMPROVANTE PELO WHATSAPP
============================================================ */

function enviarComprovante() {

    if (!WHATSAPP) {

        alert(
            "Número do WhatsApp não configurado."
        );

        return;

    }


    const mensagem =
        "Olá! Fiz o pagamento via Pix do curso \"" +
        cursoSelecionado +
        "\" no valor de " +
        formatarMoeda(
            valorSelecionado
        ) +
        ".\n\n" +
        "Gostaria de enviar o comprovante para confirmar minha inscrição.";


    const url =
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(
            mensagem
        );


    window.open(
        url,
        "_blank"
    );

}


/* ============================================================
   WHATSAPP FLUTUANTE
============================================================ */

if (whatsappFlutuante) {

    const mensagem =
        "Olá! Gostaria de saber mais sobre os cursos de máquinas pesadas.";


    /*
       Se for um link <a>
    */

    if (
        whatsappFlutuante.tagName === "A"
    ) {

        whatsappFlutuante.href =
            "https://wa.me/" +
            WHATSAPP +
            "?text=" +
            encodeURIComponent(
                mensagem
            );

    }


    /*
       Se for um botão
    */

    else {

        whatsappFlutuante.addEventListener(
            "click",
            function () {

                window.open(
                    "https://wa.me/" +
                    WHATSAPP +
                    "?text=" +
                    encodeURIComponent(
                        mensagem
                    ),
                    "_blank"
                );

            }
        );

    }

}


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "================================"
        );

        console.log(
            "FORMAÇÃO MÁQUINAS PESADAS"
        );

        console.log(
            "JavaScript carregado corretamente."
        );

        console.log(
            "Chave Pix:",
            PIX_KEY
        );

        console.log(
            "Preços dos cursos:"
        );

        console.log(
            "Escavadeira:",
            formatarMoeda(
                PRECOS_CURSOS[
                    "Operador de Escavadeira Hidráulica"
                ]
            )
        );

        console.log(
            "Retroescavadeira:",
            formatarMoeda(
                PRECOS_CURSOS[
                    "Operador de Retroescavadeira"
                ]
            )
        );

        console.log(
            "Motoniveladora:",
            formatarMoeda(
                PRECOS_CURSOS[
                    "Operador de Motoniveladora"
                ]
            )
        );

        console.log(
            "Pá Carregadeira:",
            formatarMoeda(
                PRECOS_CURSOS[
                    "Operador de Pá Carregadeira"
                ]
            )
        );

        console.log(
            "================================"
        );

    }
);