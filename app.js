// Gera um número secreto inicial
let numeroSecreto = Math.floor(Math.random() * 20) + 1;

// Contador de tentativas
let tentativas = 0;

// Elementos da interface
const nameInput = document.getElementById('name');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const messageDiv = document.getElementById('message');

// Foco no próximo campo ao pressionar Enter
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    guessInput.focus(); // Move o foco para o campo de palpite
  }
});

guessInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    submitButton.click(); // Simula o clique no botão de enviar
  }
});

// Evento de clique no botão
submitButton.addEventListener('click', () => {
  const nome = nameInput.value.trim();
  const palpite = parseInt(guessInput.value);

  // Validação do nome e palpite
  if (!nome) {
    messageDiv.textContent = 'Por favor, digite seu nome.';
    return;
  }
  if (isNaN(palpite) || palpite < 1 || palpite > 20) {
    messageDiv.textContent = 'Por favor, insira um número válido.';
    return;
  }

  // Incrementa o contador de tentativas
  tentativas++;

  // Verificação do palpite
  if (palpite === numeroSecreto) {
    messageDiv.textContent = `Parabéns, ${nome}! Você acertou o número secreto!`;
    messageDiv.style.color = 'green';
  } else {
    let mensagem = `Huu, tente outra vez, ${nome}.`;

    // Verifica se o palpite está próximo do número secreto
    if (Math.abs(palpite - numeroSecreto) <= 2) {
      mensagem += ' Está quase lá!';
      messageDiv.style.color = 'orange'; // Altere a cor para indicar proximidade
    } else {
      messageDiv.style.color = 'red';
    }

    messageDiv.textContent = mensagem;
  }

  // Verifica se o número secreto deve ser alterado
  if (tentativas >= 20) {
    numeroSecreto = Math.floor(Math.random() * 20) + 1;
    tentativas = 0; // Reinicia o contador de tentativas
  }

  // Limpar o input do palpite
  guessInput.value = '';
});
