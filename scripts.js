// === Elementos do DOM ===
const chuteInput = document.getElementById('chute');
const btnChute = document.getElementById('btn__chute');
const btnNovo = document.getElementById('btn__novo');
const feedback = document.getElementById('feedback');
const tentativasEl = document.getElementById('tentativas');
const mensagemInicial = document.getElementById('mensagem-inicial');

// === Variáveis do jogo ===
let numeroSecreto;
let tentativasRestantes;
const maxTentativas = 10;

// === Iniciar o jogo ===
function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativasRestantes = maxTentativas;

    // Resetar interface
    feedback.textContent = '';
    tentativasEl.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    chuteInput.value = '';
    chuteInput.disabled = false;
    btnChute.disabled = false;
    btnChute.style.display = 'block';
    btnNovo.style.display = 'none';
    mensagemInicial.style.display = 'block';

    chuteInput.focus();
}

// === SweetAlert de boas-vindas ===
Swal.fire({
    title: 'Bem Vindo ao Jogo da Adivinhação',
    text: 'Escolha um número de 1 a 100, mas preste atenção! Você só tem 10 chances.',
    icon: 'info',
    confirmButtonText: 'Começar',
    allowOutsideClick: false
}).then((result) => {
    if (result.isConfirmed) {
        iniciarJogo();
    }
});

// === Função de feedback final com SweetAlert ===
function fimDeJogo(acertou) {
    chuteInput.disabled = true;
    btnChute.style.display = 'none';
    btnNovo.style.display = 'block';
    mensagemInicial.style.display = 'none';

    if (acertou) {
        Swal.fire({
            title: 'Parabéns!',
            text: `Você acertou o número ${numeroSecreto} em ${maxTentativas - tentativasRestantes} tentativa(s)!`,
            icon: 'success',
            confirmButtonText: 'Jogar Novamente',
            allowOutsideClick: false
        }).then(() => iniciarJogo());
    } else {
        Swal.fire({
            title: 'Que pena!',
            text: `Suas tentativas acabaram. O número era ${numeroSecreto}.`,
            icon: 'error',
            confirmButtonText: 'Tentar Novamente',
            allowOutsideClick: false
        }).then(() => iniciarJogo());
    }
}

// === Evento do botão Chutar ===
btnChute.addEventListener('click', function () {
    const palpite = parseInt(chuteInput.value);

    // Validação
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        feedback.textContent = 'Por favor, digite um número entre 1 e 100.';
        feedback.style.color = '#d9534f';
        return;
    }

    // Decrementar tentativas
    tentativasRestantes--;
    tentativasEl.textContent = `Tentativas restantes: ${tentativasRestantes}`;

    // Comparação
    if (palpite === numeroSecreto) {
        feedback.textContent = 'Você acertou!';
        feedback.style.color = '#5cb85c';
        fimDeJogo(true);
    } else if (palpite < numeroSecreto) {
        feedback.textContent = 'O número secreto é maior.';
        feedback.style.color = '#f0ad4e';
    } else {
        feedback.textContent = 'O número secreto é menor.';
        feedback.style.color = '#f0ad4e';
    }

    // Fim por tentativas esgotadas
    if (tentativasRestantes === 0 && palpite !== numeroSecreto) {
        feedback.textContent = `Fim de jogo! O número era ${numeroSecreto}.`;
        feedback.style.color = '#d9534f';
        fimDeJogo(false);
    }

    // Limpar input
    chuteInput.value = '';
    chuteInput.focus();
});

// === Botão Jogar Novamente ===
btnNovo.addEventListener('click', function () {
    iniciarJogo();
});