const pergunta = document.getElementById('input');
const output = document.getElementById('output');
const titulo = document.getElementById('container-title');
const placeholder = [
    'Qual seu nome?',
    'Qual sua idade?',
    'Qual sua profissão?',
    'Qual sua graduação?',
    'Qual sua especialidade?',
    'Você prefere: Front-End ou Back-End?',
    'Qual framework você prefere: React ou Vue?',
    'Você prefere: Java ou C#?'
];

let indice = 0;
let respostasArray = [];

function atualizarPlaceholder() {
    pergunta.placeholder = placeholder[indice];
}

function proximoPlaceholder() {
    if (indice < placeholder.length - 1) {
        indice++;
        atualizarPlaceholder();
    } else {
        mostrarMensagemConclusao();
    }
}

function verificarProximaPergunta() {
    if (respostasArray.length > 0) {
        const ultimaResposta = respostasArray[respostasArray.length - 1];
        if (ultimaResposta === 'Front-End') {
            indice = placeholder.indexOf('Qual framework você prefere: React ou Vue?');
        } else if (ultimaResposta === 'Back-End') {
            indice = placeholder.indexOf('Você prefere: Java ou C#?');
        }
        atualizarPlaceholder();
    }
}

function enter() {
    const valor = pergunta.value.trim();
    if (valor) {
        respostasArray.push(valor);
        pergunta.value = '';
        proximoPlaceholder();
    }
}

function gerarTextoConclusao() {
    return `
        Olá, ${respostasArray[0] || 'Não fornecido'}.
        Você tem ${respostasArray[1] || 'Não fornecido'} anos.
        Trabalha como ${respostasArray[2] || 'Não fornecido'}.
        É graduado em ${respostasArray[3] || 'Não fornecido'}.
        Especialista em ${respostasArray[4] || 'Não fornecido'}.
        Possui preferência para ${respostasArray[5] || 'Não fornecido'}.
        Seu framework preferido é ${respostasArray[6] || 'Não fornecido'}.
        E sua linguagem preferida é ${respostasArray[7] || 'Não fornecido'}.
    `;
}

function mostrarMensagemConclusao() {
    pergunta.style.display = 'none';
    titulo.style.display = 'none';
    output.style.fontSize = '30px';
    output.style.margin = '20px';
    output.textContent = 'Questionário concluído!\n\nAguarde os resultados...';
    output.style.display = 'block';
    pergunta.disabled = true;
    setTimeout(() => {
        output.textContent = gerarTextoConclusao();
    }, 2000);
}

pergunta.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        enter();
    }
});

atualizarPlaceholder();
