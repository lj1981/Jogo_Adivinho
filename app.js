// Gera um número secreto inicial
let numeroSecreto = Math.floor(Math.random() * 20) + 1;

// Contador de tentativas
let tentativas = 0;

// Elementos da interface
const nameInput = document.getElementById('name');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const messageDiv = document.getElementById('message');

// Armazena o último palpite para verificar a sequência
let ultimoPalpite = null;
let sequenciaAtiva = false;

// Foco no próximo campo ao pressionar Enter
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    guessInput.focus();
  }
});

guessInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    submitButton.click();
  }
});

// Função para verificar sequência
function verificarSequencia(numeroAtual) {
  if (numeroAtual < 1 || numeroAtual > 20) {
    sequenciaAtiva = false;
    return false;
  }

  if (ultimoPalpite !== null && numeroAtual === ultimoPalpite + 1) {
    sequenciaAtiva = true;
    return true;
  }
  sequenciaAtiva = false;
  return false;
}

// Evento de clique no botão
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Evita comportamento padrão em navegadores antigos

  const nome = nameInput.value.trim();
  const palpite = parseInt(guessInput.value, 10);

  // Validação do nome e palpite
  if (!nome) {
    messageDiv.textContent = 'Por favor, digite seu nome.';
    return;
  }
  if (isNaN(palpite) || palpite < 1 || palpite > 20) {
    messageDiv.textContent = 'Por favor, insira um número válido (entre 1 e 20).';
    guessInput.value = ''; // Limpa o valor inválido
    return;
  }

  // Verificar se é uma sequência
  if (verificarSequencia(palpite)) {
    messageDiv.textContent = 'Assim é fácil, melhor embaralhar!';
    messageDiv.style.color = 'purple';
    ultimoPalpite = palpite;
    return;
  }

  // Incrementa o contador de tentativas
  tentativas++;

  // Verificação do palpite
  if (palpite === numeroSecreto) {
    messageDiv.textContent = `Parabéns, ${nome}! Você acertou o número secreto!`;
    messageDiv.style.color = 'green';
    numeroSecreto = Math.floor(Math.random() * 20) + 1; // Troca o número secreto após o acerto
    tentativas = 0; // Reinicia o contador de tentativas
    ultimoPalpite = null; // Reinicia o controle de sequência
  } else {
    let mensagem = `Huu, tente outra vez, ${nome}.`;

    // Verifica se o palpite está próximo do número secreto
    if (Math.abs(palpite - numeroSecreto) <= 2) {
      mensagem += ' Está quase lá!';
      messageDiv.style.color = 'orange';
    } else {
      messageDiv.style.color = 'red';
    }

    messageDiv.textContent = mensagem;
    ultimoPalpite = palpite; // Atualiza o último palpite
  }

  // Limpa o input do palpite
  guessInput.value = '';
});
