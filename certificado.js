/* ============================================================
   BANCO DE CERTIFICADOS
   ============================================================

   COMO CADASTRAR UM NOVO ALUNO:

   Copie um bloco existente e altere:

   codigo
   nome
   cpf
   curso
   horas
   data

   IMPORTANTE:
   Use CPF somente de alunos reais e com tratamento adequado
   dos dados pessoais.

============================================================ */


const certificados = {


    "CERT-2026-008": {

        nome: "João da Silva",

        cpf: "123.456.789-00",

        curso:
            "Operador de Escavadeira Hidráulica",

        horas: "40 horas",

        data: "10/10/2026"

    },


    "CERT-2026-0002": {

        nome: "Marcos Vinicius",

        cpf: "987.654.321-00",

        curso:
            "Operador de Retroescavadeira",

        horas: "40 horas",

        data: "06/10/2026"

    },


    "CERT-2026-00020": {

        nome: "Carlos Pereira",

        cpf: "111.222.333-44",

        curso:
            "Operador de Motoniveladora",

        horas: "40 horas",

        data: "06/10/2026"

    },


    "CERT-2026-00011": {

        nome: "Ana Souza",

        cpf: "555.666.777-88",

        curso:
            "Operador de Pá Carregadeira",

        horas: "40 horas",

        data: "06/10/2026"

    }


};



/* ============================================================
   ELEMENTOS
============================================================ */


const validationForm =
    document.getElementById(
        "validationForm"
    );


const codigoInput =
    document.getElementById(
        "codigo"
    );


const errorMessage =
    document.getElementById(
        "errorMessage"
    );


const validationSection =
    document.getElementById(
        "validationSection"
    );


const certificateSection =
    document.getElementById(
        "certificateSection"
    );



/* ============================================================
   VALIDAR CERTIFICADO
============================================================ */


validationForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const codigo =
            codigoInput
            .value
            .trim()
            .toUpperCase();


        errorMessage.classList.remove(
            "active"
        );


        if (!codigo) {

            mostrarErro(
                "Digite o código do certificado."
            );

            return;

        }


        const certificado =
            certificados[codigo];


        if (!certificado) {

            mostrarErro(
                "Certificado não encontrado. Verifique o código informado."
            );

            return;

        }


        mostrarCertificado(
            codigo,
            certificado
        );

    }
);



/* ============================================================
   MOSTRAR ERRO
============================================================ */


function mostrarErro(mensagem) {

    errorMessage.textContent =
        mensagem;

    errorMessage.classList.add(
        "active"
    );

}



/* ============================================================
   MOSTRAR CERTIFICADO
============================================================ */


function mostrarCertificado(
    codigo,
    certificado
) {


    /* ========================================================
       CÓDIGO
    ======================================================== */


    document.getElementById(
        "certificateCode"
    ).textContent = codigo;


    document.getElementById(
        "codeInfo"
    ).textContent = codigo;



    /* ========================================================
       NOME
    ======================================================== */


    document.getElementById(
        "studentName"
    ).textContent =
        certificado.nome;



    /* ========================================================
       CPF
    ======================================================== */


    const studentCPF =
        document.getElementById(
            "studentCPF"
        );


    const cpfInfo =
        document.getElementById(
            "cpfInfo"
        );


    if (studentCPF) {

        studentCPF.textContent =
            certificado.cpf || "Não informado";

    }


    if (cpfInfo) {

        cpfInfo.textContent =
            certificado.cpf || "Não informado";

    }



    /* ========================================================
       CURSO
    ======================================================== */


    document.getElementById(
        "courseName"
    ).textContent =
        certificado.curso;



    /* ========================================================
       CARGA HORÁRIA
    ======================================================== */


    document.getElementById(
        "courseHours"
    ).textContent =
        certificado.horas;


    document.getElementById(
        "hoursInfo"
    ).textContent =
        certificado.horas.toUpperCase();



    /* ========================================================
       DATA
    ======================================================== */


    document.getElementById(
        "courseDate"
    ).textContent =
        certificado.data;



    /* ========================================================
       QR CODE
    ======================================================== */

    const qrContainer =
        document.getElementById(
            "qrcode"
        );


    qrContainer.innerHTML = "";


    const urlValidacao =
        window.location.href
        .split("?")[0]
        + "?codigo="
        + encodeURIComponent(codigo);


    if (
        typeof QRCode !== "undefined"
    ) {

        new QRCode(
            qrContainer,
            {

                text:
                    urlValidacao,

                width: 90,

                height: 90,

                colorDark: "#111111",

                colorLight: "#ffffff",

                correctLevel:
                    QRCode.CorrectLevel.H

            }
        );

    }



    /* ========================================================
       TROCAR TELAS
    ======================================================== */


    validationSection.style.display =
        "none";


    certificateSection.classList.add(
        "active"
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* ============================================================
   NOVO CERTIFICADO
============================================================ */


function novoCertificado() {

    certificateSection.classList.remove(
        "active"
    );


    validationSection.style.display =
        "flex";


    codigoInput.value = "";


    errorMessage.classList.remove(
        "active"
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* ============================================================
   IMPRIMIR / SALVAR PDF
============================================================ */


function imprimirCertificado() {

    window.print();

}



/* ============================================================
   VALIDAR AUTOMATICAMENTE PELO QR CODE
============================================================

   Quando alguém escanear o QR Code,
   a URL ficará aproximadamente assim:

   certificado.html?codigo=CERT-2026-000001

============================================================ */


function verificarCodigoNaURL() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const codigo =
        parametros.get(
            "codigo"
        );


    if (!codigo) {

        return;

    }


    const codigoNormalizado =
        codigo
        .trim()
        .toUpperCase();


    const certificado =
        certificados[
            codigoNormalizado
        ];


    if (!certificado) {

        return;

    }


    codigoInput.value =
        codigoNormalizado;


    mostrarCertificado(
        codigoNormalizado,
        certificado
    );

}



/* ============================================================
   INICIALIZAÇÃO
============================================================ */


verificarCodigoNaURL();